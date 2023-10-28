const util = require('util');
const { v4: uuidv4 } = require('uuid');
const connection = require('../database');
const AWS = require("aws-sdk");
require('dotenv').config();

const s3 = new AWS.S3({
  endpoint: process.env.REACT_APP_SCW_ENDPOINT,
  accessKeyId: process.env.SCW_ACCESS_KEY,
  secretAccessKey: process.env.SCW_SECRET_KEY,
  s3BucketEndpoint: true,
});

class CarService {
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  /**
   * create a car and upload images
   * @param {object} car object with car data
   * @param {array} images list of images
   * @returns 
   */

  async createCar(car, images) {
    const result = await this.query('INSERT INTO cars SET ?', [car]);
    //TODO check result fail
    const carId = result.insertId
    const imageResult = images.map(async (image) => {
      const uuid = uuidv4();
      await this.uploadFile(image, `${uuid}`+'.jpg', 'cars');
      return uuid + '.jpg';
    });

    const uploadedImages = await Promise.all(imageResult);
    const imageJsonValues = JSON.stringify(uploadedImages);

    await this.query('INSERT INTO cars_image (car_id, path) VALUES (?, ?)', [carId, imageJsonValues]);
    return result; 
  }


  /**
   * get all cars
   * @returns list of all cars and all images 
   */

  getAll() {
    return this.query(
      `SELECT * FROM cars
      INNER JOIN cars_image
      ON cars.id = cars_image.car_id`);
  }
  

  /**
   * get car by id
   * @param {number} id
   * @returns specific car data and its images
   */

  getById(id) {
    return this.query(
      `SELECT title, brand, model, description, price, km, year, path 
      FROM cars 
      INNER JOIN cars_image 
      ON cars.id = cars_image.car_id
      WHERE cars.id = ?`, [id]
    );
  }

  /**
   * update car by id
   * @param {number} id
   * @param {object} car
   * @param {array} images
   * @returns 
   */

  updateCar(id, car, images) {
    return this.query('UPDATE cars SET ? WHERE id = ?', [car, id]);
  }


  /**
   * delete car by id
   * @param {number} id
   * @returns 
   */

  deleteCar(id) {
    return this.query('DELETE FROM cars WHERE id = ?', [id]);
  } 

  uploadFile = async (pFile, pFilename, pFolder) => { 
    const fileContent = Buffer.from(pFile.buffer, ' ');
    await s3.putObject({
      ACL: 'public-read',
      Body: fileContent,
      Bucket: `ecf/${pFolder}`,
      Key: pFilename,
      ContentType: "image/jpeg"
    }).promise();
  }
}

module.exports = new CarService();