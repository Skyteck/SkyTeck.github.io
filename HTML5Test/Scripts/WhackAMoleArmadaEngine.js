import Mole from './Mole.js';
import MouseInfo from './Classes/MouseInfo.js';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var theme = 'Diglett';

var hole = new Image();
var bg = new Image();
var livesImg = new Image();
var MenuLabels = new Image();
var GameOverLabels = new Image();
var GameOver = new Image();

var startTimer;

var countDown = 3000;

var MoleSpawnTimer = 2000;
var moles = new Array();
var Mouse = new MouseInfo(canvas);
var errorTimer = 0;
var ErrorSpot =
{
	X: -1,
	Y: -1
};
var GameSettings =
{
	holes: 9,
	score: 0,
	holesPerRow: 3,
	Punish: 50,
	Started: false,
	XBuffer: 60,
	YBuffer: 60,
	Moles: 1,
	BoomTime: 1500,
	ActiveMoles: 0,
	MoleMinTime: 2500,
	MoleTimerStart: 2500,
	Difficulty: "Easy",
	EasyScore: 0,
	MedScore: 0,
	HardScore: 0,
	UberScore: 0,
	GameOver: false,
	MaxLives: 3,
	CurrentLives: 3,
	TimeLimit: 60000,
	CurrentTime: 0,
	HowLongShowGameOver: 4 * 1000,
	CurrentShowGameOver: 4 * 1000
};

function InitCanvas(theme) {
	hole.src = '/Content/Assets/img/' + theme + '/hole.png';
	bg.src = '/Content/Assets/img/' + theme + '/bg.png';
	livesImg.src = '/Content/Assets/img/' + theme + '/lives.png';
	MenuLabels.src = '/Content/Assets/img/' + theme + '/MenuLabels.png';
	GameOverLabels.src = '/Content/Assets/img/' + theme + '/GameOverLabels.png';
	GameOver.src = '/Content/Assets/img/' + theme + '/GameOver.png';
	InitMainMenu();

}

function InitMainMenu() {
	var score = localStorage.getItem("EasyMode");
	if (score === null) {
		GameSettings.EasyScore = 0;
		localStorage.setItem("EasyMode", 0);
	}
	else {
		GameSettings.EasyScore = score;
	}
	score = localStorage.getItem("MediumMode");
	if (score === null) {
		GameSettings.MedScore = 0;
		localStorage.setItem("MediumMode", 0);
	}
	else {
		GameSettings.MedScore = score;
	}
	score = localStorage.getItem("HardMode");
	if (score === null) {
		GameSettings.HardScore = 0;
		localStorage.setItem("HardMode", 0);
	}
	else {
		GameSettings.HardScore = score;
	}
	score = localStorage.getItem("UberMode");
	if (score === null) {
		GameSettings.UberScore = 0;
		localStorage.setItem("UberMode", 0);
	}
	else {
		GameSettings.UberScore = score;
	}
	window.requestAnimationFrame(DrawIntro);

};

function InitGame(mode) {

	if (mode === "Easy") {
		GameSettings.Difficulty = "Easy";
		GameSettings.Punish = 60;
		GameSettings.holesPerRow = 2;
		GameSettings.holes = 4;
		GameSettings.XBuffer = 90;
		GameSettings.YBuffer = 120;
		GameSettings.Moles = 1;
		GameSettings.BoomTime = 3500;
		GameSettings.MoleMinTime = 0;
		GameSettings.MoleTimerStart = 1000;
		GameSettings.MaxLives = 3;
		GameSettings.CurrentLives = 3;
		GameSettings.TimeLimit = 20 * 1000;
		GameSettings.CurrentTime = 0;
	}
	else if (mode === "Medium") {
		GameSettings.Difficulty = "Medium";
		GameSettings.Punish = 90;
		GameSettings.holesPerRow = 3;
		GameSettings.holes = 9;
		GameSettings.XBuffer = 60;
		GameSettings.YBuffer = 120;
		GameSettings.Moles = 2;
		GameSettings.BoomTime = 3500;
		GameSettings.MoleMinTime = 0;
		GameSettings.MoleTimerStart = 1000;
		GameSettings.MaxLives = 3;
		GameSettings.CurrentLives = 3;
		GameSettings.TimeLimit = 60 * 1000;
		GameSettings.CurrentTime = 0;
	}
	else if (mode === "Hard") {
		GameSettings.Difficulty = "Hard";
		GameSettings.Punish = 140;
		GameSettings.holesPerRow = 3;
		GameSettings.holes = 9;
		GameSettings.XBuffer = 60;
		GameSettings.YBuffer = 120;
		GameSettings.Moles = 3;
		GameSettings.BoomTime = 1500;
		GameSettings.MoleMinTime = 0;
		GameSettings.MoleTimerStart = 1000;
		GameSettings.MaxLives = 3;
		GameSettings.CurrentLives = 3;
		GameSettings.TimeLimit = 60 * 1000;
		GameSettings.CurrentTime = 0;
	}
	else if (mode === "Uber") {
		GameSettings.Difficulty = "Uber";
		GameSettings.Punish = 200;
		GameSettings.holesPerRow = 4;
		GameSettings.holes = 16;
		GameSettings.XBuffer = 30;
		GameSettings.YBuffer = 60;
		GameSettings.Moles = 5;
		GameSettings.BoomTime = 3500;
		GameSettings.MoleMinTime = 300;
		GameSettings.MoleTimerStart = 1500;
		GameSettings.MaxLives = 3;
		GameSettings.CurrentLives = 3;
		GameSettings.TimeLimit = 6000000;
		GameSettings.CurrentTime = 0;
	}

	countDown = 1000;
	GameSettings.ActiveMoles = 0;
	moles.length = 0;
	GameSettings.GameOver = false;
	GameSettings.score = 0;
	CreateMoles(GameSettings.holes);
	GameSettings.CurrentShowGameOver = GameSettings.HowLongShowGameOver;

	window.requestAnimationFrame(DrawGame);
};

