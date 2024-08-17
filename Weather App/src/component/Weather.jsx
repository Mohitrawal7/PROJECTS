import React from 'react'
import './Weather.css'
import { useEffect,useState } from 'react';
import clear_icon from '../assets/clear.png'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'



const Weather = () => {
const[data,setData]= useState({});
const[searchTerm,setSearchTerm] = useState("New Delhi")

const url = "https://api.weatherstack.com/current?access_key=b91e001448f9c2d23b42a96652d70eba";
const options = {
	method: 'GET'
};
const search = async (title) =>{
try {
	const response = await fetch(`${url}&query=${title}`, options);
	const result = await response.json();
  console.log(result);
  setData({
    humidity : result.current.humidity,
    windspeed : result.current.wind_speed,
    temperature : Math.floor(result.current.temperature),
    location : result.location.name,
    icon : result.current.weather_icons
  })
} catch (error) {

	console.error(error);
}
};
   
      useEffect(() =>{
        search("")
      },[])

  return (
<div className="weather">
    <div className='search-bar'>
        <input type='text' placeholder='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)
          }
        className='search'/>
        <img src={search_icon}
        onClick={() => search(searchTerm) }
        className='img' ></img>
    </div>  

    <img src={data.icon} className='weather-icon' />
    <p className='temp'>{data.temperature}°c</p>
    <p className='location'>{data.location}</p>

    <div className='weather-data'>
      <div className='col'>
        <img src={humidity_icon} className='humidity'/>
        <div className='last-data'> 
        <p>{data.humidity}</p>
        <span >Humidity</span>
        </div>
        
      </div>

      <div className='col'>
        <img src={wind_icon} className='Wind'/>
        <div className='last-data'> 
        <p>{data.windspeed}km/hr</p>
        <span>Wind Speed</span>
        </div>
      </div>
    </div>

</div>
  )
}

export default Weather