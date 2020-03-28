const URL1 =
  'http://api.openweathermap.org/data/2.5/find?units=metric&appid=19d8cf81101403728227847c7ea15658&q=';

function getTemp(cityName) {
  return fetch(URL1 + cityName)
    .then(response => response.json())
    .then(json => {
      return json.list[0].main.temp;
    });
}

export default getTemp;
