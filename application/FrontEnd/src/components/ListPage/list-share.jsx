import React, { useState } from "react";

import { Link } from "react-router-dom";
import "../css/Settings.css";

//For Rabin's part
//I highly recommend using the Flex property, flex within flex is a good tool
//helpful guide for Flex: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

function ListShare() {
  return (
    <div className="share-page">
      <div className="share-dimmed-background">
        <div className="share-card">
          <div className="share-header">
            <h2 className="share-share">Share</h2>
            <img
              className="share-image"
              src="https://i.ibb.co/FYnRj99/Screenshot-2023-05-01-at-21-04-4.png"
              alt="Share"
              width="154"
              height="119"
            />
            <div className="share-info">
              <p className="share-number-places">39 places</p>
              <label className="share-toggle-switch">
                <p className="share-private-public">Private</p>
                <input type="checkbox" />
                <span className="share-slider"></span>
              </label>
            </div>
          </div>
          <div className="share-divider"></div>
          <div className="share-pictures">
            <div className="share-picture">
              <img src="https://i.ibb.co/TRQQKBs/Image.png" alt="Picture 1" />
              <p>Demi Wilkinson</p>
            </div>
            <div className="share-picture">
              <img src="https://i.ibb.co/SK3Gd2k/Image.png" alt="Picture 2" />
              <p>Phoenix Baker</p>
            </div>
            <div className="share-picture">
              <img src="https://i.ibb.co/V9mcdFs/Image.png" alt="Picture 3" />
              <p>Lana Steiner</p>
            </div>
            <div className="share-picture">
              <img src="https://i.ibb.co/d0bqmYf/Image.png" alt="Picture 4" />
              <p>Olivia Rhye</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListShare;
