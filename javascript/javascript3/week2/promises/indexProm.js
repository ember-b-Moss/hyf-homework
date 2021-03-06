//Promise that resolves after set time

//Create a function that has one parameter: resolveAfter.
//Calling this function will return a promise that resolves after the resolveAfter seconds has passed.

function timedResponse(resolveAfter) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log("I´m async response"));
    }, resolveAfter * 1000);
  });
}
console.log(timedResponse(8));

//When you have written the promise, use it with async/await

async function getMessage() {
  try {
    const message = await timedResponse(15);
    //console.log(message);
  } catch (error) {
    alert(error);
  }
}
console.log(getMessage());

//Rewrite setTimeout to promises
//also accounted for error
function setTimeoutPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      reject("rejected");
    }, time);
  });
}
console.log(setTimeoutPromise(3000)); //logged out the timed promise

//below i consumed the timed promise
setTimeoutPromise(3000)
  .then(() => {
    console.log("Called after 3 seconds");
  })
  .catch((error) => {
    console.log(error);
  });

//Rewrite navigator.geolocation.getCurrentPosition to promise
//The getCurrentPosition function is probably going to throw an error, but that is fine. As long as you can use it as a promise.
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve(position);
      reject("rejected");
    });
  });
}

console.log(getCurrentLocation()); //logged out the promise that contains GeolocationPosition

//below i consumed the promise with position
getCurrentLocation()
  .then((position) => {
    // called when the users position is found
    console.log(position);
  })
  .catch((error) => {
    // called if there was an error getting the users location
    console.log(error);
  });

//Fetching and waiting

//The 3 steps:
//Wait 3 seconds
//After 3 seconds fetch some data from any api you like
//Log out the data from the api

//Do the steps above using promises and .then

function getTodaysCovidDataPromise() {
  fetch("https://covid-193.p.rapidapi.com/statistics?country=Denmark", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "648fc0d332mshda822f4d5f06c4dp1daa64jsn4f8cef537552",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log("resolvedPromise", data))
    .catch((err) => console.log(err));
}
/*function timedData() {
  setTimeout(() => {
    getPromiseData();
  }, 3000);
}
timedData();*/

//Do the 3 steps using async/await
async function getTodaysCovidDataAwait() {
  try {
    const response = await fetch(
      "https://covid-193.p.rapidapi.com/statistics?country=Denmark",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key":
            "648fc0d332mshda822f4d5f06c4dp1daa64jsn4f8cef537552",
        },
      }
    );
    const covidData = await response.json();
    console.log("respondedWithAwait", covidData);
    return covidData;
  } catch (err) {
    console.log(err);
  }
}

function timedData() {
  setTimeout(() => {
    getTodaysCovidDataPromise();
    getTodaysCovidDataAwait();
  }, 3000);
}
timedData();


