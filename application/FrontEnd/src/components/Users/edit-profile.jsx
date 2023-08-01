import React, { useState, useEffect } from 'react';

import { useNavigate} from "react-router-dom";
import '../css/MakeList.css';
import '../css/import.css';

import imageCompression from 'browser-image-compression';
import AWS from 'aws-sdk';
import { API } from "aws-amplify"
const myAPI = "imagestos3";

AWS.config.update({
  accessKeyId: 'AKIAUXUORQAB7LG7C5QU',
  secretAccessKey: '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',
  region: 'us-east-1',
  signatureVersion: 'v4',
});

function ImageTest({setImageUrl, imageUrl}) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  
  const s3 = new AWS.S3();
  
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
      setFile(e.target.files[0]);
  }
  const uploadToS3 = async(event) => {
    event.preventDefault();
      if (!file) {
          return;
      }
      const imageFile = file;

      const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920
      }
      try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log(compressedFile.size/1024/1024);
          setFile(compressedFile)
      } catch (error) {
          console.log(error);
      }

      const params = {
          Bucket: 'csc648-848-bucketlyst',
          Key: `${Date.now()}.${file.name}`,
          Body: file
      };
      const { Location } = await s3.upload(params).promise();
      setImageUrl(Location);
      console.log('uploading to s3', Location);
      setIsButtonClicked(true);
  }
  const myOldPhoto = window.sessionStorage.getItem('photo');

  return (
      <div className = "pfp-uploader">
         {!file && ( <><img classname = "edit-profile-pic" 
                        src={myOldPhoto}
                        alt="profile pic" 
                        border="0"
                        style={{
                            width: "50%",
                            height: "auto",
                            cursor: "pointer",
                            overflow: "hidden",
                            border: "none",
                            borderRadius: "200px"
                          }}></img>
                          <label className="add-profile-pic-button">
                          <input
                            type="file"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                          />
                          <img
                            className="edit-profile=button-img"
                            src="https://i.ibb.co/SnbgGqD/plus.png"
                            alt="Home Icon"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </label></>
                          )}

          {/*<input type="file" onChange={handleFileSelect} />*/}
          {imageUrl && (
             
                <img classname = "edit-profile-pic" 
                        src={imageUrl} 
                        alt="uploaded"
                        border="0"
                        style={{
                            width: "50%",
                            height: "auto",
                            cursor: "pointer",
                            overflow: "hidden",
                            border: "none",
                            borderRadius: "200px"
                          }}></img>
                  
          )}
          {(file && !imageUrl) && (
            <img classname = "edit-profile-pic" 
            src={myOldPhoto} 
            alt="notUploaded"
            border="0"
            style={{
                width: "50%",
                height: "auto",
                cursor: "pointer",
                overflow: "hidden",
                border: "none",
                borderRadius: "200px"
              }}></img>
          ) }
          {file && (<>
   
                  <button className={`mk-upload ${isButtonClicked ? 'clickedupload' : ''}`} onClick={uploadToS3}>Upload</button>
          </>
          )}
      </div>
  );
}

function EditProfileWindow({ handleClose3 })  {
  
    const [isOpen, setIsOpen] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [title, setTitle] = useState(window.sessionStorage.getItem('username'));
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

  const toggleVisibility = () => {
    console.log("toggle called")
    setIsVisible(false);
  };
  
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

    const usernameLen = window.sessionStorage.getItem('username');
const len = usernameLen ? usernameLen.length : 0;

    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

  const maxChars = 12;
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

    function handleRefresh() {
      window.location.reload();
    }

  const handleEditProfileClick = async (event) => {
    event.preventDefault();
    const myOldPhoto = window.sessionStorage.getItem('photo');
  
    const myUserId = window.sessionStorage.getItem('userid');
    const apiUrl = `https://852piontsi.execute-api.us-east-1.amazonaws.com/dev/userProfile?userid=${myUserId}`;
  
    const finalImageUrl = imageUrl ? imageUrl : myOldPhoto;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: sessionStorage.getItem('userid'),
          name: title,
          description: description,
          photo: finalImageUrl,
        }),
      });
  
      if (response.ok) {
        // Handle the successful response
        // You can parse the response JSON:
        const data = await response.json();
        console.log(data);
        window.sessionStorage.setItem('username', data[0].name);
        window.sessionStorage.setItem('photo', data[0].photo);
        handleRefresh();
      } else {
        // Handle the error response
        console.log('POST Error:', response.status);
      }
    } catch (error) {
      // Handle any network or other errors
      console.log('POST Network Error:', error);
    }
  };

  
    return (
        <>
          {/*<button className="h-button" onClick={handleOpen}>
            Create a new list
          </button>*/}
          {isOpen && (
            <div className="floating-window-overlay" >
              {isVisible && (
              <div className="floating-window-editprofile">
                <div className="floating-window-header">
                  <button button style={{ width: '10%', height: 'auto', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white', opacity: '0.5', alignSelf: 'top'}}onClick={handleClose3}>
                  <img src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="Back Icon" style={{ width: '50%', height: 'auto', objectFit: 'cover'}}></img>
                  
                  </button>
                  <h3>Edit Profile</h3>
                </div>

                  <form>
                  
                  <div className="form-group-formpfp">
                    <label htmlFor="pfp-upload">Change Profile Picture:</label>

                    <ImageTest setImageUrl={setImageUrl} imageUrl={imageUrl}/>
                    
                  </div>

                  <div className="form-group">
                    <label htmlFor="title">Username:</label>
                    <input
                      placeholder="Update Username here"
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => handleInputChange(e)}
                      maxLength={12}
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
                      placeholder="Update Description here"
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
                  <div className="form-actions">
                    <button className="mk-back" onClick={handleClose3}>
                      Cancel
                    </button>
 
                    <button onClick={handleEditProfileClick} className="mk-create">Update Profile</button>
                  
                  </div>
                </form>
                
              </div>)}

              
              <div className="floating-window-backdrop" onClick={handleClose3}></div>
            </div>
          )}
        </>
      );
  }

  export default EditProfileWindow;