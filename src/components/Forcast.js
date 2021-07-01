import React ,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import  ReactAnimatedWeather from 'react-animated-weather';
import './style.css';
import axios from 'axios';
const api={
  keyy:"21ca2453a95ebf0f4fba8e45fd521f18",
  base:"https://api.openweathermap.org/data/2.5/"
}
 function Forcast(props)
 {
          const [query, setQuery] = useState("");
          const [error, setError] = useState("");
          const [weather, setWeather] = useState({});
          const search = (evt)=>
          {
               if(evt.key === "Enter")
                   {
                        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.keyy}`)
                         .then(res => res.json())
                        .then((response) => {
                          setWeather(response);
                          setQuery("");
                        })
                          .catch(function (error) {
                            console.log(error);
                            setWeather("");
                            setQuery("");
                            setError({ message: "Not Found", query: query });
                          });
                    }
          }
 
     const defaults = {
         color: "white",
         size: 112,
         animate: true,
       };
        useEffect(() => {
          search("Delhi");
      }, []);  
 
     return(
         <>
         <div className="forecast">
            <div className="forecast-icon">
             <ReactAnimatedWeather
                icon={props.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
                 />
      <div>
      {typeof weather.main != "undefined" ? (
        
         <div className="today-weather">
            <h3> {(weather.weather[0].main)}</h3>  
           
             <div>
                   <input type="text" value={query}  className="search-baar" onKeyPress={search} onChange={(e) => setQuery(e.target.value)}  placeholder="Search any city" ></input>
                 <div className="img-box">
                           {" "}
                    <img src="https://images.avishkaar.cc/workflow/newhp/search-white.png"  onClick={search}  />
                 </div> 
                </div>
                </div> 
                )
                 : ((
                 <div>
                 <input type="text" value={query} onKeyPress={search} className="search-baar" onChange={(e) => setQuery(e.target.value)}  placeholder="Search any city" ></input>
               <div className="img-box">
                         {" "}
                  <img src="https://images.avishkaar.cc/workflow/newhp/search-white.png"  onClick={search}  />
               </div> 
              </div>)
                 )}
      
              </div>
             
               <ul className="list-temp-city">
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
               <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                /> 
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
            </div>
    </div> 
         </>
     )}


export default Forcast;