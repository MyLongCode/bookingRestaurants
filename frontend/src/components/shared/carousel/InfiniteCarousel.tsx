"use client";

import Image from "next/image";
import styles from "./carousel.module.scss";
import Slider from "@ant-design/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavArrow from "./components/navArrow/NavArrow";
import CarouselPhoto from "@/components/shared/carousel/children/carouselPhoto/CarouselPhoto";
import { Photo } from "@/models/restaurant/photo.type";

const data = [1, 2, 3, 4, 5, 6, 7, 8];

type InfiniteCarouselProps = {
  photos: Photo[];
  editable?: boolean;
};

const InfiniteCarousel = ({ photos, editable }: InfiniteCarouselProps) => {
  if (photos.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Slider
        infinite={photos.length >= 2}
        slidesToShow={photos.length > 3 ? 4 : photos.length > 2 ? 3 : 2}
        autoplay={true}
        autoplaySpeed={4000}
        swipeToSlide={true}
        swipe={photos.length > 2}
        slidesToScroll={1}
        speed={2000}
        nextArrow={<NavArrow />}
        prevArrow={<NavArrow isLeft />}
        responsive={[
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {photos.map((photo) => {
          return (
            <CarouselPhoto
              key={photo.id}
              id={photo.id}
              image={photo.image}
              title={photo.title}
              editable={editable}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default InfiniteCarousel;
