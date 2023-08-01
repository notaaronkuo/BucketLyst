/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const mysql = require('mysql');


const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')


const con = mysql.createConnection({
  host     : "bucketlystdb.cnzomfczmn9g.us-west-1.rds.amazonaws.com",
  user     : "team1",
  password : "921382797",
  port     : 3306,
  multipleStatements: true
});






async function scrollPage(page, scrollContainer) {
  let lastHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);

  while (true) {
    await page.evaluate(`document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`);
    await page.waitForTimeout(2000);
    let newHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);
    if (newHeight === lastHeight) {
      break;
    }
    lastHeight = newHeight;
  }
}
/*
function getPlaceID(name, URL) {
  fetch(URL)
      .then(response => response.json())
      .then(data => {
        place_id = data.results.find(result => result.name === name).place_id;
      })
      .catch(error => console.error(error));
}*/
async function getListData(page) {
  const dataFromPage = await page.evaluate(() => {
      return {
        title: document.querySelector(".fontTitleLarge.IFMGgb")?.textContent.trim(),
        description: document.querySelector(".HlvSq")?.textContent.trim(),
      };
  });
  return dataFromPage;

}


async function fillDataFromPage(page) {
  const dataFromPage = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".WHf7fb")).map((el) => {
      const name = el.querySelector(".kiaEld")?.textContent.trim();
      const typeAndCity = el.querySelector(".zTNHUc")?.textContent;
      const separatedTypeAndCity = typeAndCity.split('·');
      const length = separatedTypeAndCity.length;
      const type = separatedTypeAndCity[length - 2];
      const address = separatedTypeAndCity[length - 1];
      const closed = el.querySelector('.zXFjbb')?.textContent.includes('Permanently');
      const modifiedAddress = address.replace('#', '');

      return {
        name: name,
        address: modifiedAddress,
        closed: closed,
        type: type,
      };

    });
  });
  return dataFromPage;
}
const chromium = require('chrome-aws-lambda');
const { addExtra } = require('puppeteer-extra')
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

async function getLocalPlacesInfo(URL) {
    const puppeteerExtra = addExtra(chromium.puppeteer);
    puppeteerExtra.use(StealthPlugin());

    let args = chromium.args;
    let viewport = chromium.defaultViewport;
    let exec_path = await chromium.executablePath;
    let headless = chromium.headless;

    if (process.env.AWS_EXECUTION_ENV === undefined) {
      exec_path = process.env.LOCAL_CHROMIUM;
    }
    

  const browser = await puppeteerExtra.launch({
    args: [...args, "--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: viewport,
    executablePath: exec_path,
    headless: headless,
  });

  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(100);
  console.log("timeout????");
  await page.goto(URL);

  await page.waitForNavigation();

  const scrollContainer = ".m6QErb.DxyBCb.kA9KIf.dS8AEf ";

  const localPlacesInfo = [];

  // while (true) {
  await page.setDefaultNavigationTimeout(2000);
  // const nextPageBtn = await page.$("#eY4Fjd:not([disabled])");
  // if (!nextPageBtn) break;
  /*
   await page.click('.WHf7fb');
   

   await new Promise(r => setTimeout(r, 10000));
   await page.goBack();
   await new Promise(r => setTimeout(r, 10000));
*/
  localPlacesInfo.push(await getListData(page));
  await scrollPage(page, scrollContainer);


  localPlacesInfo.push(...(await fillDataFromPage(page)));
  // await page.click("#eY4Fjd");
  // }

  await browser.close();

  return  localPlacesInfo;
}



const fetch = require('node-fetch');

//const url = 'https://goo.gl/maps/QNgX4dV7VHcs4VAZ7';
const apiKey = 'AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0';

async function localPlacesInfo(URL) {
  const localPlacesInfo = await getLocalPlacesInfo(URL);
  localPlacesInfo.then(console.log);
  
  const getPlaceId = async (name, city, type) => {
    const encodedName = encodeURIComponent(name);
    const encodedCity = encodeURIComponent(city);
    const encodedType = encodeURIComponent(type);
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodedName} ${encodedCity}&inputtype=textquery&fields=place_id&key=${apiKey}&type=${encodedType}`);
    const json = await response.json();
    const placeId = json.candidates[0].place_id;
    return placeId;
  };
  const data = [];
  let locationStr = '';
  data.push(localPlacesInfo[0]);
  for (let i = 1; i < localPlacesInfo.length; i++) {
    
      const name = localPlacesInfo[i].name;
      const address = localPlacesInfo[i].address;
      const type = localPlacesInfo[i].type;
      const place_id =  await getPlaceId(name, address, type);
      // Insert into db2.Location (name, list_fk, place_id)
      /*
      data.push({
        name: name,
        address: address,
        type: type,
        place_id: place_id
      });*/

      const str = " ( '" + name + "', @@@@ , " + place_id + ") ";
      if (i === 1) {
        locationStr = locationStr.concat(str);
      } else {
        locationStr = locationStr.concat(", ").concat(str);
      }
  }
  locationStr =  locationStr.concat(';');
  data.push({
    locations: locationStr
  });
  return data;
}



// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/scrape', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/scrape/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/scrape', function(req, res) {
  // Add your code here
  //puppeteer.use(StealthPlugin());
  const params = req.body;
  const URL = params['URL'];
  const is_public = params['is_public'];
  const userID = params['userID'];
  (async () => {
    const listData = await localPlacesInfo(URL);

    console.log(listData);

    const title = listData[0].title;
    const description = listData[0].description;
    const str = listData[1].locations;

  
  //1. create a new list
  con.connect( function(err) {
    if (err) throw err;
    con.query("INSERT INTO db2.Lists (title, description, is_public, tags, owner_fk)" + 
    " VALUES ('"+title+"', '"+description+"', '"+ is_public + "', " + userID+ "); SELECT LAST_INSERT_ID();",
    function(err, result, fields){
      if (err) {
        console.log("error in /scrape POST first query");
        throw err;
      }
      const list_id = result;
      const modifiedStr = str.replace('@@@@', list_id);

      con.query("INSERT INTO db2.Locations (name, list_fk, place_id) VALUES "  + modifiedStr), 
      function(err, result, fields){
        if (err) {
          console.log("error in /scrape POST first query");
          throw err;
        }

    
      res.json({success: 'import post call succeed!', url: req.url, str: modifiedStr});
      con.end();
      }
    });


  res.json({success: 'post call succeed!', url: req.url, body: req.body})
  });
});
});

app.post('/scrape/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/scrape', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/scrape/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/scrape', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/scrape/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
