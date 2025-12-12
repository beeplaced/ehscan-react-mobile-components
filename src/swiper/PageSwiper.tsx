import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import '../style/page-swiper.css'

SwiperCore.use([]);

interface Props {
  touchmove?: boolean;
  page: number; // current active page
  setPage: (index: number) => void; // setter for active page
  children: React.ReactNode; // injected slides
}

export const PageSwiper: React.FC<Props> = ({ touchmove = true, page, setPage, children }) => {
    
  const swiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    if (page === undefined) return;
    //check if index exists
    setPage(page);
    swiperRef.current?.slideTo(page);
  }, [page])

  return (
    <>
      <div className="swiper-container" style={{ width: "100%", height: "100%" }}>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          allowTouchMove={touchmove}
          autoHeight={true} // <-- key!
          onSlideChange={(swiper) => setPage(swiper.activeIndex)}
          ref={swiperRef as any}
          style={{ width: "100%", height: "100%" }}
        >
          {React.Children.map(children, (child, i) => (
            <SwiperSlide key={i}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};