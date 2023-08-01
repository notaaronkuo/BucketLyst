import React from "react";
import { Link } from "react-router-dom";
import Sidebar from './components/Bars/sidebar';
import Topbar from './components/Bars/topbar';
import MyFeed from './components/ListCardsPage/list-cards';
import { Authenticator} from '@aws-amplify/ui-react';
import UserLayout from './components/Users/user-profile';

import YourProfile from './components/Users/your-profile';
import EditProfile from './components/edit_profile';
import Settings from './components/settings';
import Tasks from "./components/ListPage/tasks";
import HomeMain from "./components/HomePage/show-location";

import ImplementLater from "./components/implement-later";
import { SidebarLanding } from "./components/Bars/sidebar";
import { TopbarLanding } from "./components/Bars/topbar";
import EachListMain from "./components/ListPage/each-list";
import EditListMain from "./components/ListPage/edit-list";

import Footer from './components/Bars/footer';

import Soon from './components/error';

import { useParams, useLocation } from 'react-router-dom';
import { API } from "aws-amplify";

import HomePage from './pages/HomePage';
import "./pages/css/MainPages.css";
import User_lists from "./components/Users/user_listing";


function BucketLyst({ setIsLoggedIn }) {
  const params = useParams();

  const location = useLocation();
  const showUsername = sessionStorage.getItem('username'); //For backend to send in username name
  const showEmail = sessionStorage.getItem('email');

  const isUserPage = location.pathname.includes('/userpage/');
  const isEachListPage = location.pathname.includes('/eachlist');
  
  return (  
      <div class = "holder">
            {(location.pathname !== '/terms' && location.pathname !== '/login1' && location.pathname !== '/member' && location.pathname !== '/reset1' && location.pathname !== '/reset2' && location.pathname !== '/bmembership' && location.pathname !== '/blogin'&& location.pathname !== '/') && <Sidebar />}
            {(location.pathname !== '/terms' && location.pathname !== '/login1' && location.pathname !== '/member' && location.pathname !== '/reset1' && location.pathname !== '/reset2' && location.pathname !== '/bmembership' && location.pathname !== '/blogin' && location.pathname !== '/' ) && <Topbar setIsLoggedIn={setIsLoggedIn} />}

             {(location.pathname === '/ownlist' || location.pathname === '/listsaved' || location.pathname === '/listdiscover' || location.pathname === '/listfollow') && (<MyFeed />)}
            
            {(location.pathname === '/') && (< TopbarLanding/>)}

            {(location.pathname === '/home') && (<HomeMain/>)}


            {(location.pathname === '/yourprofile') && (<YourProfile />)}
            {(location.pathname === '/editprofile') && (<EditProfile/>)}
            {(location.pathname === '/settings') && (<Settings/>)}

            {(location.pathname === '/tasks') && (<Tasks/>)}

            {(location.pathname === '/editlist') && (<EditListMain/>)}

            
            {(location.pathname === '/users') && (<User_lists/>)}
            {(location.pathname === '/userpage') && (<UserLayout/>)}

            
            {isUserPage && <UserLayout />}
            {isEachListPage && <EachListMain/>}

            {(location.pathname === '/implementlater') && (<ImplementLater/>)}

            {/*<Footer/>*/}
    

    </div>
    
  
     );
    
}

export default BucketLyst;