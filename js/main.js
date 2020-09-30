

//START

//DECLARE VARS

let today = new Date();
let month = String(today.getMonth() + 1);

//hard code month to test emoji switching
//let month = 6;

console.log(month);

let zipInput = 0;
let seasons = ["🌷   🐰   🐣",
    "⛱   🌞   🌊",
    "🍁   🎃   🏈",
    "⛄️   ⛷   🎄"]


let currSeason = "";

function seasonSelection(month) {
    if (month >= 3 && month <= 5) {
        return currSeason = seasons[0];
    }
    else if (month >= 6 && month <= 8) {
        return currSeason = seasons[1];
    }
    else if (month >= 9 && month <= 11) {
        return currSeason = seasons[2];
    }
    else {
        return currSeason = seasons[3];
    }
}



//add event listener to zip submit button
zipBtn.addEventListener("click", callAPI);


//DECLARE FUNCTIONS
//getZip from User Input
function getZip() {
    //hard coded zip to test API
    //return zipInput = 40503;
    return zipInput = document.getElementById("zipInput").value;

}



//FETCH DATA FROM API
async function callAPI() {
    //getZip from UI
    getZip();
    seasonSelection(month);
    //credentials to use API
    let key = "db1629542ea2a497570a696c75d1e91b"
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipInput}&appid=${key}`;
    //making API call
    fetch(url)
        .then(response =>
            response.json())
        .then(function (data) {
            console.log(data);
            console.log(currSeason);
            //parse JSON and send to HTML
            //switch content cards to visible
            document.getElementById("weather-output").style.visibility = "visible";
            
            //send cityName to header
            document.getElementById("cityName").innerHTML = data.name;
            
            //calculate temperature in the different measurement systems
            const tempK = Math.round(data.main.temp);
            const tempC = tempK - 273;
            const tempF = Math.round(tempC * 9 / 5 + 32);

            //if-else series to determine which thermometer icon to display based on temperature
            if (tempF > 90) {
                document.getElementById("conditionIcon").className = "fas fa-thermometer-full";
            }
            else if (tempF > 75) {
                document.getElementById("conditionIcon").className = "fas fa-thermometer-three-quarters";
            }
            else if (tempF > 50) {
                document.getElementById("conditionIcon").className = "fas fa-thermometer-half";
            }
            else if (tempF > 32) {
                document.getElementById("conditionIcon").className = "fas fa-thermometer-quarter";
            }
            else {
                document.getElementById("conditionIcon").className = "fas fa-thermometer-empty";
            }
            
            //display temperature in all measurement systems
            document.getElementById("tempK").innerHTML = tempK + " K";
            document.getElementById("tempC").innerHTML = tempC + " C";
            document.getElementById("tempF").innerHTML = tempF + " F";

            //display current weather description from API
            document.getElementById("conditionText").innerHTML = data.weather[0].description;
            
            //display season emoji string based on current month
            document.getElementById("seasonEmoji").innerHTML = currSeason;
        }

        )
        .catch(function (error) {
            document.getElementById("weather-output").style.visibility = "hidden";
            alert("Enter a valid zip code.");
        });


}



//END
