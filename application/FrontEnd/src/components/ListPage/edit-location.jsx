import React, { useState } from 'react';

import { useNavigate} from "react-router-dom";
import '../css/MakeList.css';
import '../css/import.css';
import "../css/ListingPage.css";


function EditLocation({ handleClose2, locationdata })  {
    const [isOpen, setIsOpen] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [title, setTitle] = useState(locationdata.name);
    const [description, setDescription] = useState(locationdata.description);
    const [isPublic, setIsPublic] = useState(false);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(locationdata.rating); // State for the rating
    
    const handleOpen = () => {
      setIsOpen(true);
    };
  
    const handleTabClick = (index) => {
      setTabIndex(index);
    };
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handlePublicChange = (event) => {
      setIsPublic(event.target.checked);
    };

    const characterCount1 = locationdata.name;
    const characterCount2 = locationdata.description;
    const [value, setValue] = useState(characterCount1);
    const [value2, setValue2] = useState(characterCount2);

  const maxChars = 50;
  const maxChars2 = 200;

  const handleInputChange = (event) => {
    setText(event.target.value);
    handleCharChange(event);
    handleTitleChange(event);
  }

  const handleInputChange2 = (event) => {
    setText(event.target.value);
    handleCharChange2(event);
    handleDescriptionChange(event);
  }

  const charCount = `${value.length}/${maxChars}`;
  const charCount2 = `${value2.length}/${maxChars2}`;


  const handleCharChange = (event) => {
    const newValue = event.target.value;
    if (newValue.length <= maxChars) {
      setValue(newValue);
    }
}

    const handleCharChange2 = (event) => {
        const newValue2 = event.target.value;
        if (newValue2.length <= maxChars2) {
          setValue2(newValue2);
        }
    }
    const [submittedRating, setSubmittedRating] = useState(0); // State for the submitted rating

  const handleRatingChange = (rating) => {
    // Update the submitted rating when the rating changes
    setSubmittedRating(rating);
  };

  const [tags, setTags] = useState(locationdata.tags); // State for the array of tags
  
  const [inputValue, setInputValue] = useState(''); // State for the input value
    
  const handleTagChange = (event) => {
    setInputValue(event.target.value);
  };
  
  

    const navigate = useNavigate();

  function handleClick3() {
    navigate("/implementlater");

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submitted rating value
    console.log('Submitted Rating:', submittedRating);
    // Reset the form or perform any other actions
    setSubmittedRating(0);
    handleClose2();
  };
  

  
    return (
        <>
          {/*<button className="h-button" onClick={handleOpen}>
            Create a new list
          </button>*/}
          {isOpen && (
            <div className="floating-window-overlay" >
              <div className="floating-window-add">
                <div className="floating-window-header">
                  <button button style={{ width: '10%', height: 'auto', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white', opacity: '0.5', alignSelf: 'top'}}onClick={handleClose2}>
                  <img src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="Back Icon" style={{ width: '50%', height: 'auto', objectFit: 'cover'}}></img>
                  
                  </button>
                  <h3>Edit Location</h3>
                </div>
                {tabIndex === 0 && (
                  <form onSubmit={handleSubmit} >
                  {/* The form content for the "Import" tab */}
                  {/* This is the same as the form content for the "From Scratch" tab */}
                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                      placeholder="Name of Location"
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => handleInputChange(e)}
                      maxLength={50}
                    />
                    <div
                      className="count-char"
                      style={{
                        fontSize: '14px',
                        marginRight: 'auto',
                        color: value.length > maxChars ? 'red' : 'black',
                        float: 'right',
                        textAlign: 'right',
                      }}
                    >
                      {charCount}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" placeholder="Name of event">
                      Description:
                    </label>
                    <textarea
                    style={{font: 'inherit'}}
                      placeholder="Details about the list"
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => handleInputChange2(e)}
                      maxLength2={200}
                    ></textarea>
                    <div
                      className="count-char2"
                      style={{
                        fontSize: '14px',
                        float: 'right',
                        textAlign: 'right',
                        color: value.length > maxChars2 ? 'red' : 'black',
                      }}
                    >
                      {charCount2}
                    </div>
                  </div>

                  <div className="form-group">
                    <StarRating onRatingChange={handleRatingChange} setRating = {setRating} rating = {rating}/>
                  </div>

                  <div className="form-group">
                    <AddTags handleTagChange = {handleTagChange} tags = {tags} setTags = {setTags} inputValue = {inputValue} setInputValue = {setInputValue}/>
                  </div>

                  <div className="form-actions">
                    <button className="mk-back" onClick={handleClose2}>
                      Cancel
                    </button>
 
                    <button onClick={handleSubmit} className="mk-create">Update Location</button>
                  
                  </div>
                </form>
                )}
              </div>
              <div className="floating-window-backdrop" onClick={handleClose2}></div>
            </div>
          )}
        </>
      );
  }

  

  function StarRating({ setRating, rating }){
    
    const [hoveredRating, setHoveredRating] = useState(0); // State for the hovered rating
    const [selectedRating, setSelectedRating] = useState(0); // State for the selected rating
  
    // Function to handle mouse enter event on a star
    const handleStarHover = (selectedRating) => {
      setHoveredRating(selectedRating);
    };
  
    // Function to handle mouse leave event on the star container
    const handleStarContainerLeave = () => {
      setHoveredRating(0);
    };
  
    // Function to handle click event on a star
    const handleStarClick = (selectedRating) => {
      setRating(selectedRating);
      setSelectedRating(selectedRating);
    };
    
  
    return (
      <div className="star-rating" onMouseLeave={handleStarContainerLeave}>
        {[1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            className={`star ${index <= (hoveredRating || rating) ? 'filled' : ''}`}
            onMouseEnter={() => handleStarHover(index)}
            onClick={() => handleStarClick(index)}
          >
            &#9733;
          </span>
        ))}
        {/*<p>Selected Rating: {selectedRating}</p>*/}
      </div>
    );
  }

  function AddTags({ handleTagChange, tags, setTags, inputValue, setInputValue}) {

    const [errorMessage, setErrorMessage] = useState(''); // State for error message
  

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addTag();
      }
    };
  
    const addTag = () => {
      if (inputValue.trim() === '') {
        return; // Ignore empty input
      }
  
      if (tags.length >= 5) {
        setErrorMessage('Max tags reached!');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        return;
      }
  
      setTags([...tags, inputValue]);
      setInputValue('');
    };
  
    const removeTag = (index) => {
      const updatedTags = [...tags];
      updatedTags.splice(index, 1);
      setTags(updatedTags);
    };
  
    return (
      <div>

          <input
            type="text"
            value={inputValue}
            onChange={handleTagChange}
            onKeyPress={handleKeyPress}
            maxLength={20}
            placeholder="Enter a tag (max 20 characters)"
          />

        {errorMessage && <p>{errorMessage}</p>}
        <div className="tag-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag">
              <span>{tag}</span>
              <button onClick={() => removeTag(index)}>x</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

 
  export default EditLocation;