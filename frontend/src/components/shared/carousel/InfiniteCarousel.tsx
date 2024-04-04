"use client";

import Image from "next/image";
import styles from "./carousel.module.scss";
import Slider from "@ant-design/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavArrow from "./components/navArrow/NavArrow";

const data = [1, 2, 3, 4, 5, 6, 7, 8];

type InfiniteCarouselProps = {
  images: string[];
};

const InfiniteCarousel = ({ images }: InfiniteCarouselProps) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Slider
        infinite={true}
        slidesToShow={4}
        autoplay={true}
        autoplaySpeed={4000}
        swipeToSlide={true}
        slidesToScroll={1}
        centerMode={true}
        speed={2000}
        nextArrow={<NavArrow />}
        prevArrow={<NavArrow isLeft />}
        responsive={[
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 3,
            },
          },
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
        {images.map((item) => {
          return (
            <div key={item} className={styles.item}>
              <Image
                className={styles.image}
                src={item}
                alt={""}
                fill
                sizes={
                  "300px, (min-width: 1440px) 400px, (min-width: 1024px) 900px "
                }
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default InfiniteCarousel;
