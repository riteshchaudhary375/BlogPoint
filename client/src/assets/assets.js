import bin_icon from "./bin_icon.png";
import logo_dark from "./logo_dark.png";
import logo_light from "./logo_light.png";
import menu_icon from "./menu_icon.png";
import profile_icon from "./profile_icon.png";
import search_icon from "./search_icon.png";
import moon from "./moon.png";
import sun from "./sun.png";
import dropdown_icon from "./dropdown_icon.png";
import right_arrow from "./right_arrow.png";
import dribble from "./dribble.png";
import fb from "./fb.png";
import github from "./github.png";
import instagram from "./instagram.png";
import linkedin from "./linkedin.png";
import twitter from "./twitter.png";
import blog_contact_img from "./blog_contact_img.jpg";
import about_img from "./about_img.png";
import man_cellular_illust from "./man_cellular_illust.png";
import google from "./google.svg";

import upload_icon from "./upload_icon.png";
import profile_r_img from "./profile_r.png";

import business_img from "./business.jpg";
import education_img from "./education.jpg";
import entertaintment_img from "./entertaintment.jpg";
import finance_img from "./finance.jpg";
import food_img from "./food.jpg";
import health_img from "./health.jpg";
import lifestyle_img from "./lifestyle.jpg";
import nature_travel_women_img from "./nature_travel_women.jpg";
import parenting_family_img from "./parenting_family.jpg";
import self_improvement_img from "./self_improvement.jpg";
import sport_fitness_img from "./sport_fitness.jpg";
import technology_img from "./technology.jpg";
import ai_img from "./ai.jpg";
import cyber_security_img from "./cyber_security.png";
import data_science_img from "./data_science.jpg";
import programming_img from "./programming.jpg";

import users_icon from "./users-user-svgrepo-com.svg";
import posts_icon from "./documents-empty-svgrepo-com.svg";
import dashboard_icon from "./pie_chart.svg";
import spinner from "./tube-spinner.svg";
import error from "./error-standard-svgrepo-com.svg";
import profile_picture_blank from "./profile_picture_blank.png";
import crossmark from "./crossmark.svg";
import checkmark from "./checkmark.svg";
import exclamation from "./exclamation.svg";

// Category
import cpu from "./cpu.svg";
import health from "./health.svg";
import finance from "./finance.svg";
import travel from "./travel.svg";
import lifestyle from "./lifestyle.svg";
import food from "./food.svg";
import education from "./education_cap.svg";
import handshake from "./handshake.svg";
import entertainment from "./entertainment.svg";
import family from "./family.svg";
import self_improvement from "./self_improvement.svg";
import sport_fitness from "./sport_fitness.svg";

export const assets = {
  bin_icon,
  logo_dark,
  logo_light,
  menu_icon,
  profile_icon,
  search_icon,
  moon,
  sun,
  dropdown_icon,
  right_arrow,
  dribble,
  fb,
  github,
  instagram,
  linkedin,
  twitter,
  blog_contact_img,
  about_img,
  man_cellular_illust,
  upload_icon,
  google,
  users_icon,
  posts_icon,
  dashboard_icon,
  spinner,
  error,
  profile_picture_blank,
  crossmark,
  checkmark,
  exclamation,
};

export const categoryData = [
  {
    category: "Technology",
    image: cpu,
  },
  {
    category: "Health",
    image: health,
  },
  {
    category: "Finance",
    image: finance,
  },
  {
    category: "Travel",
    image: travel,
  },
  {
    category: "Lifestyle",
    image: lifestyle,
  },
  {
    category: "Food",
    image: food,
  },
  {
    category: "Education",
    image: education,
  },
  {
    category: "Business & Entrepreneurship",
    image: handshake,
  },
  {
    category: "Entertainment",
    image: entertainment,
  },
  {
    category: "Parenting & Family",
    image: family,
  },
  {
    category: "Self-Improvement",
    image: self_improvement,
  },
  {
    category: "Sports & Fitness",
    image: sport_fitness,
  },
];

