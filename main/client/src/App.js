import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
// import Home from './Pages/Home'
import avatar from './Components/assets/newchatbot2.png'
import ContactUs from './Pages/ContactUs'
import PageNotFound from './Pages/PageNotFound'

import FilterBanner from './Components/FilterBanner/FilterBanner';
import About from './Components/About';
import PricePrediction from './Components/PricePrediction/PricePrediction';
import Islamabad from './Components/PricePrediction/Islamabad';
import Rawalpindi from './Components/PricePrediction/Rawalpindi';
import Faisalabad from './Components/PricePrediction/Faisalabad';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import SelectCity from './Components/PricePrediction/SelectCity';
import PropertyPost from './Components/Posts/PropertyPost';
import UserDashboard from './Components/Dashboard/UserDashboard';
import UserSignIn from './Components/SignIn/UserSignIn';
import UserSignUp from './Components/SignUp/UserSignUp';
import AddUserBlog from './Components/AddBlog/AddUserBlog';
import AddUserPost from './Components/AddPost/AddUserPost';
import UserBlog from './Components/Blogs/UserBlog';
import Contact from './Components/Contact';
import Chatbot from './Components/Chatbot'

function App() {

  const [loginStatus, setLoginstatus] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("estateUser")
    setLoginstatus(user)

  }, [loginStatus])


  const [showComp, setShowComp] = useState(false);

    const HandleOnClick = () => {
        console.log("working")
        if (showComp === false) {
            setShowComp(true)
        } else {
            setShowComp(false)
        }
    }



  return (
    <>
      {/* chatbot model  */}
      <div className='chatbot-model'>
        <button className='chatbot-popper-btn' onClick={HandleOnClick} style={{ borderRadius: "10px" }}>
          <img style={{ borderRadius: "50%" }} src={avatar} alt=">" width={40} />Start a conversation
        </button>
      </div>
      <div>
        {
          showComp === true ?
            <Chatbot />
            : null
        }
      </div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index={true} path="/" element={<FilterBanner />} />
          <Route path="/dashboard" element={loginStatus ? <UserDashboard /> : <Navigate to="/signin" />} />
          <Route path="/post/:id" element={<PropertyPost />} />
          <Route path="/blog/:id" element={<UserBlog />} />
          <Route path="/dashboard/addpost" element={loginStatus ? <AddUserPost /> : <Navigate to="/signin" />} />
          <Route path="/dashboard/addblog" element={loginStatus ? <AddUserBlog /> : <Navigate to="/signin" />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/prediction" element={<SelectCity />} />
          <Route path="/karachi" element={<PricePrediction />} />
          <Route path="/islamabad" element={<Islamabad />} />
          <Route path="/rawalpindi" element={<Rawalpindi />} />
          <Route path="/faisalabad" element={<Faisalabad />} />


          <Route path="/contactus" element={<Contact />} />
          <Route path="/signin" element={!loginStatus ? <UserSignIn /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!loginStatus ? <UserSignUp /> : <Navigate to="/dashboard" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
