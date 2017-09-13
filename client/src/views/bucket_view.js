var BucketView = function(){

}

BucketView.prototype.render = function(data, request){
    var bucketUl = document.querySelector("#bucket-display");
    
    for (var i = 0; i < data.length; i++) {
        var nameLi = document.createElement('li');
        var deleteButton = document.createElement('button');
        var flag = document.createElement('img');
        var lineBreak = document.createElement('hr');
        deleteButton.value = i;
        deleteButton.innerText = "Remove";
        nameLi.innerText = "Name: " + data[i].name;
        flag.src = data[i].flag;
				flag.width = 100;
				
        deleteButton.addEventListener("click", function(){
         var AjaxRequest = require("./services/ajax_request");
         var bucketData = new AjaxRequest("http://localhost:3000/api/bucket-list");
          bucketData.delete(this.value);
    })

        bucketUl.appendChild(flag);
        bucketUl.appendChild(nameLi);
        bucketUl.appendChild(deleteButton);
        bucketUl.appendChild(lineBreak);
    }
}

module.exports = BucketView;