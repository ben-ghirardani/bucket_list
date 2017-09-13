var AjaxRequest = require("./services/ajax_request");

function app(){
    var countriesData = new AjaxRequest("https://restcountries.eu/rest/v2/all");
    countriesData.get();
}

window.addEventListener('load', app);