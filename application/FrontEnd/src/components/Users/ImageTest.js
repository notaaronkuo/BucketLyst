 
 /*import React from "react";
 import { API } from "aws-amplify";
 import axios from 'axios';
 import { Link } from 'react-router-dom';
 import SearchBar from "./searchbar";
 const myAPI = "imagestos3";

 function ImageTest() {
     const [file, setFile] = React.useState()
     const [description, setDescription] = React.useState("")

     function submit() {
         console.log("HELLO")
         API.get(myAPI,"/image/upload")
             .then(res => {
                 console.log(res)
             }).catch(err => {
             console.log(err);
         });
         console.log("success")
     }

     function fileSelected(event) {
         event.preventDefault();
         const file = event.target.files[0]
         setFile(file)
     }



 return (
         <main>

             <div className="App">
                 <form onSubmit={submit}>
                     <input onChange={e => setFile(e.target.files[0])} type="file" accept="image/*"/>
                     <input value={description} onChange={e => setDescription(e.target.value)} type="text"/>
                     <button type="submit">Submit</button>
                 </form>
             </div>
         </main>
     )
 }
 export default ImageTest;

import imageCompression from 'browser-image-compression';
import AWS from 'aws-sdk';
import { useState } from 'react';
AWS.config.update({
    accessKeyId: 'AKIAUXUORQAB7LG7C5QU',
    secretAccessKey: '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',
    region: 'us-east-1',
    signatureVersion: 'v4',
});

export default function ImageTest() {
    const s3 = new AWS.S3();
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    }
    const uploadToS3 = async () => {
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
    }
    return (
        <div style={{ marginTop: '150px' }}>
            <h1>Test Image Upload</h1>
            <input type="file" onChange={handleFileSelect} />
            {file && (
                <div style={{ marginTop: '10px' }}>
                    <button onClick={uploadToS3}>Upload</button>
                </div>
            )}
            {imageUrl && (
                <div style={{ marginTop: '10px' }}>
                    <img src={imageUrl} alt="uploaded" />
                </div>
            )}
        </div>
    );
}
*/