/**
 * This file defines a functional component called LocationList
 *  that retrieves a list of locations from the server
 *  using the LocationService module and 
 * displays them in an unordered list.

The useState hook is used to create a locations state variable and 
a setLocations function to update the state. The initial state is an empty array.
The useEffect hook is used to fetch the locations from the server 
when the component mounts. The fetchLocations function is defined as
 an async function that uses the LocationService module to retrieve
  the locations and update the state.
The locations state variable is used to render the list of locations. 
The map method is used to iterate over the locations array and create a 
list item for each location, with a link to the location's details page.
The LocationList component is exported as the default export.

 * 
 */
/*
import React, { useEffect, useState } from 'react';
import LocationService from './LocationService';

function LocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      const locationService = new LocationService();
      const locations = await locationService.getLocations();
      setLocations(locations);
    }

    fetchLocations();
  }, []);

  async function handleDelete(id) {
    const locationService = new LocationService();
    await locationService.deleteLocation(id);
    setLocations(locations.filter((location) => location.id !== id));
  }

  return (
    <div>
      <h2>My Locations</h2>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <div>
              <strong>{location.name}</strong> ({location.rating})
              <br />
              {location.address}
            </div>
            <div>
              <button onClick={() => handleDelete(location.id)}>Delete</button>
              <button>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;
*/
/*
import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

const LocationList = ({ locations, onLocationClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search locations"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {filteredLocations.map((location) => (
          <div key={location.id} className="col">
            <Card
              className="h-100"
              onClick={() => onLocationClick(location)}
            >
              <Card.Body>
                <Card.Title>{location.name}</Card.Title>
                <Card.Text>{location.address}</Card.Text>
                <Card.Text>{`Rating: ${location.rating}`}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;

 */
import React from "react";

function LocationList({ locations }) {
  function getLocationName(location) {
    if (!location) return "";
    return location.name.toLowerCase();
  }

  return (
    <ul>
      {Array.isArray(locations) ? (
        locations.map((location) => (
          <li key={location.id}>{getLocationName(location)}</li>
        ))
      ) : (
        <li>No locations available</li>
      )}
    </ul>
  );
}

export default LocationList;