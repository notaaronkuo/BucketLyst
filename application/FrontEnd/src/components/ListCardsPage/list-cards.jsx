import React, { useEffect, useState } from "react";

import "../css/Home.css";
import "../css/ListItems.css";
import { API } from "aws-amplify";
import { Link, useLocation, Switch } from "react-router-dom";
import MakeListWindow from "./make-list";


import {
  DummyData2,
  DummyData3,
  DummyData4,
} from "../DummyData/listings-dummy-data";
import DummyData from "../DummyData/listings-dummy-data";

function HomeHeader() {
  const location = useLocation();

  const [showWindow, setShowWindow] = useState(false);


  const [lists, setLists] = useState(null);

  const handleButtonClick = () => {
    setShowWindow(true);
  };

  const handleCloseWindow = () => {
    setShowWindow(false);
  };

  
/*
  useEffect(() => {
 /*   function loadMyLists() {
      return new Promise((resolve, reject) => {
        const apiName = "viewlist";
        const path = "/viewlist";
        const myInit = {
          headers: {},
          response: true,
          queryStringParameters: {
            userid: sessionStorage.getItem("userid"),
            listType: "myList",
          },
        };
        API.get(apiName, path, myInit).then((response) => {
          console.log(response);
        });

       //getListInfo();
       console.log(`API contents: ${lists}`);
      
    
  }, []);
*/
  return (
    <div className="home-header">
      <div className="home-title">Lists</div>

      <div className="home-switcher">
        <Link to="/ownlist">
          <button
            className={`home-switch-button ${
              location.pathname === "/ownlist" ? "underline" : ""
            }`}
          >
            My Lists
          </button>
        </Link>
        <Link to="/listfollow">
          <button
            className={`home-switch-button ${
              location.pathname === "/listfollow" ? "underline" : ""
            }`}
          >
            Following's List
          </button>
        </Link>
        <Link to="/listdiscover">
          <button
            className={`home-switch-button ${
              location.pathname === "/listdiscover" ? "underline" : ""
            }`}
          >
            Discover
          </button>
        </Link>
        <Link to="/listsaved">
          <button
            className={`home-switch-button ${
              location.pathname === "/listsaved" ? "underline" : ""
            }`}
          >
            Saved
          </button>
        </Link>
      </div>


      <div className="home-button">
        <MakeListWindow />
      </div>

      <div className="home-empty"></div>
    </div>
  );
}

function ListItems({ 
  listID,
  title,
  description,
  visibility,
  bookmarks,
  place_id
}) {
  return (
    <div className="list-item">
      <div class="card">
        <div class="card-image">
    
            <img
              /*src={photo}*/
              src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
              alt="Image"
            ></img>
      
          <div class="bookmark-icon">
            <div class="bookmark-background">
              <div class="bookmark-logo">
                <i class="fa fa-bookmark"></i>
              </div>
              <img
                src="https://i.ibb.co/SnnpXyQ/bookmark.png"
                alt="Home Icon"
                style={{ width: "50%", height: "auto", objectFit: "cover" }}
              ></img>
              <div class="bookmark-count">{bookmarks}</div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div className="card-title">{title} </div>
          <p class="card-description">{description}</p>
        {/*}  <div class="footer-text">{visibility}</div>*/}
       {/*}   <div class="footer-text">{place_id}</div>*/}
        </div>
      </div>

      {/*Tommy's part for designing a component */}
    </div>
  );
}

