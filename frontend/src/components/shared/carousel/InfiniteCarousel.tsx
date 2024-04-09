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
  editable?: boolean;
};

const InfiniteCarousel = ({ images }: InfiniteCarouselProps) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Slider
        infinite={images.length >= 2}
        slidesToShow={images.length > 3 ? 4 : images.length > 2 ? 3 : 2}
        autoplay={true}
        autoplaySpeed={4000}
        swipeToSlide={true}
        swipe={images.length > 2}
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
