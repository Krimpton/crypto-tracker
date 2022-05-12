import React, {useEffect, useState} from 'react';
import {SliderData} from "./sliderData";
import "./imageSlider.scss";

const ImageSlider = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent(current === length - 1 ? 0 : current + 1)
        }, 6000)
        return () => clearTimeout(timer)
    },)

    const [current, setCurrent] = useState<number>(0);
    const length = SliderData.length;

    if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null
    }

    const desired = (num: number) => {
        setCurrent(num)
    }

    return (
        <section className="slider">
            {SliderData.map((item, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (
                            <img src={item.image} alt="crypto-images" className="image-slider"/>
                        )}
                    </div>)
            })}
            <div className="circle-button-container d-flex justify-content-center mt-2">
                {[0, 1, 2, 3, 4, 5].map(num => (
                    <div className={`circle-button ${num === current && 'active'}`}
                         onClick={() => desired(num)} key={num}>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ImageSlider;