function ListItemsOthers({
  listID,
  title,
  description,
  visibility,
  ownerID,
  ownerUsername,
  ownerProfile,
  bookmarks,
  tags,
  place_id
}) {
  return (
    <div className="list-item">
      <div class="card">
        <div class="card-image">
         
            <img
              //src={photo}
              src="https://i.ibb.co/sR6cvst/Screen-Shot-2023-05-03-at-9-16-24-PM.png"
              alt="Image"
            ></img>
         
          <button
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "80px",
              height: "80px",
              cursor: "pointer",
              border: "3px solid white",
              padding: "0",
              zIndex: "1",
              borderRadius: "100px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.9)",
            }}
          >
            <img
              /*src={pfp}*/
              src={ownerProfile}
              alt="Profile Picture"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "100px",
                objectFit: "cover",
              }}
            />
          </button>
          <div class="bookmark-icon">
            <div class="bookmark-background">
              <div class="bookmark-logo">
                <i class="fa fa-bookmark"></i>
              </div>
              <img
                src="https://i.ibb.co/SnnpXyQ/bookmark.png"
                alt="Home Icon"
                style={{ width: "50%", height: "auto", objectFit: "cover" }}
              ></img>
              <div class="bookmark-count">{bookmarks}</div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div className="card-title">{title} </div>
          <p class="card-description">{description}</p>
        { /* <p class="card-more-description">{tags.join(" ")}</p>*/}
        {/*}  <div class="footer-text">fk: {ownerID}</div>
          <div class="footer-text">list id: {listID}</div>
            <div class="footer-text">is_public: {visibility}</div>*/}
          <div class="footer-text">{ownerUsername}</div>
        </div>
      </div>

      {/*Tommy's part for designing a component */}
    </div>
  );
}

// function ListHolder({ map }) {
//   const listings = [];

//   for (const [id, values] of Object.entries(map)) {
//     listings.push(<ListItems key={id} {...values} />);
//   }

//   return <div className="list-holder">{listings}</div>;
// }

//function ListHolder({ listType }) {
//  /*
//  const listings = [];
//
//  for (const [id, values] of Object.entries(map)) {
//    listings.push(<ListItems key={id} {...values} />);
//  }
//*/
//  //const userss = DummyData;
//
//  const [lists, setLists] = useState(null);
///*
//  function loadMyLists() {
//    return new Promise((resolve, reject) => {
//      const apiName = "viewlist";
//      const path = "/viewlist";
//      const myInit = {
//        headers: {},
//        response: true,
//        queryStringParameters: {
//          // userid: sessionStorage.getItem("userid"),
//          userid: 1,
//          listType: listType,
//        },
//      };
//
//      try {
//        const response = API.get(apiName, path, myInit).then((response) => {
//          console.log(response);
//          console.log("api works" + apiName);
//          console.log(path);
//        });
//
//        console.log("ASDFASDFA" + response.data.result);
//        // const fetchedUsers = response.data.result.map((user) => ({
//        //   // listID: user.listID,
//        //   // title: user.title,
//        //   // description: user.description,
//        //   // visibility: user.visibility,
//        //   // ownerID: user.ownerID,
//        //   // ownerUsername: user.ownerUsername,
//        //   // ownerProfile: user.ownerProfile,
//        //   // tags: user.tags,
//        //   // place_id: user.place_id,
//
//        //   // from dummy data
//        //   id: user.id,
//        //   // name: string;
//        //   // subtitle: string;
//        //   // tags: string[];
//        //   // user: string;
//        //   // pfp: string;
//        //   // bookmarks: string;
//        //   // photo: string;
//        // }));
//        console.log("before setList");
//        //setLists(fetchedUsers);
//        console.log("after setList fetchedUsers");
//
//        console.log(`API request received with:  ${response}`);
//      } catch (error) {
//        console.log(`API request ${apiName} has failed: ${error.response}`);
//      }
//      resolve(); // Resolve the promise to indicate completion
//    });
//  }*/
///*
//  useEffect(() => {
//    loadMyLists();
//    console.log("use effect ran for loadMyLists");
//  }, []);
//*/
//  const users = DummyData;
//  // console.log("testing" + setLists);
//  // console.log(lists);
//  return (
//    <div className="list-holder">
//      <ul>
//        {Object.values(users).map((user) => (
//          <li key={user.id}>
//            <Link to={`/userpage/${user.id}`}>
//              <ListItems {...user} />
//            </Link>
//          </li>
//        ))}
//      </ul>
//    </div>
//  );
//}


//Example of a filter by sorting by user id 
//Right now, 'YourLists 
function YourListHolder({ list }) {
  if (!list || list.length === 0) {
    return <div classname = "list-holder">No lists available.
    <div className="loading-icon-holder">
              <div className="loading-icon">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div></div>;
  }
  
  return (
  <div className="list-holder">
    {list.map((lists) => (
  <li key={lists.id}>
    <Link to={`/eachlist/${lists.listID}`}>
      <ListItems key={lists.id} {...lists} />
    </Link>
  </li>
))}

  </div>
  );
}

