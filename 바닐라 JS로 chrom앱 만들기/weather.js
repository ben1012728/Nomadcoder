const API_Key ="1d620b0d883ebc384e94d7dc7d13fc9b"
const COORDS = 'coords';

function getWeather(lat, lng){
     fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_key}}`
         );
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces (position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
      latitude,
      longitude 
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude)
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadedCoords= localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
    const parsedCoords = JSON.parse(loadedCoords)
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init (){
 loadCoords();
}

init();