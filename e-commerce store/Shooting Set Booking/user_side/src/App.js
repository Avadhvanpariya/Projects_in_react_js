import { Routes, Route } from 'react-router-dom'

//page components
import Home from './pages/Home'
import Contact from './pages/Contact'

//components

import Profile from './pages/Profile';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';
import Logout from './components/logout';
import Videos from './pages/videos';
import Photos from './pages/photos';
import TermsAndCondition from './components/termsand-conditions';
import ReturnPolicy from './components/returnpolicy';
import PrivacyPolicy from './pages/privacypolicy';


function App() {
  return (
    <div className="text-center font-bold">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='contact' element={<Contact />} />
        <Route path='login' element={<LoginForm />} />
        <Route path='sign-up' element={<RegisterForm />} />
        <Route path='photos' element={<Photos />} />
        <Route path='videos' element={<Videos />} />
        <Route path='logout' element={<Logout />} />
        <Route path='TermsAndCondition' element={<TermsAndCondition />} />
        <Route path='returnpolicy' element={<ReturnPolicy />} />
        <Route path='privacypolicy' element={<PrivacyPolicy  />} />
      </Routes>

    </div>
  );
}

export default App;
