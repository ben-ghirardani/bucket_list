var AjaxRequest = require("./services/ajax_request");
var BucketView = require("./views/bucket_view");
var AllCountriesView = require("./views/all_countries_view");


function app(){
    var countriesView = new AllCountriesView();
    var bucketView = new BucketView();
    var countriesData = new AjaxRequest("https://restcountries.eu/rest/v2/all");
    countriesData.get(countriesView.render);



    var bucketData = new AjaxRequest("http://localhost:3000/api/bucket-list");
    bucketData.get(bucketView.render);
    
    var form = document.querySelector("form");
    
    form.addEventListener("submit", function(event){
        event.preventDefault();
        var countryToAdd = countriesData.characters[this.countries.value];
        if (!countryToAdd.name) return;
        bucketData.post(countriesView.render, countryToAdd);

        var bucketUl = document.querySelector("#bucket-display");
        var nameLi = document.createElement('li');
        nameLi.innerText = "Name: " + countryToAdd.name;
        bucketUl.appendChild(nameLi);

    })

    
}

window.addEventListener('load', app);