export const posts = [
  {
    _id: "aaa",
    category: "Technology",
    image: technology_img,
    date: "1 Jan 2025",
    title: "The Pulse of Innovation: Exploring Technology in the Modern World",
    description:
      "Technology is the cornerstone of modern innovation, shaping every aspect of our lives—from communication and healthcare to education and entertainment. This article delves into the fascinating world of technology, examining its evolution, current trends, and future possibilities. Discover how emerging fields like artificial intelligence, blockchain, and quantum computing are revolutionizing industries, and explore the ethical and societal implications of these advancements. Join us as we navigate the ever-changing landscape of technology and its impact on humanity.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "4 mins read",
  },

  {
    _id: "bbb",
    category: "Parenting & Family",
    image: parenting_family_img,
    date: "2 Jul 2024",
    title: "Building Bonds, Nurturing Growth",
    description:
      "Parenting and family are at the heart of human connection, shaping the values, growth, and future of generations. This piece explores the art and science of parenting, offering insights into nurturing strong family relationships, fostering emotional intelligence, and addressing the challenges of modern family life. From balancing discipline and empathy to embracing cultural traditions and adapting to new-age parenting tools, discover strategies and stories that strengthen the bond between parents, children, and extended family members.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "15 mins read",
  },

  {
    _id: "ccc",
    category: "Food",
    image: food_img,
    date: "22 Sept 2024",
    title: "Savoring the World: A Journey Through Food and Flavor",
    description:
      "Food is more than sustenance; it's a universal language that brings people together, tells stories, and celebrates culture. This exploration of the culinary world delves into diverse cuisines, cooking techniques, and the science of flavor. Learn about the art of food pairing, the rise of plant-based trends, and the cultural significance of traditional dishes. From quick recipes for busy days to gourmet creations for special occasions, discover how food connects, nourishes, and inspires us all.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "25 mins read",
  },

  {
    _id: "ddd",
    category: "Business & Entrepreneurship",
    image: business_img,
    date: "12 Dec 2024",
    title: "Building Visions into Reality",
    description:
      "Business and entrepreneurship are the engines of innovation and economic growth, driving change in industries and communities worldwide. This content explores the journey of creating and scaling businesses, offering insights into market trends, strategic planning, and leadership. From crafting a winning business model to navigating challenges and seizing opportunities, discover tools and stories that empower aspiring entrepreneurs and seasoned professionals alike. Uncover the mindset, strategies, and resilience needed to turn ideas into impactful ventures and build a legacy of success.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "10 mins read",
  },

  {
    _id: "eee",
    category: "Education",
    image: education_img,
    date: "17 Feb 2024",
    title: "Empowering Minds, Shaping Futures",
    description:
      "Education is the foundation of personal growth and societal progress, unlocking potential and fostering innovation. This content dives into the transformative power of learning, exploring modern teaching methods, digital education trends, and the importance of lifelong learning. From understanding the challenges in global education systems to embracing emerging technologies like AI-driven learning platforms, discover how education evolves to meet the needs of a changing world. Gain insights into how education builds not just knowledge, but the skills and resilience required for a brighter future.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "12 mins read",
  },

  {
    _id: "fff",
    category: "Lifestyle",
    image: lifestyle_img,
    date: "19 Nov 2024",
    title: "Crafting a Life of Balance and Fulfillment",
    description:
      "Lifestyle encompasses the choices and habits that define how we live, work, and play. This content explores the art of living intentionally, offering insights into wellness, productivity, fashion, travel, and personal growth. From creating a harmonious work-life balance to embracing sustainable practices and cultivating mindfulness, discover practical tips and inspiring stories that empower you to design a life that reflects your values and passions. Dive into the trends and timeless principles that shape a fulfilling and meaningful lifestyle.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "6 mins read",
  },

  {
    _id: "ggg",
    category: "Travel",
    image: nature_travel_women_img,
    date: "21 Aug 2024",
    title: "Exploring the World, Enriching the Soul",
    description:
      "Travel is a gateway to discovery, offering experiences that broaden horizons and deepen connections with the world. This content takes you on a journey through breathtaking destinations, cultural wonders, and practical travel tips. From planning your next adventure to uncovering hidden gems, learn how to make the most of every trip. Explore the transformative power of travel as it inspires personal growth, fosters global understanding, and creates unforgettable memories. Whether you're a seasoned globetrotter or a curious wanderer, let this guide fuel your wanderlust.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "9 mins read",
  },

  {
    _id: "hhh",
    category: "Entertainment",
    image: entertaintment_img,
    date: "7 Jan 2024",
    title: "Stories, Music, and Moments That Move Us",
    description:
      "Entertainment is the heartbeat of culture, bringing joy, inspiration, and connection to our lives. This content dives into the dynamic world of movies, music, gaming, and live performances, exploring how they reflect and shape society. From the latest blockbusters and chart-topping hits to emerging trends in digital media, uncover the creativity and innovation behind the entertainment we love. Celebrate the stories and artists that captivate our imaginations and learn how entertainment continues to evolve in an ever-changing world.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "18 mins read",
  },

  {
    _id: "iii",
    category: "Finance",
    image: finance_img,
    date: "27 Mar 2024",
    title: "Mastering Money for a Secure Future",
    description:
      "Finance is the cornerstone of achieving personal and professional goals, empowering individuals and businesses to thrive. This content explores the fundamentals of managing money, from budgeting and saving to investing and wealth creation. Dive into insights on financial planning, market trends, and strategies for building long-term security. Whether you’re navigating personal finance, launching a business, or seeking to grow your portfolio, discover tools and tips that help you make informed decisions and unlock financial freedom.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "21 mins read",
  },

  {
    _id: "jjj",
    category: "Health",
    image: health_img,
    date: "27 Oct 2024",
    title: "Nurturing Body, Mind, and Well-being",
    description:
      "Health is the foundation of a vibrant and fulfilling life, encompassing physical fitness, mental clarity, and emotional balance. This content explores the journey to holistic well-being, offering insights into nutrition, exercise, mental health, and preventive care. Learn practical tips for managing stress, cultivating healthy habits, and understanding the latest advancements in healthcare. Whether you're striving for peak performance or simply aiming to feel your best, discover strategies and inspiration to support your wellness goals and enhance your quality of life.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "13 mins read",
  },

  {
    _id: "kkk",
    category: "Self-Improvement",
    image: self_improvement_img,
    date: "14 Feb 2024",
    title: "Unlocking Your Full Potential",
    description:
      "Self-improvement is a lifelong journey of growth, empowerment, and transformation. This content explores actionable strategies for cultivating a positive mindset, enhancing productivity, and developing key life skills. Learn how to overcome challenges, set meaningful goals, and foster resilience. Whether you're focused on boosting your confidence, mastering time management, or creating healthier habits, discover tools and insights to help you unlock your true potential and lead a more fulfilled and purpose-driven life.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "16 mins read",
  },

  {
    _id: "lll",
    category: "Sports & Fitness",
    image: sport_fitness_img,
    date: "28 Nov 2024",
    title: "Achieving Peak Performance and Well-being",
    description:
      "Sports and fitness are key to maintaining a healthy lifestyle, enhancing physical strength, and boosting mental well-being. This content explores various sports, workout routines, and fitness strategies to help individuals of all levels stay active, motivated, and injury-free. From exploring team sports and endurance challenges to understanding the science of strength training and recovery, discover tips and techniques that elevate your fitness journey. Whether you're a professional athlete or someone looking to improve your overall health, learn how to push boundaries and achieve your fitness goals.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "17 mins read",
  },

  {
    _id: "mmm",
    category: "Technology",
    image: cyber_security_img,
    date: "3 Jan 2025",
    title: "Importance of Cyber Security in the Digital Age",
    description:
      "As our lives become increasingly digital, the threat landscape expands, putting personal data, financial information, and even national infrastructure at risk. This topic explores the essential role of cyber security in protecting digital assets, ensuring privacy, and maintaining trust in technology-driven systems.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "11 mins read",
  },

  {
    _id: "nnn",
    category: "Technology",
    image: programming_img,
    date: "3 Jan 2025",
    title:
      "Introduction to Programming: Building the Foundation of Software Development",
    description:
      "Programming is the backbone of modern technology, enabling the creation of software, applications, and systems. This topic introduces the basics of programming, covering key concepts such as syntax, logic, and algorithms, along with an overview of popular programming languages.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "9 mins read",
  },

  {
    _id: "ooo",
    category: "Technology",
    image: data_science_img,
    date: "3 Jan 2025",
    title:
      "What is Data Science? Understanding the Core Concepts and Applications",
    description:
      "Data science is a multidisciplinary field that combines statistics, programming, and domain expertise to extract insights from data. This topic introduces key components of data science, including data collection, cleaning, analysis, and visualization, and discusses its applications in various industries.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "4 mins read",
  },

  {
    _id: "ppp",
    category: "Technology",
    image: ai_img,
    date: "3 Jan 2025",
    title:
      "An Introduction to Artificial Intelligence: Concepts and Applications",
    description:
      "Artificial Intelligence (AI) refers to the development of computer systems capable of performing tasks that typically require human intelligence, such as learning, reasoning, and decision-making. This topic provides an overview of AI, its core concepts, and real-world applications in healthcare, finance, transportation, and more.",
    postCreatorProfile: profile_r_img,
    postCreatorName: "Ritesh Kumar",
    read: "4 mins read",
  },
];
