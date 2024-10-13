import styled from "styled-components";
import { Swiper , SwiperSlide } from 'swiper/react';

export const SliderSwiper = styled(Swiper)`
  width: 50%; 
  margin: 0 auto; 
  height:100%;
  @media (max-width: 968px) {
    display:none;
  }
`;
export const StyledSlide = styled(SwiperSlide)<{ bgColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  height: 100%;
  font-size: 24px;
  color: white;
  position:relative;
  border-radius:10px 0 0px 10px;
  background-color: ${props => props.bgColor}; 
`;
export const ImgSlide = styled.img`
    object-fit:contain;
    width:70%;
    border-radius:10px;
`;
export const TitleSlide = styled.h2`
    font-size:20px;
    text-align: center;
    position:absolute;
    bottom: 40px
`;