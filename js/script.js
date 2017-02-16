'use strict';

function changeFavicon() {
    let link = document.querySelector("link[rel~='icon']");
    link.type = 'image/x-icon';

    let faviconUrl = link.href;
    let favicon = document.createElement('img');
    favicon.src = faviconUrl;

    favicon.onload = () => {
        if (!isOriginalNewFavicon(favicon)) {
            return;
        }
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
        [1,1,'[64,200,155,28]'],
        [5,5,'[66,206,159,255]'],
        [10,10,'[184,237,219,255]'],
        [30,1,'[64,200,155,28]']
    ];

    return checkFavicon(favicon, checkpoint);
}

setInterval(() => {
    changeFavicon();
}, 5000);

setTimeout(() => {
    changeFavicon();
}, 1000);
