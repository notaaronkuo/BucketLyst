import React, { useState, useEffect } from 'react';

import { useNavigate} from "react-router-dom";
import '../css/MakeList.css';
import '../css/import.css';
import { API } from 'aws-amplify';


function MakeListWindow3({ handleClose2, listID, latitude, longitude, titlel, placeID })  {
    const [isOpen, setIsOpen] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [title, setTitle] = useState(titlel);
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [text, setText] = useState('');
    const [submittedRating, setSubmittedRating] = useState(0); // State for the submitted rating
    const [submitTags, setSubmitTags] = useState([]); // State for the tags
    const [submitTagString, setSubmitTagString] = useState(''); 

  const handleTagsChange = (tags) => {
    setSubmitTags(tags);
  };
  const handleRatingChange = (rating) => {
    // Update the submitted rating when the rating changes
    setSubmittedRating(rating);
  };
  
  const convertArrayToString = (arr) => {
    return arr.join(', ');
  };

  useEffect(() => {
    const stringifiedArray = convertArrayToString(submitTags);
    setSubmitTagString(stringifiedArray);
  }, [submitTags]);

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

    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

  const maxChars = 40;
  const maxChars2 = 100;

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
    
  

    const navigate = useNavigate();

  function handleClick3() {
    navigate("/implementlater");

  }/*
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submitted rating value
   /* console.log('Submitted Rating:', submittedRating);
    console.log('Submitted tags:', submitTags);
    console.log('Submitted title:', title);
    console.log('Submitted description:', description);
    console.log('Submitted longitude:', longitude);
    console.log('Submitted latitude:', latitude);
    console.log('Submitted list_fk:', listID);
    console.log('Submitted placeID:', placeID);*/
    // Reset the form or perform any other actions
    //handleClose2();
 // };*/
 async function handleSubmit(event) {
  event.preventDefault();
  handleClose2();
  console.log('Submitted tag string:', submitTagString);

  try {
    const response = await fetch('https://lc898rllgd.execute-api.us-east-1.amazonaws.com/dev/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location_name: title,
        location_description: description, 
        list_fk: listID,
        tags: submitTagString,
        place_id: placeID,
        rating: submittedRating,
        latitude: latitude,
        longitude: longitude,
      }),
    });

    if (response.ok) {
      // Handle the successful response here
      const data = await response.json();
      console.log('POST request successful:', data);
      // Additional processing or actions
    } else {
      // Handle the error here
      throw new Error('POST request failed');
    }
  } catch (error) {
    // Handle the error here
    console.log('POST request error:', error);
    // Additional error handling or actions
  }

  
}



  /*{
        "location_name": "SFSU",
        "location_description": "testing again",
        "latitude": 99,
        "longitude": 99,
        "list_fk": 3,
        "tags": "badd",
        "place_id": "test",
        "rating": 2
    }*/
  
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
                  <h3>Add to List</h3>
                  
                </div>
                {tabIndex === 0 && (
                  <form onSubmit={handleSubmit}>
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
                      maxLength={40}
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
                      maxLength2={100}
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
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      Public{' '}
                      <input
                        type="checkbox"
                        name="public"
                        checked={isPublic}
                        onChange={handlePublicChange}
                        style={{ marginLeft: '10px' }}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <StarRating rating={submittedRating} onRatingChange={handleRatingChange} />
                  </div>

                  <div className="form-group">
                  <AddTags tags={submitTags} onTagsChange={handleTagsChange} />
                  </div>

                  <div className="form-actions">
                    <button className="mk-back" onClick={handleClose2}>
                      Cancel
                    </button>
 
                    <button onClick={handleSubmit} className="mk-create">Add to List</button>
                  
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

  

  function StarRating({rating, onRatingChange}) {
    //const [rating, setRating] = useState(0); // State for the rating
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
      onRatingChange(selectedRating);
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

  function AddTags({ tags, onTagsChange }) {
    const [inputValue, setInputValue] = useState(''); // State for the input value
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
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
  
      const updatedTags = [...tags, inputValue];
      onTagsChange(updatedTags);
      setInputValue('');
    };
  
    const removeTag = (index) => {
      const updatedTags = [...tags];
      updatedTags.splice(index, 1);
      onTagsChange(updatedTags);
    };
  
    return (
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
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

 
  export default MakeListWindow3;