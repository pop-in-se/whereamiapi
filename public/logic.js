collectText.onclick = async function () {

    document.getElementById('cityOutput').innerHTML = "";
    const textToDisplay = await makeRequest("http://localhost:3000/api", "GET")
    
    for (let i = 0; i < textToDisplay.length; i++) {
    const header = document.createElement('li')
    header.innerText = textToDisplay[i].city
  
    document.getElementById('cityOutput').appendChild(header)
    }
}


async function saveNew() {
    let cityInput = document.getElementById('favCity').value
    
    const status = await makeRequest("http://localhost:3000/api", "POST", 
    {city: cityInput})
    
}

const button = document.getElementById('submit');
      button.addEventListener('click', async event => {
        const city = document.getElementById('favCity').value;
        const data = { city };
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
      });
      

if ('geolocation' in navigator){
    console.log('Geolocation fungerar')
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        document.getElementById('latInfo').textContent = lat;
        document.getElementById('longInfo').textContent = long;
      });
} else {
    console.log('Geolocation fungerar ej')
}


async function getLocation() {
    
    try {
        const response = await fetch("https://reverse-geocoding-to-city.p.rapidapi.com/data/reverse-geocode?longitude=11.8829845&latitude=57.692260399999995", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "reverse-geocoding-to-city.p.rapidapi.com",
            "x-rapidapi-key": "ee0d274251msh565ba3fce388212p15af75jsn295b87ac397c",
            "body": JSON.stringify(),
        }
    })
    let body = await response.json();
    console.log(body)

    document.getElementById('youAreHere').innerText = body.countryName;

    
    } catch(err) {
        console.log(err)
    };

}
getLocation()




async function makeRequest(url, method, body){
    try {
    const response = await fetch(url, {
        headers: {"Content-Type": "application/json"},
        method,
        body: JSON.stringify(body)
    })
    console.log(response)
    const result = await response.json()
    return result

    }   catch(err) {
        console.error(err)
    }
}