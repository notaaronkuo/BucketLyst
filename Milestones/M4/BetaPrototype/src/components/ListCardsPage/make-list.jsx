import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "../css/MakeList.css";
import "../css/import.css";
import ImportSuccess from "./import-messages";
import { ImportFail, ListSuccess, ListFail } from "./import-messages";
import { API } from 'aws-amplify';

function MakeListWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [text, setText] = useState("");
  const [importVisible, setImportVisible] = useState(false);
  const [listConfirmVisible, setListConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    console.log("toggle called");
    setIsVisible(false);
  };

  const handleImport = (event) => {
    console.log("handle import called");
    setImportVisible(true);
    console.log("import status: " + importVisible);
    event.preventDefault();
  };
  const handleListConfirm = (event) => {
    console.log("list confirm called");
    setListConfirm(true);
    event.preventDefault();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
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

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  const maxChars = 50;
  const maxChars2 = 200;

  const handleInputChange = (event) => {
    setText(event.target.value);
    handleCharChange(event);
    handleTitleChange(event);
  };

  const handleInputChange2 = (event) => {
    setText(event.target.value);
    handleCharChange2(event);
    handleDescriptionChange(event);
  };

  const charCount = `${value.length}/${maxChars}`;
  const charCount2 = `${value2.length}/${maxChars2}`;

  const handleCharChange = (event) => {
    const newValue = event.target.value;
    if (newValue.length <= maxChars) {
      setValue(newValue);
    }
  };

  const handleCharChange2 = (event) => {
    const newValue2 = event.target.value;
    if (newValue2.length <= maxChars2) {
      setValue2(newValue2);
    }
  };

  const navigate = useNavigate();

  function handleClick3(event) {
    navigate("/implementlater");
  }

  const handleImportClick = (event) => {
    event.preventDefault();
    // Call the first const function
    toggleVisibility();
    console.log("handleimport called");
    handleImport();

    // Call the second const function
  };
/*
  const handleMakeListClick = (event) => {
    event.preventDefault();
    // Call the first const function
    toggleVisibility();
    console.log("handleMakeListClick called");
    handleListConfirm();

    // Call the second const function
  };*/
  function handleMakeListClick(event) {
    console.log('scratch pressed');
    console.log(localStorage.getItem('userID'));
    toggleVisibility();
    handleListConfirm();
    return API.post('makelist', '/makelist', {
      body : {
        title: title,
        description: description,
        privacy: isPublic,
        userID: localStorage.getItem('userID')
      }
   })
  }

  return (
    <>
      <button className="h-button" onClick={handleOpen}>
        Create a new list
      </button>
      {isOpen && (
        <div className="floating-window-overlay">
          {isVisible && (
            <div className="floating-window">
              <div className="floating-window-header">
                <button
                  button
                  style={{
                    width: "20%",
                    height: "auto",
                    cursor: "pointer",
                    overflow: "hidden",
                    border: "none",
                    backgroundColor: "white",
                    opacity: "0.5",
                    alignSelf: "top",
                  }}
                  onClick={handleClose}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/130/130882.png"
                    alt="Back Icon"
                    style={{ width: "50%", height: "auto", objectFit: "cover" }}
                  ></img>
                </button>
                <h4>
                  {tabIndex === 0 ? "Create a new list" : "Import from Google"}
                </h4>
              </div>
              <div className="floating-window-tabs">
                <button
                  className={tabIndex === 0 ? "active" : ""}
                  onClick={() => handleTabClick(0)}
                >
                  From Scratch
                </button>
                <button
                  className={tabIndex === 1 ? "active" : ""}
                  onClick={() => handleTabClick(1)}
                >
                  Import
                </button>
              </div>
              {tabIndex === 0 && (
                <form>
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
                      className="home-list-input"
                    />
                    <div
                      className="count-char"
                      style={{
                        fontSize: "14px",
                        marginRight: "auto",
                        color: value.length > maxChars ? "red" : "black",
                        float: "right",
                        textAlign: "right",
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
                      placeholder="Details about event"
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => handleInputChange2(e)}
                      maxLength2={200}
                    ></textarea>
                    <div
                      className="count-char2"
                      style={{
                        fontSize: "14px",
                        float: "right",
                        textAlign: "right",
                        color: value.length > maxChars2 ? "red" : "black",
                      }}
                    >
                      {charCount2}
                    </div>
                  </div>
                  <div className="form-group">
                    <label style={{ display: "flex", alignItems: "center" }}>
                      Public{" "}
                      <input
                        type="checkbox"
                        name="public"
                        checked={isPublic}
                        onChange={handlePublicChange}
                        style={{ marginLeft: "10px" }}
                      />
                    </label>
                  </div>
                  <div className="form-actions">
                    <button className="mk-back" onClick={handleClose}>
                      Cancel
                    </button>

                    <button onClick={handleMakeListClick} className="mk-create">
                      Create
                    </button>
                  </div>
                </form>
              )}
              {tabIndex === 1 && (
                <form>
                  {/* The form content for the "Import" tab */}
                  {/* This is the same as the form content for the "From Scratch" tab */}
                  <div className="form-group">
                    <label htmlFor="title">Google Map Link:</label>
                    <input
                      placeholder="URL"
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => handleInputChange(e)}
                      maxLength={50}
                      className="home-list-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" placeholder="Name of event">
                      Description:
                    </label>
                    <textarea
                      placeholder="Details about the list"
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => handleInputChange2(e)}
                      maxLength2={200}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label style={{ display: "flex", alignItems: "center" }}>
                      Public{" "}
                      <input
                        type="checkbox"
                        name="public"
                        checked={isPublic}
                        onChange={handlePublicChange}
                        style={{ marginLeft: "10px" }}
                      />
                    </label>
                  </div>
                  <div className="form-actions">
                    <button className="mk-back" onClick={handleClose}>
                      Cancel
                    </button>
                    <button onClick={handleImportClick} className="mk-create">
                      Import
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          {importVisible && <Import />}
          {listConfirmVisible && <CheckListCreation />}
          {}
          <div className="floating-window-backdrop" onClick={handleClose}></div>
        </div>
      )}
    </>
  );
}

const Import = () => {
  const [isImport, setImport] = useState(false); // Track login state
  useEffect(() => {
    //For frontend testing purposes, this is set to true,
    //backend can later implement the changing of this usestate
    //assessImport();
    setImport(false);
  }, []);
  /*
    const assessLoggedInState = () => {
      checkImport()
          .then(imported => {
              console.log('succesful import');
              isImport(true);
          })
          .catch(() => {
              console.log('unsuccessful import');
              setImport(false);
          });
  };*/
  return <div>{isImport ? <ImportSuccess /> : <ImportFail />}</div>;
};

const CheckListCreation = () => {
  const [isListMade, setListMade] = useState(true); // Track login state
  useEffect(() => {
    //For frontend testing purposes, this is set to false,
    //backend can later implement the changing of this usestate
    //assessImport();
    setListMade(false);
  }, []);
  return <div>{isListMade ? <ListSuccess /> : <ListFail />}</div>;
};

export default MakeListWindow;
