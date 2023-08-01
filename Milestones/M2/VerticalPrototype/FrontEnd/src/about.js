import React, { useState } from 'react'
import items from './data'
import './index.css';
const all_Items = [...new Set(items.map((item) => item.category))]

//Function to show filter buttons
const Groups = ({ categories, filterItems }) => {
  return (
    <div className="button-holder">
      {categories.map((category, index) => {
        return (
          <button type="button" className="button-filter" key={index} onClick={() => filterItems(category)}> {category} </button>
          )
        })
      }
    </div>
  )
}

//Function to display member details
const Team = ({ items }) => {
  return (
    <div className="section-center">
      {items.map((memberInfo) => {
        const { id, name, img, role, desc } = memberInfo
        
        return (
          <article key={id} 
          className="member-section">
            <img src={img} alt={name} 
            className="photo"/>
            <div className="item-info">
              <header>
                <h3>
                  {name}
                </h3>
                <h4 className="role">
                  {role}
                </h4>
              </header>
              <p className="member-description">
                {desc}
              </p>
            </div>
          </article>
              )
            })
           }
    </div>
  )
}

//Main Function
function About() {
  //const setFirst = items.filter((item) => item.id == 1)
  const [memberInfos, setmemberInfos] = useState(items)
  const [categories] = useState(all_Items)

  const filterItems = (category) => {
    const newItems = items.filter((item) => item.category === category)
    setmemberInfos(newItems)
  } //Filters based on what button is pressed

  return (
    <main>
      <section className="OurTeam section">
        <div className="name">
          <h2>
            Our Team
          </h2>
        </div>
        <Groups categories = {categories} 
        filterItems={filterItems} />
        <Team items={memberInfos} />
      </section>
    </main>
  )
}

export default About;

