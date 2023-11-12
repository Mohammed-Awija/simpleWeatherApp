import "./styles.css";
import axios from "axios";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import { useState } from "react";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';

export default function App() {

  const [data, setData] = useState({})
  const [inputValue, setInputValue] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=39615cb58e46537a8fbea80fcfb68cbf`

  const handleSubmit = (e) => {
    if(inputValue !== ""){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
    }
    setInputValue("")
  }


  const image = "https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg?size=626&ext=jpg&ga=GA1.1.1488620777.1696291200&semt=ais"

  return (
    <Stack sx={{ backgroundImage: `url(${image})`,  backgroundSize: 'cover', backgroundPosition: 'center', width: '100%' , height: '500px' }} justifyContent="start" alignItems="center" spacing={1} className="App">
      <Typography sx={{ color: "white" }} variant="h3">Weather App</Typography>
      <Stack justifyContent="center" alignItems="center" direction="row" >
      <TextField onChange={e => setInputValue(e.target.value)} value={inputValue} 
      variant="standard" label="Enter city" size="small"/>
      <Button onClick={handleSubmit}  variant="contained">search</Button>
      </Stack>
      <Stack justifyContent="center" alignItems="center" direction="row" spacing={2}>
      {data.sys ? <Typography variant="h3">{data.name}</Typography> : null}
      {data.weather ? <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weatherImg"/> : null}
      </Stack>
      {data.main ? <Stack justifyContent="center" alignItems="center" direction="row">
      <ThermostatIcon/><Typography variant="h5">{data.main.temp.toFixed()}</Typography> </Stack> : null}

      {data.wind ? <Stack spacing={1} justifyContent="center" alignItems="center" direction="row">
      <AirIcon/><Typography variant="h5">{data.wind.speed} MPH</Typography> </Stack> : null}

      {data.weather ? <Typography variant="h5">{data.weather[0].description}</Typography> : null}
      {data.main ? <Typography variant="h5">Feels like {data.main.feels_like}</Typography> : null}
      {data.main ? <Typography variant="h5">Humidity {data.main.humidity}%</Typography> : null}
    </Stack>
  );
}


/*
{"coord":{"lon":28.9833,"lat":41.0351},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],
"base":"stations","main":{"temp":288.74,"feels_like":288.5,"temp_min":286.52,
"temp_max":288.83,"pressure":1015,"humidity":82},"visibility":10000,"wind":{"speed":2.57,"deg":180},
"clouds":{"all":0},"dt":1699642892,"sys":{"type":1,"id":6970,"country":"TR","sunrise":1699591503,
"sunset":1699627854},"timezone":10800,"id":745042,"name":"Istanbul","cod":200}
*/