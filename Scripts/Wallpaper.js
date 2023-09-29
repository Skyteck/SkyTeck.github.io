import MouseInfo from './MouseInfo.js';

var canvas = document.getElementById('canvasWallpaper');
var ctx = canvas.getContext('2d');
var theme = 'Diglett';

var dot = new Image();

var dots = new Array();
var Mouse = new MouseInfo(canvas);
var startTimer = 0;
function Dot(px, py, dx, dy, speed, color) {

	this.Pos = {
		X: px,
		Y: py
	};
	this.Color = color;
	this.Direction = {
		X: dx,
		Y: dy
	};
	this.Speed = speed;
	this.Active = false;

	Dot.prototype.Activate = function (px, py, dx, dy, speed) {
		this.Pos = {
			X: px,
			Y: py
		};

		this.Direction = {
			X: dx,
			Y: dy
		};
		this.Active = true;
	};

	Dot.prototype.Update = function (dt) {
		//if (this.Active) {
			this.Pos.X += (speed * dt) * this.Direction.X;
		this.Pos.Y += (speed * dt) * this.Direction.Y;

		if (this.Pos.X > canvas.width || this.Pos.X < 0) {
			this.Direction.X *= -1;
		}


		if (this.Pos.Y > canvas.height || this.Pos.Y < 0) {
			this.Direction.Y *= -1;
		}
		//}
	};

	Dot.prototype.Deactivate = function () {
		this.Active = false;
	};
};

function InitWallpaper(theme) {
	dot.src = '/Content/Assets/img/' + theme + '/dot.png';
	CreateMoles(100);
	window.requestAnimationFrame(DrawGame);
}

function DrawGame(timer) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = '24px sans-serif';

	var deltaTime = timer - startTimer;

	Mouse.Update();


	for (var i = 0; i < dots.length; i++) {
		dots[i].Update(deltaTime);
		ctx.drawImage(dot, dots[i].Pos.X, dots[i].Pos.Y);

		//if (i != 0) {
		for (var j = i; j < dots.length; j++) {
				ctx.beginPath();
				var minDistance = 1;
				var distance = Math.hypot(dots[j].Pos.X - dots[i].Pos.X, dots[j].Pos.Y - dots[i].Pos.Y) / 100;
				if (minDistance - distance >= 0) {
					ctx.moveTo(dots[j].Pos.X + 2, dots[j].Pos.Y + 2);
					ctx.lineTo(dots[i].Pos.X + 2, dots[i].Pos.Y + 2);

					ctx.lineWidth = minDistance - distance;
					ctx.fillStyle = dots[i].Color;
					ctx.stroke();
                }

            }

        //}

	}
	startTimer = timer;

	window.requestAnimationFrame(DrawGame);
};

function CreateMoles(numMoles) {
	for (var i = 0; i < numMoles; i++) {

		var px = getRandomInt(canvas.width);
		var py = getRandomInt(canvas.height);
		var dx = Math.random();
		var dy = Math.random();

		var speed = 0.02;//getRandomInt(2);
		if (getRandomInt(100) % 2 == 0) {
			dx *= -1;
		}

		if (getRandomInt(100) % 2 == 0) {
			dy *= -1;
		}

		var r = getRandomInt(255);
		var g = getRandomInt(255);
		var b = getRandomInt(255);

		var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';

		var newMole = new Dot(px, py, dx, dy, speed, color);

		dots.push(newMole);
	}
};

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
};

canvas.addEventListener('mousemove', function (e) {
	Mouse.Pos = Mouse.GetMousePos(e);
});

canvas.addEventListener('mousedown', function (e) {
	Mouse.ClickStart(e, false);
});

canvas.addEventListener('mouseup', function (e) {
	Mouse.ClickEnd(e);
});

canvas.addEventListener('touchstart', function (e) {
	e.preventDefault();
	Mouse.ClickStart(e, true);
});

canvas.addEventListener('touchend', function (e) {
	Mouse.ClickEnd(e);
});



function CheckMouseHover(mousePos, theRect) {
	if (mousePos.X >= theRect.x && mousePos.X <= (theRect.x + theRect.w)) {
		if (mousePos.Y >= theRect.y && mousePos.Y <= (theRect.y + theRect.h)) {
			return true;
		}
	}
	return false;
}

export default InitWallpaper;