import { useEffect, useState } from 'react';
import './image-slider.scss';
import SliderData from './slider-data';

function ImageSlider() {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const { length } = SliderData;
    const timer = setTimeout(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 6000);
    return () => clearTimeout(timer);
  });

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  const desired = (num: number) => {
    setCurrent(num);
  };

  return (
    <section className="slider">
      {SliderData.map((item, index) => {
        return (
          <div className={index === current ? 'slide active' : 'slide'} key={item.image}>
            {index === current && (
              <img src={item.image} alt="crypto-images" className="image-slider" />
            )}
          </div>
        );
      })}
      <div className="circle-button-container d-flex justify-content-center mt-2">
        {[0, 1, 2, 3, 4, 5].map((num) => (
          <option
            role="button"
            tabIndex={0}
            aria-label="slider-options"
            className={`circle-button ${num === current && 'active'}`}
            onClick={() => desired(num)}
            key={num}
          />
        ))}
      </div>
    </section>
  );
}

export default ImageSlider;
