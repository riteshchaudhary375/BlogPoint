import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/profile" element={<Profile />} />

          {/* Private Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin Route */}
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Routes>

        <Footer />
      </BrowserRouter>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
