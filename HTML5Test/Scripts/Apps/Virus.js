import MouseInfo from '../Classes/MouseInfo.js';
import Human from '../Classes/Human.js';

var canvas = document.getElementById('canvasVirus');
var ctx = canvas.getContext('2d');
var theme = 'Diglett';

var dot = new Image();

var dots = new Array();
var Mouse = new MouseInfo(canvas);
var startTimer = 0;
var stringLength = 10;
var ShowDots = true;
var TabActive = true;
var RequestID;

let deadFound = 0;

let HealedFound = 0;
function InitVirus(theme) {
	dot.src = '/Content/Assets/img/' + theme + '/dot.png';
	RequestID = window.requestAnimationFrame(UpdateGame);
	let numHumans = document.querySelector('#txtHumans').value;
	let percentVirus = document.querySelector('#txtVPercent').value;
	for (var i = 0; i < numHumans; i++) {
		let x = getRandomInt(canvas.width - 1);
		let y = getRandomInt(canvas.height - 1);
		let dx = getRandomInt(100) / 100;
		let dy = getRandomInt(100) / 100;
		if (getRandomInt(100) % 2 == 1) {
			dx *= -1;
		}
		if (getRandomInt(100) % 2 == 1) {
			dy *= -1;
		}

		let h = new Human(x, y, dx, dy, 'dot');
		if (getRandomInt(100) < percentVirus) {
			h.Infected = true;
		}
		dots.push(h);
    }

}

function UpdateGame(timer) {
	var deltaTime = timer - startTimer;
	deadFound = 0;
	HealedFound = 0;
	if (TabActive == false) {
		window.cancelAnimationFrame(RequestID);
		return;
	}
	Mouse.Update();
	let minDistance = document.querySelector('#txtSpreadDist').value;
	let percentVirus = document.querySelector('#txtVSpreadP').value;
	for (var i = 0; i < dots.length; i++) {
		if (!dots[i].Active) {
			deadFound++;
			continue;
		}
		if (dots[i].Healed) {
			HealedFound++;
        }
		dots[i].Update(deltaTime);

		//if (i != 0) {
		for (var j = 0; j < dots.length; j++) {
			if (!dots[j].Active || dots[j].Healed) {
				continue;
			}
			
			var distance = Math.hypot(dots[j].Transform.X - dots[i].Transform.X, dots[j].Transform.Y - dots[i].Transform.Y);
			if (distance < minDistance && dots[i].Infected) {

				if (getRandomInt(100) < percentVirus) {
					dots[j].Infected = true;
                }
				
			}

		}
	}

	startTimer = timer;



	DrawGame();

	RequestID = window.requestAnimationFrame(UpdateGame);

}

function DrawGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = '24px sans-serif';


	let y = 0;
	let x = 0;

	for (var i = 0; i < HealedFound; i++) {
		ctx.fillStyle = 'rgb(0, 255, 255)';
		if (x > 640) {
			y += 4;
			x = 0;
		}

		ctx.fillRect(x, y, 4, 4);
		x += 4;
	}

	for (var i = 0; i < deadFound; i++) {
		ctx.fillStyle = 'rgb(0, 0, 0)';
		if (x >  640) {
			y += 4;
			x = 0;
		}
        
			ctx.fillRect(x, y, 4, 4);
			x += 4;
	}
	for (var i = 0; i < dots.length; i++) {
		dots[i].Draw(ctx);
	}
};

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
};

canvas.addEventListener('mousemove', function (e) {
	Mouse.Pos = Mouse.GetMousePos(e);
});

canvas.addEventListener('mousedown', function (e) {
	e.preventDefault();
	canvas.focus();
	if (e.button == 2) {
		Mouse.RightClickStart(e);

	} else {
		Mouse.ClickStart(e, false);

	}
});

canvas.addEventListener('mouseup', function (e) {

	e.preventDefault();
	if (e.button == 2) {

		Mouse.RightClickEnd(e);

	} else {
		Mouse.ClickEnd(e);

	}
});
document.querySelector('#Virus-tab').addEventListener('shown.bs.tab', function (e) {
	RequestID = window.requestAnimationFrame(UpdateGame);
	canvas.focus();
});
document.querySelector('#Virus-tab').addEventListener('hide.bs.tab', function (e) {
	console.log("Hide Virus");


	window.cancelAnimationFrame(RequestID);
});

canvas.addEventListener('touchstart', function (e) {
	e.preventDefault();
	Mouse.ClickStart(e, true);
});

canvas.addEventListener('touchend', function (e) {
	Mouse.ClickEnd(e);
});
document.getElementById('canvasVirus').addEventListener('keypress', function (e) {

});

$('#btnApplyVirus').click(function () {
	dots = new Array();
	let numHumans = document.querySelector('#txtHumans').value;
	let percentVirus = document.querySelector('#txtVPercent').value;
	for (var i = 0; i < numHumans; i++) {
		let x = getRandomInt(canvas.width - 1);
		let y = getRandomInt(canvas.height - 1);
		let dx = getRandomInt(100) / 100;
		let dy = getRandomInt(100) / 100;
		if (getRandomInt(100) % 2 == 1) {
			dx *= -1;
		}
		if (getRandomInt(100) % 2 == 1) {
			dy *= -1;
		}

		let h = new Human(x, y, dx, dy, 'dot');
		if (getRandomInt(100) < percentVirus) {
			h.Infected = true;
		}
		dots.push(h);
	}
});

function CheckMouseHover(mousePos, theRect) {
	if (mousePos.X >= theRect.x && mousePos.X <= (theRect.x + theRect.w)) {
		if (mousePos.Y >= theRect.y && mousePos.Y <= (theRect.y + theRect.h)) {
			return true;
		}
	}
	return false;
}

export default InitVirus;