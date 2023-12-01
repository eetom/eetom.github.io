
window.onload = function () {
// Allow for random header image

$('#footer').load('../footer.html');
$('#header').load('../header.html');

var images = [
'https://eetom.github.io/img/hosted/pano1.jpg', 
'https://eetom.github.io/img/hosted/pano2.jpg', 
'https://eetom.github.io/img/hosted/pano3.jpg', 
'https://eetom.github.io/img/hosted/pano4.jpg', 
'https://eetom.github.io/img/hosted/pano5.jpg', 
'https://eetom.github.io/img/hosted/pano6.jpg', 
'https://eetom.github.io/img/hosted/pano7.jpg'];
    
document.getElementsByClassName('mainview')[0].style.backgroundImage = 'url(' + images[Math.floor(Math.random() * images.length)] + ')';
}