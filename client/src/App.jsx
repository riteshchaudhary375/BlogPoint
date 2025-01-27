import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreatePost from "./pages/adminCreator/CreatePost";
import UpdatePost from "./pages/adminCreator/UpdatePost";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteForAdmin from "./components/admin/PrivateRouteForAdmin";
import AdminDashboard from "./pages/adminCreator/Dashboard";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRouteAdminCreator from "./components/adminCreator/PrivateRouteAdminCreator";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  return (
    // <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    // <div className="">
    <BrowserRouter>
      {/* Scroll to top = 8:28:05 */}
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/post/:postSlug"
          element={
            <PostPage showModal={showModal} setShowModal={setShowModal} />
          }
        />

        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update-password" element={<UpdatePassword />} />
        </Route>

        {/* Admin Route */}
        <Route element={<PrivateRouteForAdmin />}></Route>

        {/* Admin & Creator Route */}
        <Route element={<PrivateRouteAdminCreator />}>
          <Route
            path="/dashboard"
            element={
              <AdminDashboard
                showModal={showModal}
                setShowModal={setShowModal}
                showMessageModal={showMessageModal}
                setShowMessageModal={setShowMessageModal}
              />
            }
          />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
      </Routes>

      <Footer showModal={showModal} showMessageModal={showMessageModal} />

      {/* the circle container on body is of react-hot-toast */}
      <Toaster position="bottom-right" reverseOrder={false} />
    </BrowserRouter>

    // </div>
  );
}

export default App;
