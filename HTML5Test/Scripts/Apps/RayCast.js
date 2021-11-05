import MouseInfo from '../Classes/MouseInfo.js';

var canvas = document.getElementById('canvasRayCast');
var ctx = canvas.getContext('2d');

var dot = new Image();

var Mouse = new MouseInfo(canvas);
var startTimer = 0;

var TabActive = false;
var RequestID;

var Keys = new Array();


function InitRayCast(theme) {
	dot.src = '/Content/Assets/img/Diglett/dot.png';

	//RequestID = window.requestAnimationFrame(UpdateGame);
}
function UpdateGame(timer) {
	var deltaTime = timer - startTimer;
	Mouse.Update();

	startTimer = timer;


	DrawGame();
	RequestID = window.requestAnimationFrame(UpdateGame);

}

function DrawGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = '24px sans-serif';
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

	window.cancelAnimationFrame(RequestID);
});

canvas.addEventListener('touchstart', function (e) {
	e.preventDefault();
	Mouse.ClickStart(e, true);
});

canvas.addEventListener('touchend', function (e) {
	Mouse.ClickEnd(e);
});
document.getElementById('canvasRayCast').addEventListener('keypress', function (e) {
	Keys.push(e);
});

export default InitRayCast;