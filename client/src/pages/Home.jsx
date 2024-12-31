import React from "react";
import NewsLetterBox from "../components/NewsLetterBox";
import Hero from "../components/Hero";
import Category from "../components/Category";

const Home = () => {
  return (
    <main>
      <Hero />
      <Category />
      <NewsLetterBox />
    </main>
  );
};

export default Home;
