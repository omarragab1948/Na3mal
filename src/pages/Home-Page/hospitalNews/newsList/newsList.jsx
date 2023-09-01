import React, { useState, useEffect, useRef, useContext } from "react";
import NewsItem from "../newsItem/newsItem";
import style from "./newsList.module.css";
import { NewsContext } from "../../../../context/newsContext";

const NewsList = () => {
  const initNews = [];
  const [news, setNews] = useState(initNews);
  const { data } = useContext(NewsContext);

  useEffect(() => {
    let ignore=false;
    if(!ignore){
      console.log("from news list", data);

      if (data.length > 9) {
        setNews(() => [...data.slice(0, 9)]);
      } else {
        setNews(() => [...data]);
      }
    }

    return ()=>{
      ignore=true;
    }
    
  }, [data]);

  if (news.length) {
    return (
      <>
        <div className={`${style.container}`}>
          <h2>Recent Articles And News </h2>
          <div className={`${style.newsList}`}>
            {news.map((item, i) => {
              return <NewsItem data={item} key={item.title + i} />;
            })}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={`${style.container} `}>
          <h2>Recent Articles And News </h2>
          <p className="no-data">There Is No Data In this Section </p>
        </div>
      </>
    );
  }
};

export default NewsList;
