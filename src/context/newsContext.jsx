import React, { createContext, useEffect, useState } from "react";
import { get ,post ,put ,del } from "../_services/APiCaller.Service";
import { APIS } from "../_utils/APIS";

export const NewsContext = createContext({
  data: [],
  response:null,
  getAllNews: (pagingConfig) => {},
  addNewNews: (data) => {},
  updateNewsItem: (data) => {},
  deleteNewsItem: (id) => {},
});

export const NewsState = ({ children }) => {
  
  const [news, setNews] = useState([]);
  const [newsResponse, setNewsResponse] = useState(null);

  useEffect(() => {
    
    let ignore = false;
   async function fetchNews() {
      let allNews = await get(APIS.HomePage.LatestAnnouncemnts +"?numOfLatest=9");
      if (!ignore) {
        console.log(allNews.data)
        setNews(allNews.data);
        setNewsResponse(allNews);
      }
    }
    fetchNews();
    return () => {
      ignore = true;
    };
  }, []);

  const getAllNews =async(pagingConfig) => {
    return await get(APIS.HomePage.Announcements +"?PageNumber="+pagingConfig.pageNumber+"&PageSize="+pagingConfig.rows);
  };

  const addNewNews = async(data) => {
    return await post(APIS.HomePage.Announcements,prepareDataToSend(data));
  };

  const updateNewsItem = async(data) => {
    return await put(APIS.HomePage.Announcements +"/" +data.id,prepareDataToSend(data));
  };


  function prepareDataToSend(data) {
    let formData = new FormData();
    formData.append("AnnouncementId", data?.id);
    formData.append("Description", data.description);
    formData.append("Title", data.title);
    formData.append("ImageFile", data.imageUrl
    );
    return formData;
  }

  return (
    <>
      <NewsContext.Provider value={{ data: news ,response:newsResponse,getAllNews,addNewNews,updateNewsItem}}>
        {children}
      </NewsContext.Provider>
    </>
  );
};
