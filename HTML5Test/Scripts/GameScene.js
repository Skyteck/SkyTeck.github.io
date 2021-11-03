import Mole from './Mole.js';
import MouseInfo from './Classes/MouseInfo.js';
var Mouse = new MouseInfo(canvas);
var NextScene = null;
var Settings;
var hole = new Image();
var livesImg = new Image();
var GameOver = new Image();

var startTimer;

var countDown = 3000;

var MoleSpawnTimer = 2000;
var moles = new Array();

var errorTimer = 0;

var ErrorSpot =
{
	X: -1,
	Y: -1
};
export default class GameScene {

	constructor(m, S) {
		this.Name = "Game";
		this.Active = false;

		Settings = S;
		Mouse = m;
	};

	Init() {
		this.Active = true;
		this.bg = new Image();
		this.bg.src = '/Content/Assets/img/' + 'Diglett' + '/bg.png';
		hole.src = '/Content/Assets/img/' + theme + '/hole.png';
		livesImg.src = '/Content/Assets/img/' + theme + '/lives.png';
		GameOver.src = '/Content/Assets/img/' + theme + '/GameOver.png';



		if (mode === "Medium") {
			Settings.Difficulty = "Medium";
			Settings.Punish = 90;
			Settings.holesPerRow = 3;
			Settings.holes = 9;
			Settings.XBuffer = 60;
			Settings.YBuffer = 120;
			Settings.Moles = 2;
			Settings.BoomTime = 3500;
			Settings.MoleMinTime = 0;
			Settings.MoleTimerStart = 1000;
			Settings.MaxLives = 3;
			Settings.CurrentLives = 3;
			Settings.TimeLimit = 60 * 1000;
			Settings.CurrentTime = 0;
		}
		else if (mode === "Hard") {
			Settings.Difficulty = "Hard";
			Settings.Punish = 140;
			Settings.holesPerRow = 3;
			Settings.holes = 9;
			Settings.XBuffer = 60;
			Settings.YBuffer = 120;
			Settings.Moles = 3;
			Settings.BoomTime = 1500;
			Settings.MoleMinTime = 0;
			Settings.MoleTimerStart = 1000;
			Settings.MaxLives = 3;
			Settings.CurrentLives = 3;
			Settings.TimeLimit = 60 * 1000;
			Settings.CurrentTime = 0;
		}
		else if (mode === "Uber") {
			Settings.Difficulty = "Uber";
			Settings.Punish = 200;
			Settings.holesPerRow = 4;
			Settings.holes = 16;
			Settings.XBuffer = 30;
			Settings.YBuffer = 60;
			Settings.Moles = 5;
			Settings.BoomTime = 3500;
			Settings.MoleMinTime = 300;
			Settings.MoleTimerStart = 1500;
			Settings.MaxLives = 3;
			Settings.CurrentLives = 3;
			Settings.TimeLimit = 6000000;
			Settings.CurrentTime = 0;
		}

		countDown = 1000;
		Settings.ActiveMoles = 0;
		moles.length = 0;
		Settings.GameOver = false;
		Settings.score = 0;
		CreateMoles(Settings.holes);
		Settings.CurrentShowGameOver = Settings.HowLongShowGameOver;


	};

	Update(dt) {
		var deltaTime = timer - startTimer;

		if (countDown >= 0) {
			countDown -= deltaTime;
		}
		Mouse.Update();
		if (Settings.Started) {

			ActivateMole(deltaTime);
		}

		if (countDown <= 0 && !Settings.Started) {
			Settings.Started = true;
		}

		for (var i = 0; i < moles.length; i++) {
			var currentMole = moles[i];
			if (!Settings.GameOver) {
				currentMole.Update(deltaTime);
				var MoleRect = currentMole.GetBoundingBox();

				if (Mouse.justClicked) {
					if (MoleRect.Contains(Mouse.Pos)) {
						if (currentMole.Active) {
							Settings.score += 1;
							currentMole.Deactivate();
							Settings.ActiveMoles--;
						}
						else {
							Settings.score -= 2;
							errorTimer = 1000;
							ErrorSpot.X = currentMole.Transform.X;
							ErrorSpot.Y = currentMole.Transform.Y;
							if (Settings.score < 0) {
								Settings.score = 0;
							}
						}
					}
				}
			}
		}


		if (currentMole.WentBoom) {
			GameSettings.CurrentLives--;
			GameSettings.ActiveMoles--;

		}

		if (!Settings.GameOver) {
			window.requestAnimationFrame(DrawGame);
		}
		else {
			if (Settings.CurrentShowGameOver <= 0) {
				InitGameOver();
			}
			else {
				ctx.drawImage(GameOver, 0, 0);
				Settings.CurrentShowGameOver -= deltaTime;
				window.requestAnimationFrame(DrawGame);
			}
		}
		startTimer = timer;
	};

	Draw(ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgb(200, 200, 200)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(this.bg, 0, 0);
		ctx.fillStyle = 'rgb(0, 0, 0)';
		if (Settings.Started) {

			if (Settings.Difficulty !== "Uber") {
				if (!Settings.GameOver) {
					Settings.CurrentTime += deltaTime;
					var TimeLeft = Math.floor((Settings.TimeLimit - Settings.CurrentTime) / 1000);
					ctx.fillText(TimeLeft, 140, 30);
					if (TimeLeft <= 0) {
						Boom();
					}
				}
			}
			else if (Settings.Difficulty === "Uber") {
				DrawLives();
			}
		}


		for (var i = 0; i < moles.length; i++) {
			var currentMole = moles[i];
			currentMole.Draw(ctx);
		}

		if (errorTimer > 0) {
			var priorStyle = ctx.fillStyle;
			ctx.fillStyle = 'rgb(255, 0, 0)';
			ctx.font = '48px sans-serif';
			ctx.fillText("-2", ErrorSpot.X, ErrorSpot.Y);
			ctx.fillStyle = priorStyle;
			errorTimer -= dt;
		}
	};

	ActivateMole(deltaTime) {
		MoleSpawnTimer -= deltaTime;
		if (MoleSpawnTimer <= 0) {
			MakeMole();

			var delay = Settings.MoleTimerStart - (Settings.Punish * Settings.score);
			if (delay <= Settings.MoleMinTime) {
				delay = Settings.MoleMinTime;
			}
			MoleSpawnTimer = delay;
		}
	}

	MakeMole() {
		if (Settings.ActiveMoles == Settings.holes) {
			return;
		}
		var newMole = getRandomInt(Settings.holes);
		var tries = 0;
		var moleFound = true;
		while (moles[newMole].Active && tries < 6) {
			newMole = getRandomInt(Settings.holes);
			tries++;
			if (tries >= 6) {
				moleFound = false;
			}
		}

		if (moleFound) {
			moles[newMole].Activate();
		}

		Settings.ActiveMoles++;
	};

	DrawLives() {
		if (GameSettings.CurrentLives <= 0) {
			Boom();
		}
		var drawn = 0;
		for (var i = 0; i < (GameSettings.MaxLives - GameSettings.CurrentLives); i++) {
			ctx.drawImage(livesImg, 64, 0, 64, 64, (64 * drawn) + 60, 0, 64, 64);
			drawn++;
		}
		for (var i = 0; i < GameSettings.CurrentLives; i++) {
			ctx.drawImage(livesImg, 0, 0, 64, 64, (64 * drawn) + 60, 0, 64, 64);
			drawn++;
		}
	}

	CreateMoles(numMoles) {
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

	Boom() {
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

	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	};

	Deactivate() {
		this.Active = false;
		this.bg = null;
	};
};