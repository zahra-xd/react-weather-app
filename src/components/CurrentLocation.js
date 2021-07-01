import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Clock from 'react-live-clock';
import Forcast from './Forcast';
// import apiKeys from './apiKeys';
import loader from '../image/WeatherIcons.gif'
import  ReactAnimatedWeather from 'react-animated-weather';
const api={
  keyy:"21ca2453a95ebf0f4fba8e45fd521f18",
  base:"https://api.openweathermap.org/data/2.5/"
}
class Weather extends React.Component{
    state = { 
      lat: undefined,
      lon: undefined,
      errorMessage: undefined,
      temperatureC: undefined,
      temperatureF: undefined,
      city: undefined ,
      country: undefined,
      humidity: undefined,
      description: undefined,
      icon: "CLEAR_DAY",
      sunrise: undefined,
      sunset: undefined,
      errorMsg: undefined
  }
   componentDidMount() {
    if (navigator.geolocation) {
     this.getPosition()
       .then((position) => {
         this.getWeather(position.coords.latitude, position.coords.longitude);
       })
      .catch((err) => {
          this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
            );
          });
     } 
     else {
       alert("Geolocation not available");
     
     this.timerID = setInterval(
       () => this.getWeather(this.state.lat, this.state.lon),
       600000
     );
   }
  }
   componentWillUnmount() {
     clearInterval(this.timerID);
   }
  

   getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
   };
   
  getWeather = async (lat, lon) => {
   const api_call = await fetch(
    `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.keyy}`
     );
     const data = await api_call.json()  
     this.setState({
         lat: lat,
         lon: lon,
         city: data.name,
         temperatureC: Math.round(data.main.temp),
         temperatureF: Math.round(data.main.temp * 1.8 + 32),
         humidity: data.main.humidity,
         main: data.weather[0].main,
         country: data.sys.country,    
     });
     switch (this.state.main) {
       case "clear":
         this.setState({ icon: "CLEAR_DAY" });
         break;
       case "Clouds":
         this.setState({ icon: "CLOUDY" });
         break;
       case "Rain":
         this.setState({ icon: "RAIN" });
         break;
       case "Snow":
         this.setState({ icon: "SNOW" });
         break;
       case "Dust":
         this.setState({ icon: "WIND" });
         break;
       case "Drizzle":
         this.setState({ icon: "SLEET" });
         break;
       case "Fog":
         this.setState({ icon: "FOG" });
         break;
       case "Smoke":
         this.setState({ icon: "FOG" });
         break;
       case "Tornado":
         this.setState({ icon: "WIND" });
         break;
       default:
         this.setState({ icon: "CLEAR_DAY" });
     }
   };
    render() { 
        const dateBuilder = (d) => {
            let months = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            let days = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
          
            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
          
            return `${day}, ${date} ${month} ${year}`;
          };
          const defaults = {
            color: "white",
            size: 112,
            animate: true,
          };
        if (this.state.temperatureC) {
          return (
            <React.Fragment>
              <div className="city">
              
                <div className="mb-icon">
                  {" "}
                  <ReactAnimatedWeather
                    icon={this.state.icon}
                    color={defaults.color}
                    size={defaults.size}
                    animate={defaults.animate}
                  />
                  <p>{this.state.main}</p>
                </div>
                <div className="date-time">
                  <div className="dmy">
                    <div id="txt"></div>
                    <div className="current-time">
                      <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                    </div>
                    <div className="current-date">{dateBuilder(new Date())}</div>
                  </div>
              
                </div>
              </div>
              <Forcast icon={this.state.icon} weather={this.state.main} />
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment>
              <img src={loader} style={{ width: "50%", WebkitUserDrag: "none",background:"gray" }} />
              <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
                Detecting your location
              </h3>
              <h3 style={{ color: "black", marginTop: "10px" }}>
                Your current location wil be displayed on the App <br></br> & used
                for calculating Real time weather.
              </h3>
            </React.Fragment>
          );
        }
      }
      }
export default Weather;