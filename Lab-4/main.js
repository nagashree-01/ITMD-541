const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('currentweatheritems');
const timezone = document.getElementById('timezone');
const countryE1 = document.getElementById('country');
const weatherForecastE1 = document.getElementById('weatherforecast');
const currentTempE1 = document.getElementById('currenttemp');
const locationInput = document.getElementById('locationInput');
const locationSubmit = document.getElementById('locationSubmit');
const foreCastDiv = document.getElementsByClassName('futureforecast')[0];

foreCastDiv.style.display = "none"
timezone.style.display = "none"
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
'Thursday', 'Friday', 'Saturday']

const months = ['January', 'February', 'March', 'April', 'May',
'June', 'July', 'August', 'September', 'October', 'November',
'December'];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursin12 = hour >= 13 ? hour %12: hour
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM'

  timeE1.innerHTML = hoursin12 + ':' + minutes + ' '
  + `<span id="am-pm">${ampm}</span>`

  dateE1.innerHTML = days[day] + ', ' + date + ' ' + months[month]

},1000);


locationSubmit.addEventListener('click',function(e){
  e.preventDefault();
  console.log('Accessing Location!')
  let locationText = locationInput.value
  console.log(locationText)
  if(locationText){
    getWeatherData(locationText)
  } else {
    alert('Enter a city')
  }

})
getWeatherData()
function getWeatherData(location) {
  navigator.geolocation.getCurrentPosition((success) => {

    let {latitude, longitude} = success.coords;
    console.log(success);
    if(!location){
      url = "https://weatherdbi.herokuapp.com/data/weather/"+latitude+","+longitude
    } else {
      url = "https://weatherdbi.herokuapp.com/data/weather/"+location
    }

    fetch(url)
    .then(res=>res.json())
    .then(data=> {
      console.log('Location Accessed!')
      console.log(data);
      if(data.status!="fail"){
        foreCastDiv.style.display = "flex";
        timezone.style.display = "block";
        timezone.innerHTML=data.region;
        showWeatherData(data);
      } else {
        foreCastDiv.style.display = "none";
        timezone.style.display = "none";
        timezone.innerHTML='';
        alert('Invalid city!')
      }

    })
    .catch(function(){
      console.log('Error has occured')
    })
  })
}

    function showWeatherData(data) {

      let { humidity, precip, wind, temp, dayhour, comment } = data.currentConditions;

      currentWeatherItemsE1.innerHTML =
      `<div class="weatheritem">
        <div>Day</div>
        <div>${dayhour}</div>
      </div><div class="weatheritem">
        <div>Current Temp</div>
        <div>${temp['c']+'&#176'+'C'}</div>
      </div>
      <div class="weatheritem">
        <div>Humidity</div>
        <div>${humidity}</div>
      </div>
      <div class="weatheritem">
        <div>Precipitation</div>
        <div>${precip}</div>
      </div>
      <div class="weatheritem">
        <div>Wind</div>
        <div>${wind['km']+' km/hr'}</div>
      </div>
      <div class="weatheritem">
        <div>Condition</div>
        <div>${comment}</div>
      </div>
      `;

    let otherDayForecast = ''
    data.next_days.forEach((day) => {

        otherDayForecast += `
        <div class="weatherforecastitem">
          <div class="day">${day.day}</div>
          <img src="${day.iconURL}" alt="weather icon" class="wicon">
          <div class="temp">Max - ${day.max_temp['c']}&#176; C</div>
          <div class="temp">Min - ${day.min_temp['c']}&#176; C</div>
        </div>`

        weatherForecastE1.innerHTML = otherDayForecast;

      })

}