//Filter by if you are Following the list owner, You would have to make
// another api call to get who you are following
//
/*
function TheListHolder({ list }) {
  if (!list || list.length === 0) {
    return <div classname = "list-holder">No lists available.</div>;
  }
  
  const listings = list.map((lists) => (
    <ListItemsOthers key={lists.id} {...lists} />
  ));

  return <div className="list-holder">{listings}</div>;
}
*/
function TheListHolder({ list }) {
  if (!list || list.length === 0) {
    return <><div classname = "list-holder">No lists available.</div>
    <div className="loading-icon-holder">
              <div className="loading-icon">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>; </>
  }
  
  return (
  <div className="list-holder">
    {list.map((lists) => (
  <li key={lists.id}>
    <Link to={`/eachlist/${lists.listID}`}>
      <ListItemsOthers key={lists.id} {...lists} />
    </Link>
  </li>
))}

  </div>
  );
}

function MyFeed() {
  const location = useLocation();

  const [Lists, setLists] = useState([]);
  const [parameter, setParameter] = useState('discover');

  const [searchInput, setSearchInput] = useState("");
  const [isValidSearch, setIsValidSearch] = useState(true);
  const trimmedSearchInput = searchInput.trim();

  const following = "following";
  const myLists = "myList";
  const saved = "saved";
  const discover = "discover";

  async function getListInfo(param) {
    console.log("Retrieving List Data");
    const apiUrl = `https://z3f03m72db.execute-api.us-east-1.amazonaws.com/dev/viewlist?listType=${param}&userid=${sessionStorage.getItem('userid')}`;
    console.log("user id check:" + sessionStorage.getItem('userID'));

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("data received:", data);
      const fetchedLists = data.body.map((list) => ({
        listID: list.listID,
        title: list.title,
        description: list.description,
        visibility: list.list_is_public,
        ownerID: list.ownerID,
        ownerUsername: list.ownerUsername,
        ownerProfile: list.ownerProfile,
        bookmarks: list.bookmarks,
        tags: list.tags,
        place_id: list.place_id
      }));
      setLists(fetchedLists);
      console.log("API request received with MyLists:", fetchedLists);
    } catch (error) {
      console.log("API request has failed:", error);
    }
  }
  
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setIsValidSearch(true); // Reset the validation state when input changes
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (trimmedSearchInput === "") {
      setIsValidSearch(false);
      return;
    }
    console.log("loading mylists users");
  };
 

  useEffect(() => {
    if (location.pathname === "/ownlist") {
      setParameter(myLists);
    } else if (location.pathname === "/listfollow") {
      setParameter(following);
    } else if (location.pathname === "/listdiscover") {
      setParameter(discover);
    } else if (location.pathname === "/listsaved") {
      setParameter(saved);
    }
  }, [location.pathname]);
  
  useEffect(() => {
    getListInfo(parameter);
    console.log("API contents:", Lists);
  }, [parameter]);

  return (
    <div className="main-container">
      <div className="home-vertical-holder">
        <div className="home-middle">
          <HomeHeader />

          <div className="home-search-lists-holder">
          <div className="home-search-lists">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search.."
            value={searchInput}
            onChange={handleSearchInputChange}
            className={!isValidSearch ? "invalid" : ""}
          />
          {!isValidSearch && (
            <div className="error-alert">
              Please enter a valid search query.
            </div>
          )}
        </form>
      </div>
      </div>

          {!Lists ? (
            <div className="loading-icon-holder">
              <div className="loading-icon">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <>
              {location.pathname === "/ownlist" && (
                <>
                
                <YourListHolder list={Lists} />
                </>
              )}

              {location.pathname === "/listfollow" && (
                <>
          
                  <TheListHolder list={Lists} />
                </>
              )}

              {location.pathname === "/listdiscover" && (
                <>
                
                  <TheListHolder list={Lists} />
                </>
              )}

              {location.pathname === "/listsaved" && (
                <>
           
                  <TheListHolder list={Lists} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export { YourListHolder, ListItems, ListItemsOthers };
export default MyFeed;
