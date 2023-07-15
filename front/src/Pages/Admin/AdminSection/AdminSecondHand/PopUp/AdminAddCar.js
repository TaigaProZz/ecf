import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../AdminComponents/PopUp/AdminPopUp.scss';

function AdminAddCar(props) {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [km, setKm] = useState('');
  const [year, setYear] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleKmChange = (event) => {
    setKm(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleImagesChange = (event, index) => {
    // check if file is an image
    if (!isValidImageFile(event.target.files[0])) {
      event.target.value = null;
      return alert('Invalid image file');
    }

    const files = event.target.files;
    // only one image per input
    const image = files[0]; 

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;

      setPreviewImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = imageDataUrl;
        return updatedImages;
      });

      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = image;
        return updatedImages;
      });
    };

    reader.readAsDataURL(image);
  };

  function isValidImageFile(file) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileName = file.name.toLowerCase();
    return allowedExtensions.some(extension => fileName.endsWith(extension));
  }

  const handleAddCar = () => {
    const newCar = {
      title,
      brand,
      model,
      description,
      price,
      km,
      year,
      images
    };
    props.onAddCar(newCar);
  };

  const resetImages = () => {
    setPreviewImages([]);
    setImages([]);
  };


  return (
    <Popup trigger={props.btn} modal nested>
      {close => (
        <div className="admin-popup-modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">Ajouter une voiture</div>
          <div className="content">
            <span>Titre</span>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
            <span>Marque</span>
            <input
              type="text"
              value={brand}
              onChange={handleBrandChange}
            />
            <span>Modèle</span>
            <input
              type="text"
              value={model}
              onChange={handleModelChange}
            />
            <span>Description</span>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
            <span>Prix</span>
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
            <span>Kilométrage</span>
            <input
              type="number"
              value={km}
              onChange={handleKmChange}
            />
            <span>Année</span>
            <input
              type="number"
              value={year}
              onChange={handleYearChange}
            />
            <span>Images</span>
            <button className="admin-add-btn" onClick={resetImages} > Effacer les images </button>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="image-input">
                <span key={index}>Image {index + 1}</span>
                <label htmlFor={`image${index + 1}`}>
                  {previewImages[index] ? (
                    <img className='preview-image' src={previewImages[index]} alt={`Preview ${index + 1}`} />
                  ) : (
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      size="5242880"
                      id={`image${index + 1}`}
                      onChange={(event) => handleImagesChange(event, index)}
                    />
                  )}
                </label>
              </div>
              ))}
          </div>
          <div className="actions">
            <button className="add-car-popup-btn" onClick={handleAddCar}>
              Ajouter
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default AdminAddCar;