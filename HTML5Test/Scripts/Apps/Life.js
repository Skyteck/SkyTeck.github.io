import MouseInfo from '../Classes/MouseInfo.js';
import Cell from '../Classes/Life/Cell.js';

var canvas = document.getElementById('canvasLife');
var ctx = canvas.getContext('2d');
var Mouse = new MouseInfo(canvas);
var RequestID;
var startTimer = 0;


let Cells = new Array();
var ticks = 0;
var endgame = false;
let CopiedCells = new Array();
let resets = 0;
let InRange = 0;
let OutRange = 0;
function InitLife(theme) {
	//dot.src = '/Content/Assets/img/Diglett/dot.png';

	RequestID = window.requestAnimationFrame(UpdateGame);

	for (var i = 0; i < 6000; i++) {
		Cells.push(new Cell(320, 320, 'cell'));
    }
}
function UpdateGame(timer) {
	var deltaTime = timer - startTimer;
	Mouse.Update();
	if (!endgame) {
		startTimer = timer;
		for (var i = 0; i < Cells.length; i++) {
			Cells[i].Update(deltaTime);
			var distance = Math.hypot(320 - Cells[i].transform.X, 320 - Cells[i].transform.Y);
			//if (Cells[i].transform.X < 500) {
			//	OutRange++;;
			//}
			//else {
			//	InRange++;
   //         }
			if (distance <= 20) {
				InRange++;
			}
			else {
				OutRange++;
            }
		}
	}
	if (ticks >= 3000) {
		endgame = true;
		for (var i = 0; i < Cells.length; i++) {
			var distance = Math.hypot(320 - Cells[i].transform.X, 320 - Cells[i].transform.Y);
			if (distance > 40) {
				Cells[i].Active = false;
			}
			//if (Cells[i].transform.X < 500) {
			//	Cells[i].Active = false;
   //         }
		}
	}
	if (endgame) {
		CopiedCells = new Array();
		Cells.sort((a, b) => (Math.hypot(320 - a.transform.X, 320 - a.transform.Y) > Math.hypot(320 - b.transform.X, 320 - b.transform.Y)) ? -1 : 1);



		for (var i = 0; i < Cells.length; i++) {
			if (Cells[i].Active) {
				let c = new Cell(320, 320, 'cell');
				c.Replicate(Cells[i]);
				CopiedCells.push(c);
				CopiedCells.push(Cells[i]);
				if (CopiedCells.length > 3000) {
					console.log(Cells[0].LeftChance + ' Left');
					console.log(Cells[0].RightChance + ' Right');
					console.log(Cells[0].UpChance + ' Up');
					console.log(Cells[0].DownChance + ' Down');
					console.log(Cells[0].StayStill + ' Still');
					break;
                }
            }
		}
		Cells = new Array();
		for (var i = 0; i < CopiedCells.length; i++) {
			CopiedCells[i].SetPosition(320, 320);
			Cells.push(CopiedCells[i]);
		}
		endgame = false;
		resets++;
		ticks = 0;
    }

	DrawGame();
	RequestID = window.requestAnimationFrame(UpdateGame);
	ticks++;
	InRange = 0;
	OutRange = 0;

	if (Cells.length <= 0) {
		Cells = new Array();
		for (var i = 0; i < 6000; i++) {
			Cells.push(new Cell(320, 320, 'cell'));
		}
	}
}

function DrawGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = '8px sans-serif';

	for (var i = 0; i < Cells.length; i++) {
		Cells[i].Draw(ctx);
	}

	ctx.beginPath();
	ctx.arc(320, 320, 20, 0, 2 * Math.PI);
	ctx.stroke();

	//ctx.beginPath();
	//ctx.moveTo(500, 0);
	//ctx.lineTo(500, 640);

	//ctx.lineWidth = 1;//distance / 50;
	//ctx.strokeStyle = "#FF0000";
	//ctx.stroke();

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = '12px sans-serif';
	ctx.fillText(InRange + ' In', 10, 10);

	ctx.fillText(OutRange + ' Out', 50, 50);
	let left = 3000 - ticks;
	ctx.fillText('Ticks left: ' + left, 70, 70);
};



export default InitLife;