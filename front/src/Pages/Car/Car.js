
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
  const [car, setCar] = useState(null);
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
        const imageList = JSON.parse(car[0].path);
        setCar(car[0]);
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
  if (!car) {
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
        <h1>{car.brand} {car.model}</h1>
        <h2 className='title'>{car.title}</h2>
        <div className='car-price'>
          <p>{car.price} €</p>
        </div>
        <div className='car-fiche'>
          <h2>Fiche Technique</h2>
          <p className='ref'>Référence : {paramsId}</p>
          <p>{car.description}</p>
        </div>
        <div className='car-contact-container'>
          <h2>Intéressé ? Contactez-nous</h2>
          <Link to={'/carcontact/' + paramsId} state={{car}}>
            <button className='shc-button'><BsEnvelopeFill size={35} /></button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Car;
