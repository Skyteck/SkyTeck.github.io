import MouseInfo from './Classes/MouseInfo.js';

var canvas = document.getElementById('canvasString');
var ctx = canvas.getContext('2d');
var theme = 'Diglett';

var dot = new Image();

var dots = new Array();
var Mouse = new MouseInfo(canvas);
var startTimer = 0;
var stringLength = 10;
var ShowDots = true;
var TabActive = false;
var RequestID;
class Dot {
	constructor(px, py, dx, dy, speed) {
		this.Pinned = false;
		this.followMouse = false;
		this.Kids = new Array();
		this.Parents = new Array();
		this.Pos = {
			X: px,
			Y: py
		};
		this.Direction = {
			X: dx,
			Y: dy
		};
		this.Speed = speed;
		this.Active = false;
	};

	RemoveKid(p) {
		for (var i = 0; i < this.Kids.length; i++) {
			if (this.Kids[i] === p) {
				this.Kids.splice(i, 1);
				break;
			}
		}
	}

	RemoveParents() {
		for (var i = 0; i < this.Parents.length; i++) {
			this.Parents[i].RemoveKid(this);
		}
		this.Parents.splice(0, this.Parents.length);
	}
	AddParent(k) {
		var pFound = false;
		for (var i = 0; i < this.Parents.length; i++) {
			if (this.Parents[i] === k) {
				pFound = true;
			}
		}
		if (!pFound) {
			this.Parents.push(k);
		}
	}
	AddKid(k) {
		var KidFound = false;
		for (var i = 0; i < this.Kids.length; i++) {
			if (this.Kids[i] == k) {
				KidFound = true;
			}
		}
		if (!KidFound) {
			this.Kids.push(k);
		}
	}
	Update(dt, Mouse) {
		if (this.followMouse) {
			if (Mouse.RightClick == false) {
				this.followMouse = false;

				//loop through dots to find ones close enough to tether to
				for (var i = 0; i < dots.length; i++) {
					if (dots[i] === this) {
						continue;
					}
				}

			}
			else {
				this.Pos.X = Mouse.Pos.X;
				this.Pos.Y = Mouse.Pos.Y;
			}
		}
		else if (!this.Pinned) {
			var g = document.querySelector('#cbGravity');
			var stringLengthtxt = document.querySelector('#txtStrLength');
			var gravPow = document.querySelector('#txtGrav');
			var pullStre = document.querySelector('#txtPullStr').value;
			if (g.checked) {
				this.Pos.Y += (gravPow.value * dt)
			}
			var speed = 0.01;
			for (var i = 0; i < this.Parents.length; i++) {
				var myradians = Math.atan2(this.Parents[i].Pos.Y - this.Pos.Y, this.Parents[i].Pos.X - this.Pos.X)
				this.Direction.Y = Math.sin(myradians);
				this.Direction.X = Math.cos(myradians);
				var distance = Math.hypot(this.Parents[i].Pos.X - this.Pos.X, this.Parents[i].Pos.Y - this.Pos.Y);
				if ((distance) >= stringLengthtxt.value) {
					this.Pos.Y += (speed * dt) * (this.Direction.Y * (distance * pullStre));
					this.Pos.X += (speed * dt) * (this.Direction.X * (distance * pullStre));
				}
			}
		}
	};

