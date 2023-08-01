/*<a href="https://ibb.co/Yhk9m0v"><img src="https://i.ibb.co/Wfy9ZVS/share.png" alt="share" border="0"></a><a href="https://imgbb.com/"><img src="https://i.ibb.co/5RSDTRV/icon-lock.png" alt="icon-lock" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/9YrqSfX/icon-more-vert.png" alt="icon-more-vert" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/T1jV1gv/icon-setting-5.png" alt="icon-setting-5" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/pfjVXZR/icon-share-ios.png" alt="icon-share-ios" border="0"></a> */
import React, { useState, useEffect } from "react";

import { Link , useLocation, useNavigate } from "react-router-dom";
import "../css/ListingPage.css";
import ListListing, { ListingEdit } from "./list-listing";
import EachListDummyData from "../DummyData/eachlist-dummy";
import MapWithPlaceID from "../google/rabin-map";
import locationsData from "../DummyData/locations-dummy-data";

import {ListListingC, ListFilterC, ListShareC} from "./tasks";


function EachListHeader(props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page in the browser's history
  };
  const { data } = props;

  if (!data) {
    // Handle the case when data is null or undefined
    return <h1>Please try again later</h1>; // or you can return an error message or fallback content
  }
  const { title, description } = data;

    return (
        <div className="each-list-header">

            <div className="elh-r1">
                Edit List
            </div>

            <div className="elh-r2">
  <form className="elh-r2-form">
    <input type="text" defaultValue={title} className="elh-r2-input" />
  </form>
</div>

<div className="elh-r3">
  <form className="elh-r3-form">
    <textarea defaultValue={description} className="elh-r3-textarea" maxlength="200" />
  </form>
</div>

            <div className="elh-r4">
                <div className = "elh-visible" style={{ width: '5%', height: 'auto',  overflow: 'hidden', border: 'none', backgroundColor: 'white',}}>
                    <img className = "visible-img" src="https://i.ibb.co/WzhsYbZ/icon-lock.png" alt="List Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className = "elh-visible-text">{}</div>
                <div className = "elh-r4-spacer"></div>
                
            </div>

            <div className="elh-r5">
                    <input className = 'elh-search' type="text" placeholder="Search.."></input>
                
            </div>

            <div className="elh-c1">
               =
                <button className ="elh-edit-button">
                    <img className = "edit-img" onClick ={goBack} src="https://i.ibb.co/G7PkSMf/Left-icon.png" alt="List Icon" style={{ width: 'auto', height: '50%', objectFit: 'cover' }} />
                    <div style = {{fontSize: '1rem'}}>Save</div>
                </button>
           

            </div>

            <div className="elh-c2">

                    <button className="elh-button">
                        <img className = "sidebar-img" src="https://i.ibb.co/T1jV1gv/icon-setting-5.png" alt="Filter bars" style={{ width: 'auto', height: '80%', objectFit: 'cover' }} />
                        <div className="elh-button-text">Filter</div>
                    </button>
                    
                    <button className="elh-button">
                        <div className="elh-button-text">Sort</div>
                    </button>
                
            </div>

            <div className="elh-e"></div>
        </div>

    );

}
function EachListListing({ locationdata1, setPlaceID }) {
  const [locations, setLocations] = useState(locationdata1 ? Object.values(locationdata1) : []);

  if (!locationdata1) {
    // Handle the case when locationdata1 is null or undefined
    return <h1>Try again later</h1>; // or you can return an error message or fallback content
  }

 
  const handleDelete = (id) => {
    const updatedLocations = locations.filter((location) => location.id !== id);
    setLocations(updatedLocations);

    // Make an API request to delete the data
    // fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    //   .then((response) => {
    //     if (response.ok) {
    //       // Update the locations state or perform additional actions
    //       // based on the successful deletion
    //     } else {
    //       // Handle error response
    //     }
    //   })
    //   .catch((error) => {
    //     // Handle error
    //   });
  };

  // Rest of your component code
  // ...



    
    return (
        <div className="each-list-listing-holder">

{locations.map((location) => (
        <ListingEdit
          key={location.id}
          locationdata={location}
          onDelete={handleDelete}
        />
      ))}


        </div>

    );

}

