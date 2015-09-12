// script.js
setTimeout(function () {
    var link = document.querySelector("link[rel~='icon']");
    link.type = "image/x-icon";

    var faviconUrl = link.href;
    var favicon = document.createElement('img');
    favicon.src = faviconUrl;

    favicon.onload = function() {        
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
}, 1000);
