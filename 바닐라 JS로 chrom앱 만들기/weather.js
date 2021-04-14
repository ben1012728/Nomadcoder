const weather = document.querySelector(".js-weather");
const API_Key ="2b0e48d6768db04e501b15deaf8b8b18"
const COORDS = 'coords';

function getWeather(lat, lng){
     fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=37.61776595036474&lon=127.0676463506765&appid=2b0e48d6768db04e501b15deaf8b8b18&units=metric`
         ).then(function(respone){
             return respone.json()
         }) .then(function(json) {
             const temperature = json.main.temp;
             const place = json.name;
             weather.innerText = `${temperature}c in ${place}`
         });
}
//37.61776595036474, 127.0676463506765
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

/*
const API_KEY="1d620b0d883ebc384e94d7dc7d13fc9b";

const COORDS = 'coords'

function getWeather(lat,lng){ 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_key}`
)};


function saveCoords(coordsObj){ 
   localStorage.setItem(COORDS,JSON.stringify(coordsObj)) 
}

function handleGeoSuccess(position){ 
    const latitude=position.coords.latitude; 
    const longitude=position.coords.longitude; 
    const coordsObj={ latitude:latitude, longitude:longitude };
}

function handleGeoError(){ 
    console.log ("Cant access geo location"); 
}


function askForCoords(){ 
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)

}

function loadCoords(){ 
    const loadedCoords = localStorage.getItem(COORDS)
     if(loadedCoords===null){ 
         askForCoords(); 
    } else { 
        const parseCoords=JSON.parse(loadedCoords); 
        getWeather(parseCoords.latitude, parseCoords.longitude);

}
}

function init(){ 
    loadCoords(); 
}


init();
*/