import MouseInfo from './Classes/MouseInfo.js';
import BoundingBox from './Classes/BoundingBox.js';
import Car from './Classes/Car.js';

var canvas = document.getElementById('canvasVroom');
var ctx = canvas.getContext('2d');
var theme = 'Diglett';

var dot = new Image();
var myCarImg = new Image();

var dots = new Array();
var Mouse = new MouseInfo(canvas);
var startTimer = 0;

var TabActive = true;
var RequestID;
var Keys = new Array();
var Boxes = new Array();

let myCar = new Car(250, 250, 0.5, 0.5, 0);

var endFrontCam = {
	X: 0,
	Y: 0
};
function InitVroom(theme) {
	dot.src = '/Content/Assets/img/' + theme + '/dot.png';

	Boxes.push(new BoundingBox(0, -2, canvas.width, 6));
	Boxes.push(new BoundingBox(-2, 0, 6, canvas.height));
	Boxes.push(new BoundingBox(0, canvas.height-4, canvas.width, 8));
	Boxes.push(new BoundingBox(canvas.width-4, 0, 8, canvas.height));

	RequestID = window.requestAnimationFrame(UpdateGame);
}
function DrawLine(sx, sy, ex, ey) {
	ctx.beginPath();
	ctx.moveTo(sx, sy);
	ctx.lineTo(ex, ey);
	ctx.stroke();
}
function getTransformedCoords(x, y) {
	var angle = (myCar.Rotation * -1);
	var x2 = x;
	var y2 = y;
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);

	var newx = -Math.floor(x2 * cos - y2 * sin);
	var newy = Math.floor(x2 * sin + y2 * cos);
	var returned = { X: newx, Y: newy };
	return returned;
}
function UpdateGame(timer) {
	var deltaTime = timer - startTimer;
	Mouse.Update();
	for (var i = 0; i < Keys.length; i++) {
		var key = Keys.pop();
		if (key.key == "a") {
			myCar.Rotation -= 0.18;
			//if (myCar.Rotation < -0.1) {
			//	myCar.Rotation = -0.1;
			//}
		}
		else if (key.key == "d") {
			myCar.Rotation += 0.18;
			//if (myCar.Rotation > 0.2) {
			//	myCar.Rotation = 0.2;
			//}
		}

		if (key.key == "w") {
			myCar.Speed += 0.2;
			if (myCar.Speed > 0.4) {
				myCar.Speed = 0.4;
			}
		}
		else if (key.key == "s") {
			myCar.Speed -= 0.2;
			if (myCar.Speed < -0.2) {
				myCar.Speed = -0.2;
			}
		}
		if (key.key == " ") {
			myCar.Speed = 0;
        }

    }
	myCar.Update(deltaTime);

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
	myCar.Draw(ctx);
	endFrontCam.X = myCar.FrontCam.X;
	endFrontCam.X = myCar.FrontCam.Y + myCar.SightRange;
	for (var i = 0; i < Boxes.length; i++) {
		Boxes[i].Draw(ctx);
    }
};

function CreateMoles(numMoles) {


};

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
};

canvas.addEventListener('mousemove', function (e) {
	Mouse.Pos = Mouse.GetMousePos(e);
});

canvas.addEventListener('mousedown', function (e) {
	e.preventDefault();
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
document.querySelector('#vroom-tab').addEventListener('shown.bs.tab', function (e) {
	RequestID = window.requestAnimationFrame(UpdateGame);
});
document.querySelector('#vroom-tab').addEventListener('hide.bs.tab', function (e) {
	console.log("Hide Cloth");


	window.cancelAnimationFrame(RequestID);
});

canvas.addEventListener('touchstart', function (e) {
	e.preventDefault();
	Mouse.ClickStart(e, true);
});

canvas.addEventListener('touchend', function (e) {
	Mouse.ClickEnd(e);
});
document.getElementById('canvasVroom').addEventListener('keypress', function (e) {
	Keys.push(e);
});
function rotateAndPaintImage(context, image, angleInRad, positionX, positionY, axisX, axisY) {

}
function CheckMouseHover(mousePos, theRect) {
	if (mousePos.X >= theRect.x && mousePos.X <= (theRect.x + theRect.w)) {
		if (mousePos.Y >= theRect.y && mousePos.Y <= (theRect.y + theRect.h)) {
			return true;
		}
	}
	return false;
}

export default InitVroom;