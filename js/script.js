// script.js
setInterval(function () {
    changeFavicon();
}, 5000);

function changeFavicon() {
    var link = document.querySelector("link[rel~='icon']");
    link.type = "image/x-icon";

    var faviconUrl = link.href;
    var favicon = document.createElement('img');
    favicon.src = faviconUrl;    
    
    favicon.onload = function() {
        if (!isOriginalFavicon(favicon)) {
            return;
        }
        var source = $('.Banner-icon img')[0];
        var canvas = document.createElement("canvas");
        var size = 32;
        canvas.width = size;
        canvas.height = size;
        var context = canvas.getContext("2d");
        
        context.drawImage(source, 0, 0, size, size);
        context.globalCompositeOperation = "source-over";
        context.drawImage(favicon, 16, 16, 16, 16);
        link.href = canvas.toDataURL();
    };
}

function isOriginalFavicon(favicon) {
    var size = 32;
    var canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    var context = canvas.getContext("2d");
    context.drawImage(favicon, 0, 0, size, size);

    var checkpoint = [
        [1,1,'[167,209,46,243]'],
        [1,30,'[153,203,16,243]'],
        // [30,30,'[234,0,48,255]'], red
        [30,1,'[167,209,46,243]']
    ];

    var ret =  _.find(checkpoint, function(i) {
        var imagedata = context.getImageData(i[0],i[1],1,1);
        return (JSON.stringify(Array.prototype.slice.apply(imagedata.data)) == i[2]);
    });
    return (_.size(ret) == _.size(checkpoint));
}

setTimeout(function () {
    changeFavicon();
}, 1000);
