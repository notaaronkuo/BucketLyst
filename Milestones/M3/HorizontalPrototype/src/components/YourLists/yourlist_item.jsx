import React, { useState } from "react";

import { Link } from 'react-router-dom';

function yourlist_item() {
  return (
    <div class="your-list-feed">
        <Link to="/ownlist">Own List Page</Link>
        <Link to="/editlist"><button className="edit-button">Edit List Page</button></Link>
    </div>

  )

}

export default yourlist_item;