function EditListMain() {
  const [place_id, setPlaceID] = useState("ChIJN1t_tDeuEmsRUsoyG83frY4");
  const [routeID, setRouteID] = useState(0); 
  const [MyLocations, setLocations] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation();
  const [selectedRow, setSelctedRow] = useState(1);
  

  function getCurrentRouteID() {

    const routeID = location.pathname.split('/').pop();
    return parseInt(routeID);
  }
  function getCurrentRoute() {
    const routeID = location.pathname.split('/').pop();
    return parseInt(routeID);
  }
  const MyrouteID = getCurrentRoute();
 
  const apiKey = 'lc898rllgd'; // Replace 'YOUR_API_KEY' with your actual API key
    
    async function getLocationInfo() {
      console.log("Retrieving LocationData");
      
      const apiUrl = `https://lc898rllgd.execute-api.us-east-1.amazonaws.com/dev/location?list_fk=${getCurrentRoute()}`;
    
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'x-api-key': apiKey,
          },
        });/**"id": 14,
        "name": "Benihana",
        "description": "A yummy place to watch people cook",
        "list_fk": 10,
        "tags": "delicious, yum",
        "place_id": "ChIJJbERecZmhYAR2iQac1pQKlQ",
        "rating": 5,
        "creation_time": "2023-05-25T07:11:11.000Z",
        "latitude": 37.97000879999999,
        "longitude": -122.0579529 */
        const data = await response.json();
        console.log("data recieved: " + data);
        const fetchedMyLocations = data.body.map((Loc) => ({
          name: Loc.name,
          description: Loc.description,
          list_fk: Loc.list_fk,
          tags: Loc.tags,
          place_id: Loc.place_id,
          rating: Loc.rating,
          creation_time:Loc.creation_time,
          latitude: Loc.latitude,
          longitude: Loc.longitude
        }));
        setLocations(fetchedMyLocations);
        console.log(`API request received with: ${JSON.stringify(data)}`);
        console.log("API request received with MyUser:", fetchedMyLocations);
        setIsLoading(false);
        

      } catch (error) {
        console.log(`API request has failed: ${error}`);
      }
    }

    const [Lists, setLists] = useState(null);
    async function getListInfo() {
      console.log("Retrieving List Data");
      const apiUrl = `https://z3f03m72db.execute-api.us-east-1.amazonaws.com/dev/viewlist?listType=myList&userid=${sessionStorage.getItem('userid')}`;
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
          bookmarks: list.bookmarks,
          tags: list.tags,
          place_id: list.place_id
        }));
        
        setLists(fetchedLists);
        const selectedRow = Lists.find(item => item.listID === getCurrentRoute());
  
        console.log("API request received with  the Lists:", fetchedLists);
        setIsLoading(false);
        
      } catch (error) {
        console.log("API request has failed with Lists:", error);
      }
    }

    const loadGoogleMapsAPI = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0&libraries=places`;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    useEffect(() => {
      if (!window.google) {
        loadGoogleMapsAPI()
          .catch(error => {
            console.error('Error loading Google Maps API:', error);
          });
      } else {
        console.log("google maps loaded!");
      }
      
      getListInfo();
      console.log("In each list main");
      const currentRouteID = getCurrentRouteID();
      setRouteID(currentRouteID);
      getLocationInfo();
      console.log(`API contents: ${MyLocations}`);
      console.log(`API contents: ${Lists}`);
    }, []);


  return (
    <div className='main-container'>
        
    <div className= "each-list-container">

   

    {MyLocations === null && Lists === null ? (
      
        <div className='loading-icon-holder'>
          <div className='loading-icon'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div></div>
     
      ) : (<>
       <EachListHeader data={Lists && Lists[selectedRow]} />
<EachListListing locationdata1={MyLocations && MyLocations} setPlaceID={setPlaceID} />
        <div className= "each-list-map-holder">

            {/*<img className = "eachlist-map" src="https://i.ibb.co/85fw9q6/map-each-lists.png" alt="map-each-lists" border="0"></img>*/}
            <MapWithPlaceID placeid = {place_id}/>
        </div>
        </> )}

    </div>

</div>
);
}



export default EditListMain;