function InitGameOver() {
	window.requestAnimationFrame(DrawGameOver);
}

function DrawIntro(timer) {

	DrawBG();
	ctx.drawImage(MenuLabels, 0, 0);
	ctx.fillStyle = 'rgb(0, 0, 0)';
	var RectToMeasure = ctx.measureText('Easy');
	var EasyRect = { x: 94, y: 50 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width + 10, h: RectToMeasure.actualBoundingBoxAscent + 15 };

	RectToMeasure = ctx.measureText('Medium');
	var MediumRect = { x: 58, y: 121 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width + 45, h: RectToMeasure.actualBoundingBoxAscent + 15 };


	RectToMeasure = ctx.measureText('Hard');
	var HardRect = { x: 82, y: 195 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width + 45, h: RectToMeasure.actualBoundingBoxAscent + 15 };

	RectToMeasure = ctx.measureText('Uber');
	var UberRect = { x: 88, y: 275 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width + 45, h: RectToMeasure.actualBoundingBoxAscent + 15 };

	ctx.font = '48px sans-serif';

	Mouse.Update();
	if (CheckMouseHover(Mouse.Pos, EasyRect)) {
		if (Mouse.justClicked) {
			startTimer = timer;
			InitGame("Easy");
			return;
		}
	}

	if (CheckMouseHover(Mouse.Pos, MediumRect)) {
		if (Mouse.justClicked) {
			startTimer = timer;
			InitGame("Medium");
			return;
		}
	}

	if (CheckMouseHover(Mouse.Pos, HardRect)) {
		if (Mouse.justClicked) {
			startTimer = timer;
			InitGame("Hard");
			return;
		}
	}

	if (CheckMouseHover(Mouse.Pos, UberRect)) {
		if (Mouse.justClicked) {
			startTimer = timer;
			InitGame("Uber");
			return;
		}
	}
	window.requestAnimationFrame(DrawIntro);
};

function DrawGame(timer) {
	DrawBG();
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = '24px sans-serif';

	var deltaTime = timer - startTimer;

	if (countDown >= 0) {
		countDown -= deltaTime;
	}
	Mouse.Update();
	if (GameSettings.Started) {

		ActivateMole(deltaTime);

		if (GameSettings.Difficulty !== "Uber") {
			if (!GameSettings.GameOver) {
				DrawCountDown(deltaTime);
			}
		}
		else if (GameSettings.Difficulty === "Uber") {
			DrawLives();
		}
	}

	if (countDown <= 0 && !GameSettings.Started) {
		GameSettings.Started = true;
	}

	for (var i = 0; i < moles.length; i++) {
		DrawMole(i, deltaTime);
	}
	DrawError(deltaTime);
	if (!GameSettings.GameOver) {
		window.requestAnimationFrame(DrawGame);
	}
	else {
		if (GameSettings.CurrentShowGameOver <= 0) {
			InitGameOver();
		}
		else {
			ctx.drawImage(GameOver, 0, 0);
			GameSettings.CurrentShowGameOver -= deltaTime;
			window.requestAnimationFrame(DrawGame);
		}
	}
	startTimer = timer;
};

function DrawGameOver(timer) {
	DrawBG();
	ctx.drawImage(GameOverLabels, 0, 0);
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = '48px sans-serif';
	Mouse.Update()
	var RectToMeasure = ctx.measureText('Try Again?');
	var MediumRect = { x: 30, y: 175 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width + 25, h: RectToMeasure.actualBoundingBoxAscent + 15 };


	RectToMeasure = ctx.measureText('Menu');
	var HardRect = { x: 84, y: 247 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width + 20, h: RectToMeasure.actualBoundingBoxAscent + 15 };

	ctx.fillText(GameSettings.score, 220, 69);
	ctx.font = '24px sans-serif';

	var score = localStorage.getItem(GameSettings.Difficulty + "Mode");
	ctx.fillText(score, 220, 105);
	if (CheckMouseHover(Mouse.Pos, MediumRect)) {
		if (Mouse.Click) {
			startTimer = timer;
			InitGame(GameSettings.Difficulty);
			return;
		}
	}

	if (CheckMouseHover(Mouse.Pos, HardRect)) {
		if (Mouse.Click) {
			startTimer = timer;
			InitMainMenu();
			return;
		}
	}

	window.requestAnimationFrame(DrawGameOver);
};

