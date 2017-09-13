var AllCountriesView = function(){

}

AllCountriesView.prototype.render = function(data){
    var select = document.querySelector("#country-list");

    for (var i = 0; i < data.length; i++) {
        var countryOption = document.createElement('option');
        countryOption.innerText = data[i].name;
        select.appendChild(countryOption);
    }
}

module.exports = AllCountriesView;