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
        var deleteButton = document.createElement('button');
        var flag = document.createElement('img');
        var lineBreak = document.createElement('hr');
        deleteButton.id = this.countries.value;
        deleteButton.innerText = "Remove";
        nameLi.innerText = "Name: " + countryToAdd.name;
        flag.src = countryToAdd.flag;
        flag.width = 100;
        bucketUl.appendChild(flag);
        bucketUl.appendChild(nameLi);
        bucketUl.appendChild(deleteButton);
        bucketUl.appendChild(lineBreak);

    })

    
    
}

window.addEventListener('load', app);