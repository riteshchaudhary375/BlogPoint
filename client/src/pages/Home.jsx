import React from "react";
import NewsLetterBox from "../components/NewsLetterBox";
import Hero from "../components/Hero";
import Category from "../components/Category";
import PostsContainer from "../components/PostsContainer";

const Home = () => {
  return (
    <main>
      <Hero />
      <Category />
      <PostsContainer />
      <NewsLetterBox />
    </main>
  );
};

export default Home;
