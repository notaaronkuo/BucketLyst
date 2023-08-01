import React, { useState } from 'react';
//import items from './data-list';
//import items2 from './data-users';
//import items_1 from './test_data1';
//import items_2 from './test_data2';

import './searchBar.css';
import {API} from "aws-amplify";
var selectType = 0;


const Team = ({TestList}) => {
  console.log("Successfully in Team TestList");
  return (
    <div className="section-center">
      {TestList && TestList.map((memberInfo) => {
        const { list_id, name, description, is_public, creation_date, tags, owner_fk, photo} = memberInfo

        return (

          <article key={list_id}
          className="member-section">

            <div className="lists-info">
              <header>
                <h3>
                  Location List name: {name}
                </h3>
                <h4 className="location-name">
                   Creation date: {creation_date}
                </h4>
              </header>
              <p className="location-list-desc">
                {description}
              </p>
              <h4 className="location-id">
                  is_public: {is_public}
                </h4>
                <h4 className="user-id">
                  tags: {tags}
                </h4>
                <h4>
                  owner_fk: {owner_fk}
                </h4>
                <img src={photo} alt={name} 
                  className="photoMap"/>

            </div>

          </article>

              )
            })
           }
    </div>
  )
}

const Users = ({ TestList2 }) => {
  return (
    <div className="section-center">
      {TestList2 && TestList2.map((UsersInfo) => {
        const { user_id, username, email, password, is_public} = UsersInfo

        return (

          <article key={user_id}
          className="member-section">

            <div className="users-info">
              <header>
                <h3>
                  Username: {username}
                </h3>
              </header>
              <p className="users-email">
                {email}
              </p>
              <h4 className="users-password">
                  Password: {password}
                </h4>
                <h4 className="user-public">
                  isPublic: {is_public}
                </h4>

            </div>

          </article>

              )
            })
           }
    </div>
  )
}

function SearchBar() {
  const [param1, setParam1] = useState('');
  //const [param2, setParam2] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParamValue, setSelectedParamValue] = useState('');

  const [TestList, setTestList] = useState([]);
  const [TestList2, setTestList2] = useState([]);
  const [loading, setLoading] = useState(false);

  const [memberInfos] = useState(TestList)
  const [UsersInfos] = useState(TestList2)

  var testCase = 0;

  const handleChangeParam1 = (event) => {
    const selectedValue = event.target.value;
    console.log(`Selected parameter 1: ${selectedValue}`);
    setParam1(selectedValue);


    if(selectedValue == 'value1') {
      selectType = 1;
      console.log(`List selected` + selectType);
      //setSelectedParamValue("");
     // setSelectedParamValue(<Team items_1={memberInfos} />);
     setSelectedParamValue(<Team TestList={memberInfos} />);

    } else if(selectedValue == 'value2') {
      selectType = 1;
      console.log(`User selected:` + selectType);
      //setSelectedParamValue(<Users items_2={UsersInfos} />);
    } else{
      selectType = 0;
      console.log("Nothing selected" + selectType);
      //setSelectedParamValue("");
      setSelectedParamValue(<Users TestList2={UsersInfos} />);
      //Default selection

    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if(param1 == 'value1' && searchTerm){
    //   console.log(`Search term: ${searchTerm}`);
    //   setSelectedParamValue(<Team items={memberInfos.filter(memberInfo => memberInfo.LocationListName.includes(searchTerm))} />);
    //   console.log("this is line 127 of searchbar.jsx");
    // }
    // else if(param1 == 'value2' && searchTerm){
    //   console.log(`Search term: ${searchTerm}`);
    //   setSelectedParamValue(<Users items2={UsersInfos.filter(UsersInfo => UsersInfo.Username.includes(searchTerm))} />)
    //   console.log("This is line 132 of searchbar.jsx");
    // }
    setLoading(true);
    let myAPI = "api7e5457cb";
    let searchItem = null;

    if (selectType === 0){
      setLoading(false);
      setSelectedParamValue("Please choose a list type");
      console.log("2. Nothing selected" + selectType);
      console.log("Searchterm: " + searchTerm)
    }

    if (searchTerm == "" || searchTerm == null){
      setLoading(false);
      console.log("Nothing inputted.");
      setSelectedParamValue("Nothing has been inputted");
    }
  
  console.log("Version Format, 18.0");

  if(param1 == 'value1' && searchTerm){
    
    async function fetchData() {
      try {
        const res = await API.get(myAPI, "/search/lists/" + searchTerm);
        console.log("api returned" + res); 
        console.log(res);
        if (res) {
          console.log("data not empty"); 
          const { result } = res;
          setTestList(result.map(item => ({
            list_id: item.list_id,
            name: item.name,
            description: item.description,
            is_public: item.is_public,
            creation_date: item.creation_date,
            tags: item.tags,
            owner_fk: item.owner_fk,
            photo: item.photo,
        })));
          setLoading(false);
          console.log("TestList below");
          console.log(TestList);
          console.log("Result below");
          console.log(result);
          if(result.length == 0){
            console.log("No data returned");
            setSelectedParamValue("Sorry, " + searchTerm + " has no results for Lists.");
          } else {
            setSelectedParamValue(<Team TestList={result} />); }
          
        } else {
          console.log("API call returned empty data");
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchData();
  } 

  else if (param1 === 'value2' && searchTerm) {
    
        async function fetchData() {
          try {
            const res = await API.get(myAPI, "/search/users/" + searchTerm);
            console.log("api returned" + res); 
            console.log(res);
            if (res) {
              console.log("data not empty"); 
              const { result } = res;
              setTestList2(result.map(item => ({
                user_id: item.user_id,
                username: item.username,
                email: item.email,
                password: item.password,
                is_public: item.isPublic,
            })));
            setLoading(false);
              console.log("TestList2 below");
              console.log(TestList2);
              console.log("Result below");
              console.log(result);
              if(result.length == 0){
                console.log("No data returned");
                setSelectedParamValue("Sorry, " + searchTerm + " has no results for Users.");
              } else {
              setSelectedParamValue(<Users TestList2={result}  />); }
              
              
            } else {
              console.log("API call returned empty data");
            }
          } catch (err) {
            console.log(err);
            setLoading(false);
          }
        }
        fetchData();
      }     
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="param1">Search by Type:</label>
      <select id="param1" name="param1" value={param1} onChange={handleChangeParam1}>
        <option value="">-- Select search type --</option>
        <option value="value1">List Name</option>
        <option value="value2">User</option>
      </select>

      <label htmlFor="search">Search:</label>
        <input type="text" id="search" name="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

        <button type="submit">Search</button>
      </form>

      {loading && <div><h4>Please wait... Loading</h4></div>}
      {selectedParamValue && (
        <div>{selectedParamValue}</div>
      )}
    </div>
  );
}

export default SearchBar;
