let cityNameTextBox = document.getElementById("cityNameTextBox")
let searchButton = document.getElementById("searchButton")
let tempInfo = document.getElementById("tempInfo")


function displayInfo(json, cityName){
    let  cityInfo = json.main
    let allINfo = `<h3>City: ${cityName}</h3>
    <p> Minimum Temperature: ${cityInfo.temp_min}</p>
    <p> Maximum Temperature: ${cityInfo.temp_max}</p>
    <p>Pressure: ${cityInfo.pressure}</p>
    
    `
    tempInfo.innerHTML = allINfo

}


searchButton.addEventListener('click',() => {

    let cityName = cityNameTextBox.value.toUpperCase()
    let url =  `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0cbaf5093b90b2a7077444b6fddb313f&units=imperial`
        fetch(url)
            .then((response) => {
                return response.json()
            }).then((json) => {
                displayInfo(json, cityName)
            }).catch((error) => {
                console.log(error)
            })
    
    
})
    