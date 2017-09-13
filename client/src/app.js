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
    


    
}

window.addEventListener('load', app);