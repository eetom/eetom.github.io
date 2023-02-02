// Javascript for the HexRGB

$(document).ready(function() {
	//Function to convert hex format to a rgb color
	var hex;
	function rgbify() {
		hex = $('input').val().replace('#','');
		var reg = hex.length === 3 ? hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2] : hex;
		var conv = reg.match(/.{2}/g);
		var r = parseInt(conv[0],16);
		var g = parseInt(conv[1],16);
		var b = parseInt(conv[2],16);
		var rgb = r+','+g+','+b;
		rgb = rgb.replace(/NaN/g,' undefined ');

		// displays the results and changes the bgcolor
		$('.results').text('rgb('+rgb+')');
		$('body').css('background', "#" + hex);

		// adjusts the color based on the hex
		if ((r*0.299 + g*0.587 + b*0.114) > 186) {
			$('body').css('color', "#000000");
			$('input').css('color', "#000000");
			$('.results').css('color', "#000000");
			$('input').css('border-color', "#000000");
			$('.results').css('border-color', "#000000");
		} else {
			$('body').css('color', "#ffffff");
			$('input').css('color', "#ffffff");
			$('.results').css('color', "#ffffff");
			$('input').css('border-color', "#ffffff");
			$('.results').css('border-color', "#ffffff");
		}
	}
	setInterval(rgbify,700);
});

function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).text()).select();
	document.execCommand("copy");
	$temp.remove();
};

