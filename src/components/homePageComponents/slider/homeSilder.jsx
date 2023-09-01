import React, { useEffect, useState, useContext } from "react";
import { Galleria } from "primereact/galleria";
import style from "./homeSlider.module.css";
import { NewsContext } from "../../../context/newsContext";
import {Base64Prefix} from '../../../_utils/consts';

const HomeSilder = () => {
  const [images, setImages] = useState([]);
  const { data } = useContext(NewsContext);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      let recentNews = [];
      if (data.length > 5) {
        recentNews = data.slice(0, 5);
      } else {
        recentNews = data;
      }
      let newData = recentNews.map((item) => {
        const newItem = {
          itemImageSrc:Base64Prefix + item.imageUrl,
          thumbnailImageSrc:Base64Prefix + item.imageUrl,
          alt: item.title,
          title: item.title,
          des: item.description,
        };
        return newItem;
      });
      setImages(...images, newData);
    }

    return () => {
      ignore = true;
    };
  }, [data]);

  const itemTemplate = (item) => {
    return (
      <div
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) ,url(${item.itemImageSrc})`,
          width: "100%",
          height: "100%",
          display: "block",
          backgroundSize:"100% 100%",
        }}
        className={`${style["slider-content"]}`}
      >
        <div className={`${style.content}`}>
          <div className={`${style.news}`}>
            <p>{item.des}</p>
            <button className={`${style.reservationbtn}`}>
              Make an Appointment
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={`${style.slider} card`}>
      <Galleria
        value={images}
        style={{ width: "100%", display: "block" }}
        changeItemOnIndicatorHover
        showItemNavigators
        showThumbnails={false}
        showIndicators
        item={itemTemplate}
      />
    </div>
  );
};

export default HomeSilder;
