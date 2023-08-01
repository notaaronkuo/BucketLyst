import React, { useState } from "react";

import { Link } from "react-router-dom";

//For Tommy's part
//I highly recommend using the Flex property, flex within flex is a good tool
//helpful guide for Flex: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

function ListFilter() {

  const [isOpen, setIsOpen] = useState(false);

  const [selectedButton, setSelectedButton] = useState("any");
  const [selectedButton2, setSelectedButtonPrice] = useState("$");
  const [sliderValue, setSliderValue] = useState(25);
  const [isChecked, setIsChecked] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };


  const handleBackButtonClick = () => {
    window.history.goBack();
  };
  const handleButtonClick = (value) => {
    setSelectedButton(value);
  };
  const handleButtonClickPrice = (value) => {
    setSelectedButtonPrice(value);
  };
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleClick = (buttonName) => {
    console.log(`${buttonName} clicked!`);
  };

  return (
    <>
     <button className="elh-button" onClick={handleOpen}>
                        <img className = "sidebar-img" src="https://i.ibb.co/T1jV1gv/icon-setting-5.png" alt="Filter bars" style={{ width: '12px', height: 'auto', objectFit: 'cover' }} />
                        <div className="elh-button-text">Filter</div>
                    </button>
                    {isOpen && (
  <div className="list-filter-overlay">
    <div className="list-filter">
      {/******** TOP ROW ******** */}
      <button className="filter-back-button" onClick={handleClose}>
        <img
        style = {{ width: 'auto', height: '20px',}}
          className="filter-back-button"
          src="https://i.ibb.co/30J2Sb1/Icon.png"
          alt="Placeholder image"
        />
      </button>
      <h1 className="filter-title">Filters</h1>
      <h2 className="filter-mini-header">Rating</h2>
      {/******** RATING ******** */}
      <div className="filter-button-row">
        <button
          className={selectedButton === "any" ? "selected" : ""}
          onClick={() => handleButtonClick("any")}
        >
          Any
        </button>
        <button
          className={selectedButton === "1" ? "selected" : ""}
          onClick={() => handleButtonClick("1")}
        >
          1
        </button>
        <button
          className={selectedButton === "2" ? "selected" : ""}
          onClick={() => handleButtonClick("2")}
        >
          2
        </button>
        <button
          className={selectedButton === "3" ? "selected" : ""}
          onClick={() => handleButtonClick("3")}
        >
          3
        </button>
        <button
          className={selectedButton === "4" ? "selected" : ""}
          onClick={() => handleButtonClick("4")}
        >
          4
        </button>
        <button
          className={selectedButton === "5" ? "selected" : ""}
          onClick={() => handleButtonClick("5")}
        >
          5
        </button>
      </div>
      {/******** PRICE RANGE ******** */}
      <h2 className="filter-mini-header">Price Range</h2>
      <div className="filter-price-button-row">
        <button
          className={selectedButton2 === "$" ? "selected" : ""}
          onClick={() => handleButtonClickPrice("$")}
        >
          $
        </button>
        <button
          className={selectedButton2 === "$$" ? "selected" : ""}
          onClick={() => handleButtonClickPrice("$$")}
        >
          $$
        </button>
        <button
          className={selectedButton2 === "$$$" ? "selected" : ""}
          onClick={() => handleButtonClickPrice("$$$")}
        >
          $$$
        </button>
        <button
          className={selectedButton2 === "$$$$" ? "selected" : ""}
          onClick={() => handleButtonClickPrice("$$$$")}
        >
          $$$$
        </button>
      </div>
      {/******** ******** ******** */}
      {/******** RADIUS ******** */}
      <div className = "slider-bar-div">
      <h2 className="filter-mini-header">Radius</h2>
      <div className="slider-bar">
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
      <p className="slider-value">{sliderValue}mi</p>
      </div>
      {/******** CHECKBOX OPEN NOW ******** */}
      <div className = "open-now">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="checkbox-input"
        id="my-checkbox"
      />
      <label htmlFor="my-checkbox" className="checkbox-label">
        Open Now
      </label>
      </div>
      {/******** ******** ******** */}
      {/******** BOTTOM BUTTONS ******** */}
      <div className="filter-bottom-buttons">
        <div>
          <button
            className="primary-button"
            onClick={() => handleClick("Save")}
          >
            Clear All
          </button>
          <button
            className="secondary-button"
            /*onClick={() => handleClick("Cancel")}*/
            onClick={handleClose}
          >
            Show
          </button>
        </div>
      </div>
      <div className="list-filter-backdrop" onClick={handleClose}></div>
    </div>
    </div>
    )}
    </>
  );
}

export default ListFilter;
