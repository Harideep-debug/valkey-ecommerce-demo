import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import HeroBentoGrid from "../components/HeroBentoGrid";
import RecommendedOne from "../components/RecommendedOne";
import NewsletterOne from "../components/NewsletterOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";

const HomePageOne = () => {
  return (
    <div className="gradient-subtle">
      {/* Preloader */}
      <Preloader />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />

      {/* ColorInit */}
      <ColorInit color={false} />

      {/* HeaderOne */}
      <HeaderOne />

      {/* Hero Bento Grid (The New Main Feature) */}
      <HeroBentoGrid />

      {/* Recommended Products Showcase */}
      <RecommendedOne />

      {/* Newsletter */}
      <NewsletterOne />

      {/* Footer */}
      <FooterOne />

      {/* Bottom Footer */}
      <BottomFooter />
    </div>
  );
};

export default HomePageOne;
