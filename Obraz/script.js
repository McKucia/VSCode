
var imageData;
var lowfilter = [1, 1, 1, 1, 1, 1, 1, 1, 1];
var highfilter = [-1, -1, -1, -1, 9, -1, -1, -1, -1];
var lp2filter = [1, 1, 1, 1, 12, 1, 1, 1, 1];
var gradientfilter = [-1, 1, 1, -1, -2, 1, 1, 1, 1];

function attachFilter(f) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var filter;
    switch(f){
        case 'lowpass':
            filter = lowfilter;
            break;
        case 'highpass':
            filter = highfilter;
            break;
        case 'lp2':
            filter = lp2filter;
            break;
        case 'gradient':
            filter = gradientfilter;
            break;
    }

    var newImageData = ctx.createImageData(width, height);
    newImageData = imageData;
    console.log(newImageData);

    for(var i = 1; i < width - 1; i++){
        for(var j = 1; j < height - 1; j++){
            var rsume = 0, gsume = 0, bsume = 0;
            index = (i * width + j) * 4;

            var fIndex = 0, fSume = 0;
            for(var k = -1; k <= 1; k++){
                for(var l = -1; l <= 1; l++){
                    var mIndex = ((i + k) * width + (j + l)) * 4;
                    rsume += filter[fIndex] * imageData.data[mIndex];
                    gsume += filter[fIndex] * imageData.data[mIndex + 1];
                    bsume += filter[fIndex] * imageData.data[mIndex + 2];
                    fSume += filter[fIndex];
                    fIndex++;
                }
            }
            rsume /= fSume;
            gsume /= fSume;
            bsume /= fSume;

            if (rsume > 255) rsume = 255;
            else if (rsume < 0) rsume = 0;
            if (gsume > 255) gsume = 255;
            else if (gsume < 0) gsume = 0;
            if (bsume > 255) bsume = 255;
            else if (bsume < 0) bsume = 0;

            newImageData.data[index] = rsume;
            newImageData.data[index + 1] = gsume;
            newImageData.data[index + 2] = bsume;
        }
    }
	
    ctx.putImageData(newImageData, 0, 0);
}

function contrast() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var contrastValue = document.querySelector(".my-contrast").value;

    var width = canvas.width;
    var height = canvas.height;

    var LUT = new Array(255);
    for (var i = 0; i < 256; i++) {
        var newValue = (contrastValue * (i - 127) + 127);
        if (newValue > 255)
            LUT[i] = 255;
        else if (newValue < 0)
            LUT[i] = 0;
        else
            LUT[i] = newValue;
    }
    var newImageData = ctx.createImageData(width, height);
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            index = (i * width + j) * 4;
            newImageData.data[index + 3] = 255;
            newImageData.data[index + 0] = LUT[imageData.data[index + 0]];
            newImageData.data[index + 1] = LUT[imageData.data[index + 1]];
            newImageData.data[index + 2] = LUT[imageData.data[index + 2]];
        }
    }
    ctx.putImageData(newImageData, 0, 0);
}


function loadImage() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var imgSrc = document.querySelector(".my-image").value;

    if (imgSrc.indexOf("//") == -1 && imgSrc.indexOf(".") != 0) {
        imgSrc = "file:///" + imgSrc;
    }

    var img = new Image();
    img.src = imgSrc;
    img.onload = function () {
        var width = img.width;
        var height = img.height;
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0);
        imageData = ctx.getImageData(0, 0, width, height);
    }
}