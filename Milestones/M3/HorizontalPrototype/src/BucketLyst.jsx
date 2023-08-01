import React from "react";
import { Link } from "react-router-dom";
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import MyFeed from './components/home';
import YourLists from './components/YourLists/your_lists';
import Users from './components/Users/user_listing';
import UserLayout from './components/user-layout';
import YourProfile from './components/your-profile';
import EditProfile from './components/edit_profile';
import Settings from './components/settings';

import ViewList from "./components/ListParts/c_viewlist";
import EditListLayout from './components/ListParts/c_editlist';
import MakeListLayout from './components/ListParts/c_makelist';
import SuccessList from './components/ListParts/c_successlist';
import OwnList from './components/ListParts/c_ownlist';

import ImplementLater from "./components/implement-later";
import { SidebarLanding } from "./components/sidebar";
import { TopbarLanding } from "./components/topbar";

import Footer from './components/footer';

import Soon from './components/error';

import { useLocation } from 'react-router-dom';


import "./pages/css/MainPages.css";

function BucketLyst() {
    const location = useLocation();
  return (  
      <div class = "holder">
            {(location.pathname !== '/login1' && location.pathname !== '/member' && location.pathname !== '/reset1' && location.pathname !== '/reset2' && location.pathname !== '/bmembership' && location.pathname !== '/blogin'&& location.pathname !== '/') && <Sidebar />}
            {(location.pathname !== '/login1' && location.pathname !== '/member' && location.pathname !== '/reset1' && location.pathname !== '/reset2' && location.pathname !== '/bmembership' && location.pathname !== '/blogin' && location.pathname !== '/' ) && <Topbar/>}

             {(location.pathname === '/home' || location.pathname === '/listsaved' || location.pathname === '/listdiscover' || location.pathname === '/listfollow') && (<MyFeed />)}
            
            {(location.pathname === '/') && (< TopbarLanding/>)}



            {(location.pathname === '/yourprofile') && (<YourProfile />)}
            {(location.pathname === '/editprofile') && (<EditProfile/>)}
            {(location.pathname === '/settings') && (<Settings/>)}

            {(location.pathname === '/editlist') && (<EditListLayout/>)}
            {(location.pathname === '/viewlist') && (<ViewList/>)}
            {(location.pathname === '/successlist') && (<SuccessList/>)}
            {(location.pathname === '/ownlist') && (<OwnList/>)}

            {(location.pathname === '/users') && (<Users/>)}
            {(location.pathname === '/userpage') && (<UserLayout/>)}

            {(location.pathname === '/makelist') && (<MakeListLayout/>)}

            {(location.pathname === '/implementlater') && (<ImplementLater/>)}

            {/*<Footer/>*/}
    

    </div>
    

  
     );
    
}

export default BucketLyst;