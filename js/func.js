// variables
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$slide1 = $("#slide1");
	var offsetX = $slide1.width() / 2;
	var offsetY = $slide1.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#slide1").width();
    gardenCanvas.height = $("#slide1").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	$("#content").css("width", $slide1.width() + $("#code").width());
	$("#content").css("height", Math.max($slide1.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
		} else {
			angle += 0.2;
		}
	}, interval);
}

function getDaysInMonth(month) {
	var data = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return data[month];
}

function timeElapse(date) {
	var current = new Date();
	var years = NaN;
	var months = NaN;
	var days = NaN;
	var hours = NaN;
	var minutes = NaN;
	var seconds = NaN;
	seconds = current.getSeconds() - date.getSeconds();
	if (seconds < 0) {
		seconds += 60;
		current.setMinutes(current.getMinutes() - 1);
	}
	minutes = current.getMinutes() - date.getMinutes();
	if (minutes < 0) {
		minutes += 60;
		current.setHours(current.getHours() - 1);
	}
	hours = current.getHours() - date.getHours();
	if (hours < 0) {
		hours += 24;
		current.setDate(current.getDate() - 1);
	}

	days = current.getDate() - date.getDate();
	if (days < 0) {
		days += getDaysInMonth(current.getMonth());
		current.setDate(current.getDate() - 1);
	}
	months = current.getMonth() - date.getMonth();
	if (months < 0) {
		months += 12;
		current.setYear(current.getFullYear() - 1);
	}
	years = current.getFullYear() - date.getFullYear();


	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = (years > 0 ? "<span class=\"digit\">" + years + "</span> 年 ":"")
	result += (months > 0 ? "<span class=\"digit\">" + months + "</span> 月 ":"");
	result += "<span class=\"digit\">" + days + "</span> 日 ";
	result += "<span class=\"digit\">" + hours + "</span> 小时 "
	result += "<span class=\"digit\">" + minutes + "</span> 分 "
	result += "<span class=\"digit\">" + seconds + "</span> 秒";
	
	$("#elapseClock").html(result);
}

var tl = new Array(
	"Boy I = new Boy(\"YZM\");",
	"Girl U = new Girl(\"SWJ\");",
	"",
	"while (true) { ",
	"	I.Love(U);",
	"};",
	" //让 爱 永 真"
);
var speed = 50;
var index = 0; 
text_pos = 0;
var str_length = tl[0].length;
var contents, row;
 
function type_text()
{
	contents='';
	row = Math.max(0,index-7);
	while(row < index)
	{
    	contents += tl[row++] + '\r\n';
	}
	document.getElementById("code").innerHTML = contents + tl[index].substring(0,text_pos) + "_";
	if(text_pos++==str_length)
	{
		text_pos=0;
   		index++;
		if(index!=tl.length)
      	{
       		str_length=tl[index].length;
            setTimeout("type_text()",500);
		}
		else
			setTimeout($("#img3").fadeIn(1000),1000);
	} 
	else
		setTimeout("type_text()",speed);
}
