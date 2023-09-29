
import BoundingBox from './BoundingBox.js';
import MouseInfo from './MouseInfo.js';
var Mouse = new MouseInfo(canvas);
var NextScene = null;
var Settings;
export default class MainMenuScene {

	constructor(m, S) {
		this.Name = "MainMenu";
		this.Active = false;

		Settings = S;
		Mouse = m;
	};

	Init() {
		this.Active = true;
		this.bg = new Image();
		this.MenuLabels = new Image();
		this.bg.src = '/Content/Assets/img/' + 'Diglett' + '/bg.png';
		this.MenuLabels.src = '/Content/Assets/img/' + 'Diglett' + '/MenuLabels.png';

	};

	Update(dt) {
		var EasyRect = new BoundingBox(94, 15, 116, 50 );
		var MediumRect = new BoundingBox(58, 86, 215, 50 );
		var HardRect = new BoundingBox( 82, 160, 149, 50 );
		var UberRect = new BoundingBox(88, 240, 149, 50 );

		Mouse.Update();

		if (EasyRect.Contains(Mouse.Pos)) {
			if (Mouse.justClicked) {
				Settings.Difficulty = "Easy";
				Settings.Punish = 60;
				Settings.holesPerRow = 2;
				Settings.holes = 4;
				Settings.XBuffer = 90;
				Settings.YBuffer = 120;
				Settings.Moles = 1;
				Settings.BoomTime = 3500;
				Settings.MoleMinTime = 0;
				Settings.MoleTimerStart = 1000;
				Settings.MaxLives = 3;
				Settings.CurrentLives = 3;
				Settings.TimeLimit = 20 * 1000;
				Settings.CurrentTime = 0;
				this.NextScene = "Game";
				return;
			}
		}

		if (MediumRect.Contains(Mouse.Pos)) {
			if (Mouse.justClicked) {
				InitGame("Medium");
				return;
			}
		}

		if (HardRect.Contains(Mouse.Pos)) {
			if (Mouse.justClicked) {
				InitGame("Hard");
				return;
			}
		}

		if (UberRect.Contains(Mouse.Pos)) {
			if (Mouse.justClicked) {
				InitGame("Uber");
				return;
			}
		}
	};

	Draw(ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgb(200, 200, 200)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(this.bg, 0, 0);
		ctx.drawImage(this.MenuLabels, 0, 0);
		ctx.fillStyle = 'rgb(0, 0, 0)';
		
	};

	Deactivate() {
		this.Active = false;
		this.bg = null;
		this.MenuLabels = null;
	};
};