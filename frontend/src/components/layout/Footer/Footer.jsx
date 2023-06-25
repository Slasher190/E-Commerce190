import React from "react";
import appStore from "../../../images/Appstore.png";
import playStore from "../../../images/playstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR AP4</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="PlayStore" />
        <img src={appStore} alt="AppStore" />
      </div>
      <div className="midFooter">
        <h1>Ecommerce</h1>
        <p> High Quality is our first priority</p>
        <p>Copyrights 2023 &copy; Slasher190</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://google.com">Instagram</a>
        <a href="http://google.com">Youtube</a>
        <a href="http://google.com">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
