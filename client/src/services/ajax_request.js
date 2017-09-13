var AjaxRequest= function(url) {
  this.url = url;
  this.allData = [];
  this.currentData = [];
}

AjaxRequest.prototype.get = function() {
  var request = new XMLHttpRequest();
  request.open('GET', this.url);

  request.addEventListener('load', function() {
    if( request.status !== 200 ) return;

    var jsonString = request.responseText;
    this.allData = JSON.parse(jsonString);

  }.bind(this));
  request.send();
}

AjaxRequest.prototype.post = function(newData) {
  var request = new XMLHttpRequest();
  request.open('POST', this.url);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener('load', function() {
    if( request.status !== 200 ) return;

    var jsonString = request.responseText;
    this.currentData = JSON.parse(jsonString);

  }.bind(this));
  request.send(JSON.stringify(newData));
}


module.exports = AjaxRequest;