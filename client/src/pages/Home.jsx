import React from "react";
import NewsLetterBox from "../components/NewsLetterBox";
import Hero from "../components/Hero";
import Category from "../components/Category";
import PostsContainer from "../components/PostsContainer";
import ContactForm from "../components/ContactForm";
import PricingSubscription from "../components/subscriptionPackage/PricingSubscription";

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
      <div className="container">
        <PricingSubscription />
      </div>
    </main>
  );
};

export default Home;
