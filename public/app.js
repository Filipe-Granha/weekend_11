var mainMap = null;

var makeRequest = function(url, callback) { // the callback is defined down in the app function
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function() { //callback from makeRequest
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  xsources = JSON.parse(jsonString); // xsources is now a JS object
  sources = xsources.sources; // can't have 'var', otherwise won't be accessible to the next functions
  populateList(sources);
}

var populateList = function(sources) { // executed inside the above requestComplete function
  var select = document.querySelector('select'); // selects the position in the DOM 
  sources.forEach(function(source, index) { // for each source inside object sources
    var option = document.createElement('option'); // create 'option' as one of the choices of the dropdown menu
    option.innerText = source.name; // gives .name as the description to that choice
    option.value = index;
    var jsonString = localStorage.getItem("source");
    select.appendChild(option);
  });
}

var handleSelectChange = function() {
    var source = sources[this.value];
    populateDetails(source); 
}

var populateDetails = function(source) {
  var ul = document.querySelector("#source-list");
  
  var liName = document.createElement("li");
  var liCountry = document.createElement("li");
  var liUrl = document.createElement("li");
  // var image = document.createElement("img"); // just a reminder, if an image was needded
  // image.src = source.image_url;
  
  liName.innerText = "Title: " + source.name;
  liCountry.innerText = "Country: " + source.country;
  liUrl.innerText = source.url;
  
  ul.appendChild(liName);
  ul.appendChild(liCountry);
  ul.appendChild(liUrl).style.marginBottom = "15px";

  // document.getElementById("liUrl").href = "source.url"; should set li as link ?

  var anotherSource = source;
  var jsonString = JSON.stringify(anotherSource);
  localStorage.setItem('anotherSource', jsonString); // saves each selected source into the localstorage, as a json string
  console.log(jsonString)
} 


var app = function () {

  var url = "https://newsapi.org/v1/sources";
  makeRequest(url, requestComplete)

  var selectList = document.querySelector("select");
  selectList.addEventListener("change", handleSelectChange);


  ///////////////// GOOGLE MAPS bellow:
  // 3 essential lines for the map to be displayed:
  var center = { lat: 37.507351, lng: -0.107758 }; // the default location which the map will show at the beginning
  var mapDiv = document.querySelector("#main-map"); // indicates the position of the map on the DOM (Html page)
  var mainMap = new MapWrapper(mapDiv, center, 1); // displays the map

  // var warwick = [ 51.4894986, -0.1947981]; // this and any other locations are just pointers for the markers

  // mainMap.addMarker(center, "Do not click!", "Somewhere central in London!");

  // mainMap.addClickEvent(); // adds a marker to the map by clicking on the map

}

window.addEventListener('load', app);
 