function DrawBG() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bg, 0, 0);
}

function DrawError(dt) {
	if (errorTimer > 0) {
		var priorStyle = ctx.fillStyle;
		ctx.fillStyle = 'rgb(255, 0, 0)';
		ctx.font = '48px sans-serif';
		ctx.fillText("-2", ErrorSpot.X, ErrorSpot.Y);
		ctx.fillStyle = priorStyle;
		errorTimer -= dt;
	}

}

function DrawMole(i, deltaTime) {
	var currentMole = moles[i];
	if (!GameSettings.GameOver) {
		currentMole.Update(deltaTime);
		var MoleRect = currentMole.GetBoundingBox();

		if (Mouse.justClicked) {
			if (MoleRect.Contains(Mouse.Pos)) {
				if (currentMole.Active) {
					GameSettings.score += 1;
					currentMole.Deactivate();
					GameSettings.ActiveMoles--;
				}
				else {
					GameSettings.score -= 2;
					errorTimer = 1000;
					ErrorSpot.X = currentMole.Transform.X;
					ErrorSpot.Y = currentMole.Transform.Y;
					if (GameSettings.score < 0) {
						GameSettings.score = 0;
					}
				}
			}
		}
	}
	if (currentMole.WentBoom) {
		GameSettings.CurrentLives--;
		GameSettings.ActiveMoles--;

	}
	currentMole.Draw(ctx);
}

function DrawLives() {
	if (GameSettings.CurrentLives <= 0) {
		Boom();
	}
	var drawn = 0;
	for (var i = 0; i < (GameSettings.MaxLives - GameSettings.CurrentLives); i++) {
		ctx.drawImage(livesImg, 64, 0, 64, 64, (64 * drawn) + 60, 0, 64, 64);
		drawn++;
		if (drawn >= GameSettings.MaxLives) {
			return;
        }
	}
	for (var i = 0; i < GameSettings.CurrentLives; i++) {
		ctx.drawImage(livesImg, 0, 0, 64, 64, (64 * drawn) + 60, 0, 64, 64);
		drawn++;
	}
}

function DrawCountDown(deltaTime) {
	GameSettings.CurrentTime += deltaTime;
	var TimeLeft = Math.floor((GameSettings.TimeLimit - GameSettings.CurrentTime) / 1000);
	ctx.fillText(TimeLeft, 140, 30);
	if (TimeLeft <= 0) {
		Boom();
	}
}

function ActivateMole(deltaTime) {
	MoleSpawnTimer -= deltaTime;
	if (MoleSpawnTimer <= 0) {
		MakeMole();

		var delay = GameSettings.MoleTimerStart - (GameSettings.Punish * GameSettings.score);
		if (delay <= GameSettings.MoleMinTime) {
			delay = GameSettings.MoleMinTime;
		}
		MoleSpawnTimer = delay;
	}
}

function CreateMoles(numMoles) {
	var ColNum = 0;
	var RowNum = 0;
	var HoleNum = 0;
	for (var i = 0; i < numMoles; i++) {

		var dx = (ColNum * 64) + GameSettings.XBuffer;
		var dy = (RowNum * 64) + GameSettings.YBuffer;
		var newMole = new Mole(dx, dy, GameSettings.BoomTime, hole);

		moles.push(newMole);

		ColNum++;
		if (ColNum >= GameSettings.holesPerRow) {
			ColNum = 0;
			RowNum++;
		}
	}
};

function Boom() {

	if (GameSettings.Difficulty === "Easy" && GameSettings.score > GameSettings.EasyScore) {
		localStorage.setItem("EasyMode", GameSettings.score);
	}
	else if (GameSettings.Difficulty === "Medium" && GameSettings.score > GameSettings.MedScore) {
		localStorage.setItem("MediumMode", GameSettings.score);
	}
	else if (GameSettings.Difficulty === "Hard" && GameSettings.score > GameSettings.HardScore) {
		localStorage.setItem("HardMode", GameSettings.score);
	}
	else if (GameSettings.Difficulty === "Uber" && GameSettings.score > GameSettings.UberScore) {
		localStorage.setItem("UberMode", GameSettings.score);
	}
	GameSettings.GameOver = true;
	return;
}

function MakeMole() {
	if (GameSettings.ActiveMoles == GameSettings.holes) {
		return;
	}
	var newMole = getRandomInt(GameSettings.holes);
	var tries = 0;
	var moleFound = true;
	while (moles[newMole].Active && tries < 6) {
		newMole = getRandomInt(GameSettings.holes);
		tries++;
		if (tries >= 6) {
			moleFound = false;
		}
	}

	if (moleFound) {
		moles[newMole].Activate();
	}

	GameSettings.ActiveMoles++;
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

export default InitCanvas;