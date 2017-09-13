var BucketView = function(){

}

BucketView.prototype.render = function(data){
    var bucketUl = document.querySelector("#bucket-display");
    console.log(bucketUl);
    for (var i = 0; i < data.length; i++) {
        var nameLi = document.createElement('li');
        nameLi.innerText = "Name: " + data[i].name;
        bucketUl.appendChild(nameLi);
    }
}

module.exports = BucketView;