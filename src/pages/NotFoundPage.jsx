import React from 'react';
import Navbar from '../components/homePageComponents/navbar/navbar';
import FooterLinks from '../components/homePageComponents/FooterDetails/FooterLinks';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
   <div className='notFound'>
   <div className="content">
   <p>Page Not Found</p>
     <Link to="/">Back To Home </Link>
   </div>
   </div>
   <FooterLinks/>
      <Footer />

    
    </>
  )
}

export default NotFoundPage