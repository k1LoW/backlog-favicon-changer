'use strict';

function changeFavicon() {
    let link = document.querySelector("link[rel~='icon']");
    link.type = 'image/x-icon';

    let faviconUrl = link.href;
    let favicon = document.createElement('img');
    favicon.src = faviconUrl;

    favicon.onload = () => {
        if (isOriginalOldFavicon(favicon)) {
            let source = $('.Banner-icon img')[0];
            let canvas = document.createElement('canvas');
            let size = 32;
            canvas.width = size;
            canvas.height = size;
            let context = canvas.getContext('2d');

            context.drawImage(source, 0, 0, size, size);
            context.globalCompositeOperation = 'source-over';
            context.drawImage(favicon, 16, 16, 16, 16);
            link.href = canvas.toDataURL();
        } else if (isOriginalNewFavicon(favicon)) {
            let source = new Image();
            source.crossOrigin = 'Anonymous';
            source.src = $('img.header-icon-set__image')[0].src;
            source.onload = () => {
                let canvas = document.createElement('canvas');
                let size = 32;
                canvas.width = size;
                canvas.height = size;
                let context = canvas.getContext('2d');

                context.drawImage(source, 0, 0, size, size);
                context.globalCompositeOperation = 'source-over';
                context.drawImage(favicon, 16, 16, 16, 16);
                link.href = canvas.toDataURL(); 
            };            
        }
    };
}

function checkFavicon(favicon, checkpoint) {
    let size = 32;
    let canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    let context = canvas.getContext('2d');
    context.drawImage(favicon, 0, 0, size, size);

    let ret =  _.select(checkpoint, (i) => {
        let imagedata = context.getImageData(i[0],i[1],1,1);
        return (JSON.stringify(Array.prototype.slice.apply(imagedata.data)) == i[2]);
    });
    return (_.size(ret) == _.size(checkpoint));
}

function isOriginalNewFavicon(favicon) {
    let checkpoint = [
        [1,1,'[0,0,0,0]'],
        [5,5,'[0,170,128,6]'],
        [10,10,'[255,255,255,255]'],
        [20,20,'[255,255,255,255]'],
        [30,1,'[0,0,0,0]']
    ];

    return checkFavicon(favicon, checkpoint);
}

function isOriginalOldFavicon(favicon) {
    let checkpoint = [
        [1,1,'[167,209,46,243]'],
        [1,30,'[153,203,16,243]'],
        [30,1,'[167,209,46,243]']
    ];

    return checkFavicon(favicon, checkpoint);
}

setInterval(() => {
    changeFavicon();
}, 5000);

setTimeout(() => {
    changeFavicon();
}, 1000);
