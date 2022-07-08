// import { useState, useEffect } from 'react';
// import './App.css';

// import countries from 'i18n-iso-countries';

// countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

// function App() {
//   // State
//   const [apiData, setApiData] = useState({});
//   const [getState, setGetState] = useState('tamilnadu');
//   const [state, setState] = useState('tamilnadu');

//   // API KEY AND URL
//   const apiKey = process.env.REACT_APP_API_KEY;
//   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

//   // Side effect
//   useEffect(() => {
//     fetch(apiUrl)
//       .then((res) => res.json())
//       .then((data) => setApiData(data));
//   }, [apiUrl]);

//   const inputHandler = (event) => {
//     setGetState(event.target.value);
//   };

//   const submitHandler = () => {
//     setState(getState);
//   };

//   const kelvinToFarenheit = (k) => {
//     return (k - 273.15).toFixed(2);
//   };

//   return (
//     <div className="App" style={{marginLeft:"600px"}}>
//       <header className="d-flex justify-content-center align-items-center">
//         <h2>React Weather App</h2>
//       </header>
//       <div className="container" >
//         <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
//           <div class="col-auto">
//             <label for="location-name" class="col-form-label" id="text">
//               Enter Location :
//             </label>
//           </div>
//           <div class="col-auto">
//             <input
//               type="text"
//               id="location-name"
//               class="form-control"
//               onChange={inputHandler}
//               value={getState}
//             />
//           </div>
//           <button className="btn btn-primary mt-2" onClick={submitHandler} id="button2">
//             Search
//           </button>
//         </div>

//         <div className="card mt-3 mx-auto" style={{ width: '60vw' }}>
//           {apiData.main ? (
//             <div class="card-body text-center">
//               <img
//                 src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
//                 alt="weather status icon"
//                 className="weather-icon"
//               />

//               <p className="h2">
//                 {kelvinToFarenheit(apiData.main.temp)}&deg; C
//               </p>

//               <p className="h5">
//                 <i className="fas fa-map-marker-alt"></i>{' '}
//                 <strong>{apiData.name}</strong>
//               </p>

//               <div className="row mt-4">
//                 <div className="col-md-6">
//                   <p>
//                     <i class="fas fa-temperature-low "></i>{' '}
//                     <strong>
//                       {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
//                     </strong>
//                   </p>
//                   <p>
//                     <i className="fas fa-temperature-high"></i>{' '}
//                     <strong>
//                       {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
//                     </strong>
//                   </p>
//                 </div>
//                 <div className="col-md-6">
//                   <p>
//                     {' '}
//                     <strong>{apiData.weather[0].main}</strong>
//                   </p>
//                   <p>
//                     <strong>
//                       {' '}
//                       {countries.getName(apiData.sys.country, 'en', {
//                         select: 'official',
//                       })}
//                     </strong>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <h1>Loading</h1>
//           )}
//         </div>
//       </div>
     
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import Header from "./Header";
import LocationInfo from "./LocationInfo";
import SwitchButton from "./SwitchButton";

function App() {
  const [location, setLocation] = useState({});
  const [degreeFormat, setDegreeFormat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceLocation, setDeviceLocation] = useState([]);
  const [errorLoading, setErrorLoading] = useState(false);
  const [hour, setHour] = useState("");
 
  const api = (v) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${v}&appid=e6dd013832438287848010ce0261a371&units=metric`;
  const myInit = { mode: "cors" };
  const myRequest = (v) => new Request(api(v), myInit);

  const toggleFormat = () => setDegreeFormat(!degreeFormat);

  // clock on bottom of app
  setInterval(() => {
    var date = new Date();
    setHour(
      date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, 1000);

  // gets location from device
  function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const ps = [
        Math.round(position.coords.latitude),
        Math.round(position.coords.longitude),
      ];
      setDeviceLocation(ps);
    });
  }

  useEffect(() => {
    if (deviceLocation.length !== 0) {
      fetchResults();
    }
  }, [deviceLocation]);

  // gets location data for device
  async function fetchResults() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${deviceLocation[0]}&lon=${deviceLocation[1]}&appid=3069ae2718e40f8dc1998b7250e16f10&units=metric`,
        myInit
      );
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setLocation(data);
      setErrorLoading(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setErrorLoading(true);
      console.error(e);
    }
  }

  // gets location from input
  async function getLocation(e) {
    setIsLoading(true);
    try {
      const response = await fetch(myRequest(e.target.value));
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setLocation(data);
      e.target.value = "";
      setIsLoading(false);
      setErrorLoading(false);
    } catch (e) {
      setErrorLoading(true);
      setIsLoading(false);
      console.error(e);
    }
  }

  // initial location
  async function getInitialLocation() {
    setIsLoading(true);
    try {
      const response = await fetch(api("Tenkasi"), myInit);
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setErrorLoading(false);
      setLocation(data);
      setIsLoading(false);
    } catch (e) {
      setErrorLoading(true);
      setIsLoading(false);
      console.error(e);
    }
  }

  useEffect(() => {
    getInitialLocation();
  }, []);

  return (
    <div id="contain">
      <div className="App">
        <Header
          errorLoading={errorLoading}
          getUserLocation={getUserLocation}
          getLocation={getLocation}
        />
        {isLoading ? (
          <p style={{ fontSize: "40px" }}>Loading ...</p>
        ) : (
          <div>
            <LocationInfo degreeFormat={degreeFormat} location={location} />
            <SwitchButton
              toggleFormat={() => toggleFormat()}
              degreeFormat={degreeFormat}
            />
            <p>{hour}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

