import React from "react";
import NewsLetterBox from "../components/NewsLetterBox";
import Hero from "../components/Hero";
import Category from "../components/Category";
import PostsContainer from "../components/PostsContainer";
import ContactForm from "../components/ContactForm";

const Home = () => {
  return (
    <main>
      <Hero />
      <Category />
      <PostsContainer />
      <div className="container">
        <ContactForm />
      </div>
      <NewsLetterBox />
    </main>
  );
};

export default Home;
