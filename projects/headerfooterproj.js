window.onload = function () {
    // Allow for random header image
    $('#footer').load('../../footer.html');
    $('#header').load('../../header.html');
    $('#modal').load('../../modal.html');
    
    var images = [
        'https://eetom.github.io/img/hosted/pano1.jpg',
        'https://eetom.github.io/img/hosted/pano2.jpg',
        'https://eetom.github.io/img/hosted/pano3.jpg',
        'https://eetom.github.io/img/hosted/pano4.jpg',
        'https://eetom.github.io/img/hosted/pano5.jpg',
        'https://eetom.github.io/img/hosted/pano6.jpg',
        'https://eetom.github.io/img/hosted/pano7.jpg',
        'https://eetom.github.io/img/hosted/pano8.jpg',
        'https://eetom.github.io/img/hosted/pano9.jpg',
        'https://eetom.github.io/img/hosted/pano10.jpg',
        'https://eetom.github.io/img/hosted/pano12.jpg',
        'https://eetom.github.io/img/hosted/pano13.jpg',
        'https://eetom.github.io/img/hosted/pano14.jpg',
        'https://eetom.github.io/img/hosted/pano15.jpg',
        'https://eetom.github.io/img/hosted/pano16.jpg',
        'https://eetom.github.io/img/hosted/pano17.jpg',
        'https://eetom.github.io/img/hosted/pano18.jpg',
        'https://eetom.github.io/img/hosted/pano19.jpg',
        'https://eetom.github.io/img/hosted/pano20.jpg',
        'https://eetom.github.io/img/hosted/pano21.jpg'];

    document.getElementsByClassName('mainview')[0].style.backgroundImage = 'url(' + images[Math.floor(Math.random() * images.length)] + ')';
}

