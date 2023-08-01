import React, { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("lists");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    let endpoint = "";
    if (searchType === "users") {
      endpoint = `/search/user?q=${searchTerm}`;
    } else {
      endpoint = `/search/lists?q=${searchTerm}`;
    }
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      if (searchType === "users") {
        setSearchResults(
          result.map((item) => ({
            user_id: item.user_id,
            username: item.username,
            email: item.email,
            password: item.password,
            is_public: item.isPublic,
          }))
        );
      } else {
        setSearchResults(
          result.map((item) => ({
            list_id: item.list_id,
            name: item.name,
            description: item.description,
            is_public: item.is_public,
            creation_date: item.creation_date,
            tags: item.tags,
            owner_fk: item.owner_fk,
            photo: item.photo,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search"
      />
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="lists">Lists</option>
        <option value="users">Users</option>
      </select>
      <button onClick={handleSearch}>Search</button>
      {searchResults.map((result) => (
        <div key={result.list_id || result.user_id}>
          {result.name || result.username}
        </div>
      ))}
    </div>
  );
}

export default SearchBar;