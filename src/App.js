import React, { useState } from "react";
import styled from "styled-components";
import logo from './images/logo.png';
import WeatherComponent from "./components/WeatherDetails";

const Container = styled.div`
  max-width: 340px;
  margin: auto;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  transition: 0.3s;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.2);
`;

const AppLabel = styled.span`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  justify-content: center;

  img{
    width: 46px;
    height: 46px;
    margin-top: 10px;
  }

  h1{
    margin-top: 17px;
    color: #0F3057;
    font-size: 24px;
    font-weight: bold;
  }
`;

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
  border: rgb(0,172,238) solid 1.25px;
  border-radius: 2px;

  & input {
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-family: Montserrat;
    font-weight: bold;
    margin-right: 10px;
  }
  .custom-btn {
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 2px;
    padding: 10px 25px;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
    7px 7px 20px 0px rgba(0,0,0,.1),
    4px 4px 5px 0px rgba(0,0,0,.1);
    outline: none;
  }
  .btn-3 {
    background: rgb(0,172,238);
    background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
    width: 130px;
    height: 40px;
    line-height: 42px;
    padding: 0;
    border: none;
    
  }
  .btn-3 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-3:before,
  .btn-3:after {
    position: absolute;
    content: "";
    right: 0;
    top: 0;
    background: rgba(2,126,251,1);
    transition: all 0.3s ease;
  }
  .btn-3:before {
    height: 0%;
    width: 2px;
  }
  .btn-3:after {
    width: 0%;
    height: 2px;
  }
  .btn-3:hover{
    background: transparent;
    box-shadow: none;
  }
  .btn-3:hover:before {
    height: 100%;
  }
  .btn-3:hover:after {
    width: 100%;
  }
  .btn-3 span:hover{
    color: rgba(2,126,251,1);
  }
  .btn-3 span:before,
  .btn-3 span:after {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    background: rgba(2,126,251,1);
    transition: all 0.3s ease;
  }
  .btn-3 span:before {
    width: 2px;
    height: 0%;
  }
  .btn-3 span:after {
    width: 0%;
    height: 2px;
  }
  .btn-3 span:hover:before {
    height: 100%;
  }
  .btn-3 span:hover:after {
    width: 100%;
  }
`;
const CityLabel = styled.span`
  color: #0F3057;
  margin: 10px auto;
  margin-bottom: 15px;
  font-size: 17px;
  font-weight: bold;
`;

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [error, updateError] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed6f6859e3a74d792287e4471fab7df8`,
    );

    if(response.ok)
    {
      const newData = await response.json();
      updateError(false);
      updateWeather(newData);
    }
    else
    {
      console.log("Error")
      updateError(true);
      updateWeather("");
    }
    
  };
  return (
    <Container>
      <AppLabel>
        <img src={logo} />
        <h1>WeatherSphere</h1>
      </AppLabel>
        <CityLabel>Find weather of your city</CityLabel>
        <SearchBox onSubmit={fetchWeather}>
          <input
            onChange={(e) => updateCity(e.target.value)}
            placeholder="City"
          />
          <button className="custom-btn btn-3" type={"submit"}><span>Search</span></button>
        </SearchBox>
      {weather && (<WeatherComponent weather={weather} city={city} />)}
      {error && <CityLabel>No City Found</CityLabel>}
    </Container>
  );
}

export default App;
