import React, { useState } from 'react';

import { useNavigate} from "react-router-dom";
import '../css/MakeList.css';
import '../css/import.css';
import "../css/ListingPage.css";


function EditLocation({ handleClose2 })  {
    const [isOpen, setIsOpen] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [text, setText] = useState('');
  
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
                  <h3>Add to list</h3>
                </div>
                {tabIndex === 0 && (
                  <form onSubmit={handleSubmit}>
                  {/* The form content for the "Import" tab */}
                  {/* This is the same as the form content for the "From Scratch" tab */}
                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                      placeholder="Name of event"
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
                    <StarRating onRatingChange={handleRatingChange} />
                  </div>

                  <div className="form-group">
                    <AddTags/>
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

  

  function StarRating() {
    const [rating, setRating] = useState(0); // State for the rating
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

  function AddTags() {
    const [inputValue, setInputValue] = useState(''); // State for the input value
    const [tags, setTags] = useState([]); // State for the array of tags
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

 
  export default EditLocation;