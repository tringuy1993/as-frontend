//https://upmostly.com/tutorials/how-to-use-chart-js-with-react
"use client";
import { IoMail, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";
// import "./Footer.module.css";
const Footer = () => {
  return (
    <footer id="contact">
      <h2> Tri Nguyen &middot; Avid Learner </h2>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/tringuyen-healthphysicist/">
            <IoLogoLinkedin />
          </a>
        </li>
        <li>
          <a href="https://github.com/tringuy1993">
            <IoLogoGithub />
          </a>
        </li>
        <li>
          <a href="mailto:tringuy1993@gmail.com">
            <IoMail />
            {/* <IoLogoGithub /> */}
          </a>
        </li>
      </ul>
      <a href="/disclaimers"> Disclaimers</a>
    </footer>
  );
};

export default Footer;
