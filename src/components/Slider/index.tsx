import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 
import { SliderSwiper , StyledSlide , ImgSlide , TitleSlide} from './Styles';
import { Pagination ,  Autoplay  , EffectFade } from 'swiper/modules';
import Slide1 from '../../assets/ImgSlides/slide1.png';
import Slide2 from '../../assets/ImgSlides/slide2.png';
import Slide3 from '../../assets/ImgSlides/slide3.png';

const slides = [
    { id: 1, content: 'اسلاید اول' , color: '#fa7565' , src :Slide1},
    { id: 2, content: 'اسلاید دوم' , color: '#24c5a2' , src :Slide2},
    { id: 3, content: 'اسلاید سوم' , color: '#ffc106' , src :Slide3},
  ];

const Slider = () => {
  return (
    <SliderSwiper
      loop={true} 
      spaceBetween={10}
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
        clickable: true
      }}
      autoplay={{
        delay: 2500, 
        disableOnInteraction: false, 
      }}
      effect="fade"
      modules={[Pagination , Autoplay , EffectFade]}
    >
       {slides.map(slide => (
        <StyledSlide key={slide.id} bgColor={slide.color}>
          <ImgSlide src={slide.src} />
          <TitleSlide>{slide.content}</TitleSlide>
        </StyledSlide>
      ))}
    </SliderSwiper>
  );
};

export default Slider;
