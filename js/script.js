// script.js
setTimeout(function () {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "shortcut icon");
        document.head.appendChild(link);
    }
    link.type = "image/x-icon";

    var badgeUrl = chrome.extension.getURL("backlog.png");
    var badge = document.createElement('img');
    badge.crossOrigin = 'Anonymous';
    badge.src = badgeUrl;
    badge.onload = function() {       
        var source = $('.Banner-icon img')[0];
        var canvas = document.createElement("canvas");
        var size = 32;
        canvas.width = size;
        canvas.height = size;
        var context = canvas.getContext("2d");
        context.drawImage(source, 0, 0, size, size);
        context.globalCompositeOperation = "source-over";
        context.drawImage(badge, 0, 0, size, size);
        link.href = canvas.toDataURL();
    };
}, 500);
