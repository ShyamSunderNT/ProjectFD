import React from 'react';
import Home from './Pages/Home';
import DirectorRegister from './Components/directorRegister';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArtistRegister from './Components/artistRegister';
import OtpVerify from './Pages/directorotp';
import { Toaster } from 'react-hot-toast';
import DirectorLogin from './Components/directorLogin';
import ArtistLogin from './Components/artistLogin';
import Directordashboard from './Pages/directordashboard';
import Artistdashboard from './Pages/artistdashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import GoogleOAuthProvider
import Home1 from './Pages/Home1';
import { AuthProvider } from './contaxt/AuthContaxt';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (

    <AuthProvider>
    <GoogleOAuthProvider clientId="823072459400-7fdja834bo50lf0biatqiriunmbu8jg2.apps.googleusercontent.com">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home1 />} />
            <Route path='/new' element={<Home />} />
            <Route path='/director-register' element={<DirectorRegister />} />
            <Route path="/artist-register" element={<ArtistRegister />} />
            <Route path='/otpverify' element={<OtpVerify />} />
            <Route path='/director-login' element={<DirectorLogin />} />
            <Route path='/artist-login' element={<ArtistLogin />} />
            <Route path="/director-dashboard" element={<Directordashboard />} />
            <Route path="/artist-dashboard" element={<Artistdashboard />} />
          </Routes>
        </BrowserRouter>

        {/* Toaster for success/error messages */}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </GoogleOAuthProvider>
    </AuthProvider>
  );
};

export default App;
