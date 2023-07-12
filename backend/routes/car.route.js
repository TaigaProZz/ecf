const express = require('express');
const router = express.Router();
const connection = require('../database');
const multer = require('multer');
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const s3 = new AWS.S3({
  endpoint: process.env.REACT_APP_SCW_ENDPOINT,
  accessKeyId: process.env.SCW_ACCESS_KEY,
  secretAccessKey: process.env.SCW_SECRET_KEY,
  s3BucketEndpoint: true,
});

// get cars 
router.get('/', (req, res) => {
  const query = 'SELECT * FROM cars';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// specific CAR
router.get('/:id', (req, res) => {
  const carId = req.params.id;
  const query = 'SELECT * FROM cars WHERE id = ?';
  connection.query(query, [carId], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

const uploadFile = async (pFile, pFilename, pFolder) => { 
  const fileContent = Buffer.from(pFile.buffer, ' ');
  await s3.putObject({
      ACL: 'public-read',
      Body: fileContent,
      Bucket: `ecf/${pFolder}`,
      Key: pFilename,
      ContentType: "image/jpeg"
  }).promise();
}

const upload = multer();

// post car
router.post('/', upload.array("carImage"), async (req, res) => {
  try {
    const { title, brand, model, description, price, km, year } = req.body;
    const images = req.files;
    
    const imageResult = images.map(async (image) => {
      const uuid = uuidv4();
      const file = await uploadFile(image, uuid, "cars");
      return { uuid, file }
    });
    // wait for all promise to be resolved
    const uploadedImages = await Promise.all(imageResult);

    // insert car in database
    const carQuery = 'INSERT INTO cars (title, brand, model, description, price, km, year) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const carValues = [title, brand, model, description, price, km, year];
    connection.query(carQuery, carValues, (error, carResult) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }

      // insert images in database
      const carId = carResult.insertId;
      const imageQuery = 'INSERT INTO cars_image (car_id, path) VALUES (?, ?)';
      const imageUuidValues = uploadedImages.map((image) => [image.uuid]);
      // parse to json 
      const imageJsonValues = JSON.stringify(imageUuidValues);
      const values = [carId, imageJsonValues]

      connection.query(imageQuery, values, (error) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// delete car
router.delete('/:id', (req, res) => {
  const carId = req.params.id;
  const query = 'DELETE FROM cars WHERE id = ?';
  connection.query(query, [carId], (error) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;