import React from 'react';
import {NewsState} from '../../context/newsContext';
import NewsPage from './newsPage';


const NewsContainer = () => {
  return (
   <NewsState>
    <NewsPage/>
   </NewsState>
  )
}

export default NewsContainer