import React from "react";
import Navbar from "../../components/homePageComponents/navbar/navbar";
import FooterLinks from "../../components/homePageComponents/FooterDetails/FooterLinks";
import Footer from "../../components/Footer";
import './about.css';
const About = () => {
  return (
    <>
      <Navbar />
      <div className="container about-section">
        <section className="About-us">
          <div className="text">
            <h3>Welcome to Your I Care Health Center</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              neque sit, explicabo vero nulla animi nemo quae cumque, eaque
              pariatur eum ut maxime! Tenetur aperiam maxime iure explicabo aut
              consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Nesciunt neque sit, explicabo vero nulla animi nemo quae
              cumque, eaque pariatur eum ut maxime! Tenetur aperiam maxime iure
              explicabo aut consequuntur. Expedita iusto sunt beatae esse id
              nihil voluptates magni, excepturi distinctio impedit illo,
              incidunt iure facilis atque, inventore reprehenderit quidem
              aliquid recusandae. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Laudantium quod ad sequi atque accusamus
              deleniti placeat dignissimos illum nulla voluptatibus vel optio,
              molestiae dolore velit iste maxime, nobis odio molestias!
            </p>
          </div>
          <div className="image">
            <img src="../../../public/3.jpg" alt="I care Photo"/>
          </div>
        </section>
        <section className="vision-mission">
          <div className="item">
            <h4>Vision</h4>
            <p>
              Expedita iusto sunt beatae esse id nihil voluptates magni,
              excepturi distinctio impedit illo, incidunt iure facilis atque,
              inventore reprehenderit quidem aliquid recusandae. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Laudantium quod ad
              sequi atque accusamus deleniti placeat dignissimos illum nulla
              voluptatibus vel optio, molestiae dolore velit iste maxime, nobis
              odio molestias!
            </p>
          </div>
          <div className="item">
            <h4>Mission</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              neque sit, explicabo vero nulla animi nemo quae cumque, eaque
              pariatur eum ut maxime! Tenetur aperiam maxime iure explicabo aut
              consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Nesciunt neque sit, explicabo vero nulla animi nemo quae
              cumque, eaque pariatur eum ut maxime! Tenetur aperiam maxime iure
              explicabo aut consequuntur.
            </p>
          </div>
        </section>
      </div>

      <FooterLinks />
      <Footer />
    </>
  );
};

export default About;
