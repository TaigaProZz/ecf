
import './Car.scss';
import 'react-medium-image-zoom/dist/styles.css'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { BsEnvelopeFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode} from 'swiper/modules';
import Zoom from 'react-medium-image-zoom';
import axios from 'axios';

function Car() {
  const [element, setElement] = useState(null);
  const [images, setImages] = useState([]);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const params = useParams();
  const paramsId = params.id;
  const pathExtension = process.env.REACT_APP_CAR_SCW_ENDPOINT;

  // get infos of car from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get car info
        const carResponse = await axios.get(`${process.env.REACT_APP_API}/car/${paramsId}`);
        const car = carResponse.data;
        setElement(car[0]);

        // get car images
        const imageResponse = await axios.get(`${process.env.REACT_APP_API}/carimage/${paramsId}`);
        const images = imageResponse.data;
        const imageList = JSON.parse(images[0].path);
        setImages(imageList);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [paramsId]);

  
  const handleMainSwiperSlideChange = () => {
    if (mainSwiper && thumbsSwiper) {
      const activeIndex = mainSwiper.activeIndex;
      thumbsSwiper.slideTo(activeIndex)
    }
  };

  const handleThumbsSwiperSlideChange = () => {
    if (mainSwiper && thumbsSwiper) {
      const activeIndex = thumbsSwiper.activeIndex;
      mainSwiper.slideTo(activeIndex)
    }
  };

  // check if car is null
  if (!element) {
    return null;
  }

  const imageList = images.map((img, index) => (
    <SwiperSlide key={index}>
      <Zoom>
        <img src={pathExtension + img} alt={"load error"}/>
      </Zoom>
    </SwiperSlide>
  ));
  
  const imageSubList = images.map((img, index) => (
    <SwiperSlide key={index}>
      <img src={pathExtension + img} alt={"load error"}/>
    </SwiperSlide>
  ));

  return (
    <div className="car-page-container">
      <div className='left-side'>
        <div className='car-item-main-image'>
          <Swiper
              onSwiper={setMainSwiper}
              navigation = {true}
              pagination = {true}
              modules={[Navigation, Pagination, FreeMode]}
              onSlideChange={handleMainSwiperSlideChange}
            >
            {imageList}
          </Swiper>
        </div>
        <div className='car-item-sub-images'>
          {images.length > 1 ? 
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={'auto'}
              navigation = {true}
              centeredSlides={true}
              modules={[Navigation, Pagination]}
              onSlideChange={handleThumbsSwiperSlideChange} 
            >
              {imageSubList}
            </Swiper> 
            : null 
          }
        </div>
      </div>

      <div className='right-side'>
        <h1>{element.brand} {element.model}</h1>
        <h2 className='title'>{element.title}</h2>
        <div className='car-price'>
          <p>{element.price} €</p>
        </div>
        <div className='car-fiche'>
          <h2>Fiche Technique</h2>
          <p className='ref'>Référence : {element.id}</p>
          <p>{element.description}</p>
        </div>
        <div className='car-contact-container'>
          <h2>Intéressé ? Contactez-nous</h2>
          <Link to={'/carcontact/' + element.id}>
            <button className='shc-button'><BsEnvelopeFill size={35} /></button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Car;
