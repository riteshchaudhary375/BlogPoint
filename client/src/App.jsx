import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreatePost from "./pages/admin/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import UpdateUserPassword from "./pages/UpdateUserPassword";
import PrivateRouteForAdmin from "./components/PrivateRouteForAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DashPosts from "./pages/admin/DashPosts";
import DashUsers from "./pages/admin/DashUsers";

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

          {/* Private Route */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile/update-password"
              element={<UpdateUserPassword />}
            />
          </Route>

          {/* Admin Route */}
          <Route element={<PrivateRouteForAdmin />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Routes>

        <Footer />
      </BrowserRouter>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