	Draw(ctx) {
		if (ShowDots) {
			if (this.Pinned) {
				ctx.fillStyle = 'rgb(0, 255, 255)';
			}
			else if (this.Parents.length == 0) {
				ctx.fillStyle = 'rgb(255, 255, 0)';
			}
			else {
				ctx.fillStyle = 'rgb(255, 0, 0)';
			}
			ctx.fillStyle = this.color;
			ctx.fillRect(this.Pos.X, this.Pos.Y, 4, 4);
		}


		for (var i = 0; i < this.Parents.length; i++) {

			var distance = Math.hypot(this.Parents[i].Pos.X - this.Pos.X, this.Parents[i].Pos.Y - this.Pos.Y);
			ctx.beginPath();
			ctx.moveTo(this.Pos.X + 2, this.Pos.Y + 2);
			ctx.lineTo(this.Parents[i].Pos.X + 2, this.Parents[i].Pos.Y + 2);

			ctx.lineWidth = 1;//distance / 50;
			ctx.strokeStyle = "#FF0000";
			ctx.stroke();
		}
		//ctx.beginPath();
		//var stringLengthtxt = document.querySelector('#txtStrLength').value;
		//ctx.arc(this.Pos.X + 2, this.Pos.Y + 2, stringLengthtxt * 5, 0, 2 * Math.PI);
		//ctx.stroke();
	};

	Activate(px, py, dx, dy, speed) {
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

	Deactivate() {
		this.Active = false;
	};
}

function InitCloth(theme) {
	dot.src = '/Content/Assets/img/' + theme + '/dot.png';
	CreateMoles(10);
	RequestID = window.requestAnimationFrame(UpdateGame);
}

function UpdateGame(timer) {
	var deltaTime = timer - startTimer;

	Mouse.Update();

	if (Mouse.justClicked) {
		var newMole = new Dot(Mouse.Pos.X, Mouse.Pos.Y, 0, 0.2, 0.02);
		for (var i = 0; i < dots.length; i++) {
			var distance = Math.hypot(Mouse.Pos.X - dots[i].Pos.X, Mouse.Pos.Y - dots[i].Pos.Y);
			var stringLengthtxt = document.querySelector('#txtStrLength').value;
			if (distance <= stringLengthtxt * 5) {
				newMole.AddParent(dots[i]);
				dots[i].AddKid(newMole);
			}
		}
		dots.push(newMole);
	}

	if (Mouse.rightClicked) {
		for (var i = 0; i < dots.length; i++) {
			var distance = Math.hypot(Mouse.Pos.X - dots[i].Pos.X, Mouse.Pos.Y - dots[i].Pos.Y);
			if (distance < 4) {

				dots[i].followMouse = true;
				dots[i].RemoveParents();
				break;
			}
		}
	}

	for (var i = 0; i < dots.length; i++) {
		dots[i].Update(deltaTime, Mouse);
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


	for (var i = 0; i < dots.length; i++) {
		dots[i].Draw(ctx);


	}

	//window.requestAnimationFrame(UpdateGame);
};

function CreateMoles(numMoles) {
	for (var i = 0; i < numMoles; i++) {

	}
	var px = 50 + (10 * i);//getRandomInt(canvas.width);
	var py = 50;//getRandomInt(canvas.height);
	var dx = 0;//Math.random();
	var dy = 0.2;//Math.random();

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
	var newMole = new Dot(px, py, dx, dy, speed, null);
	var prevMole = newMole;
	dots.push(newMole);

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
document.querySelector('#cloth-tab').addEventListener('shown.bs.tab', function (e) {
	RequestID = window.requestAnimationFrame(UpdateGame);
});
document.querySelector('#cloth-tab').addEventListener('hide.bs.tab', function (e) {
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
document.getElementById('canvasString').addEventListener('keypress', function (e) {
	if (e.key == " ") {
		var newMole = new Dot(Mouse.Pos.X, Mouse.Pos.Y, 0, 0.2, 0.02);
		for (var i = 0; i < dots.length; i++) {
			var distance = Math.hypot(Mouse.Pos.X - dots[i].Pos.X, Mouse.Pos.Y - dots[i].Pos.Y);
			var stringLengthtxt = document.querySelector('#txtStrLength').value;
			if (distance <= stringLengthtxt * 5) {
				newMole.AddParent(dots[i]);
				dots[i].AddKid(newMole);
			}
		}
		newMole.Pinned = true;
		dots.push(newMole);
	}

	if (e.key == "y") {
		ShowDots = !ShowDots;
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

export default InitCloth;