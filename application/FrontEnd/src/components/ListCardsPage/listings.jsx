import React, { useState } from 'react';

import FeedBar from '../FeedBar';
import '../css/list_item.css';
//import ListItem from './list_item';
import { Link } from 'react-router-dom';
import SearchHotbar from '../search_hotbar';


const myAPI = "qzkui2lj3d";
const pth = '/customer';

function List_Item({ id, name, desc, date, tags, owner, photo }) {
  return (
    <Link to = "/viewlist"><div class="list-feed-component">
      <div class="your-list-feed">
        <div id="your-Listname">{name}</div>
        <div id="your-edit-button">
          <button className="listing-button"></button>
        </div>

        <div id="your-Description">{desc}</div>
        <div id="your-tags">{tags.join(' ')}</div>
        <img id="your-list-pfp" src={photo} alt="pfp-photo" />
      </div>
    </div></Link>
  );
}

function Feed({ map }) {
  const listings = [];

  for (const [id, values] of Object.entries(map)) {
    listings.push(<List_Item key={id} {...values} />);
  }

  return (
    <div class="main-container">
      {/*<SearchHotbar/>*/}
      <FeedBar />
      <div class = "ttl">
          <h1>Got a Place you want to mark down? Get started and add it to a list!</h1>
          <h2>Or check out recommend places from other people's lists!</h2>
      </div>
      <div class="feed-listings">{listings}</div>
    </div>
  );
}

function MyFeed() {

  const dummyData = {
    1: {
      id: 1,
      name: "List 1",
      desc: "Description of List 1, DescriptionLorem ipsum dolor sit amet, consectetur adipiscing elit. In metus magna, pellentesque ut efficitur commodo, commodo a",
      date: "2023-04-27",
      tags: ["tag1", "tag2", "tag3"],
      owner: "John Doe",
      photo: "https://dummyimage.com/200x200/000/fff"
    },
    2: {
      id: 2,
      name: "List 2",
      desc: "Description of List 2, DescriptionLorem ipsum dolor sit amet, consectetur adipiscing elit. In metus magna, pellentesque ut efficitur commodo, commodo a",
      date: "2023-04-26",
      tags: ["tag4", "tag5"],
      owner: "Jane Doe",
      photo: "https://dummyimage.com/200x200/000/fff"
    },
    3: {
      id: 3,
      name: "List 3",
      desc: "Description of List 3, DescriptionLorem ipsum dolor sit amet, consectetur adipiscing elit. In metus magna, pellentesque ut efficitur commodo, commodo a",
      date: "2023-04-25",
      tags: ["tag1", "tag6"],
      owner: "Bob Smith",
      photo: "https://dummyimage.com/200x200/000/fff"
    }
  };

  const [input, setInput] = useState("")
  const [customers, setCustomers] = useState([])

  function getListDetails(e){
    console.log()
  }

  return (
    <Feed map={dummyData} />
  );
}


export default MyFeed;