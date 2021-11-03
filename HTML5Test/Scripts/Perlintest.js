import MouseInfo from './Classes/MouseInfo.js';
import BoundingBox from './Classes/BoundingBox.js';
import Transform from './Classes/Transform.js';

var canvas = document.getElementById('canvasPerlin');
var ctx = canvas.getContext('2d');
var theme = 'Diglett';
var RequestID;

var Mouse = new MouseInfo(canvas);
var hole = new Image();
var dot = new Image();

var dots = new Array();
var Mouse = new MouseInfo(canvas);
var startTimer = 0;

const GRID_SIZE = 4;
const RESOLUTION = 16;
const COLOR_SCALE = 0.25;

var TabActive = false;
let pixel_size = canvas.width / RESOLUTION;
let num_pixels = GRID_SIZE / RESOLUTION;
var Tiles = Array.from(Array(GRID_SIZE * RESOLUTION), () => new Array(GRID_SIZE * RESOLUTION));
var Foxes = new Array();
var OrigTiles = new Array();
function Tile(x, y, type) {
	this.Pos = {
		X: x,
		Y: y
	}
	this.BoundingBox = new BoundingBox(this.Pos.X, this.Pos.Y, 10, 10);
	this.type = type;
	this.Seen = false;
	this.Distance = 999999;
	this.GScore = 0;
	this.FScore = 0;
	this.Closest = null;
	Tile.prototype.Draw = function () {
		if (this.type == 'water') {
			ctx.fillStyle = 'rgb(0,0,' + 150 + ')';
		}
		else if (this.type == 'land') {
			ctx.fillStyle = 'rgb(0,' + 150 + ',0)';

		}
		else if (this.type == 'hit') {
			ctx.fillStyle = 'rgb(255,0,0)';
		}
		else if (this.type == 'start') {
			ctx.fillStyle = 'rgb(255,0,255)';
		}
		else if (this.type == 'end') {
			ctx.fillStyle = 'rgb(255,255,0)';

		} else if (this.type == 'path') {
			ctx.fillStyle = 'rgb(255,255,255)';

		}
		ctx.fillRect(
			this.Pos.X * 10,
			this.Pos.Y * 10,
			10,
			10
		);
	}
}

function Fox(x, y) {
	this.Pos = {
		X: x,
		Y: y
	}
	this.BoundingBox = new BoundingBox(this.Pos.X, this.Pos.Y, 10, 10);
	this.Path = new Array();
	this.Destination = { X: getRandomInt(63), Y: getRandomInt(63) }
	this.TilePos = { X: 0, Y: 0 }
	this.pathIndex = 0;
	Fox.prototype.Update = function (dt) {
		this.TilePos.X = Math.floor(this.Pos.X / 10);
		this.TilePos.Y = Math.floor(this.Pos.Y / 10);
		if (this.Path.length <= 0 || this.Path == null) {
			while (this.Path.length <= 0) {
				this.GetDestination();
				this.Path = AStar(this.TilePos, this.Destination);
			}
		}
		if ((this.Path[this.pathIndex].Pos.X * 10) > this.Pos.X) {
			this.Pos.X += 1;
		}
		else if ((this.Path[this.pathIndex].Pos.X * 10) < this.Pos.X) {
			this.Pos.X -= 1;
		}
		if ((this.Path[this.pathIndex].Pos.Y * 10) > this.Pos.Y) {
			this.Pos.Y += 1;
		}
		else if ((this.Path[this.pathIndex].Pos.Y * 10) < this.Pos.Y) {
			this.Pos.Y -= 1;
		}

		if (this.Pos.X == (this.Path[this.pathIndex].Pos.X * 10) && this.Pos.Y == (this.Path[this.pathIndex].Pos.Y * 10)) {
			this.pathIndex++;
			if (this.pathIndex == this.Path.length) {
				this.Path = new Array();
				while (this.Path.length <= 0) {
					this.GetDestination();
					this.Path = AStar(this.TilePos, this.Destination);
				}

				this.pathIndex = 0;
			}
		}
	}
	Fox.prototype.GetDestination = function () {
		this.Destination.X = getRandomInt(60) + 1;
		this.Destination.Y = getRandomInt(60) + 1;
		if (Tiles[this.Destination.X][this.Destination.Y].type == "Water") {
			this.GetDestination();

		}
	}
	Fox.prototype.Draw = function () {


		//for (var i = 0; i < this.Path.length; i++) {
		//	ctx.fillStyle = 'rgb(155,155,155)';
		//	ctx.fillRect(
		//		this.Path[i].Pos.X*10,
		//		this.Path[i].Pos.Y * 10,
		//		10,
		//		10
		//	);
		//}

		ctx.fillStyle = 'rgb(155,75,0)';
		ctx.fillRect(
			this.Pos.X,
			this.Pos.Y,
			10,
			10
		);
	}
}

function InitPerlin(theme) {
	hole.src = '/Content/Assets/img/' + theme + '/Fox.png';
	for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE) {
		for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE) {
			let v = perlin.get(x, y);// * COLOR_SCALE;
			let gstr = 200;


			var xz = x / GRID_SIZE * canvas.width;
			var yz = y / GRID_SIZE * canvas.width;

			if (v < -0.15) {
				xz /= 10;
				yz /= 10;
				var newMole = new Tile(xz, yz, 'water');
				Tiles[xz][yz] = newMole;
			}
			else {
				xz /= 10;
				yz /= 10;
				var newMole = new Tile(xz, yz, 'land');

				Tiles[xz][yz] = newMole;
			}
		}
	}
	OrigTiles = deepCopyFunction(Tiles);
	for (var i = 0; i < 3; i++) {
		var x = getRandomInt(60) + 1;
		var y = getRandomInt(60) + 1;
		while (Tiles[x][y].type == 'water') {

			var x = getRandomInt(60) + 1;
			var y = getRandomInt(60) + 1;
		}
		var foxy = new Fox(x, y);
		Foxes.push(foxy);
	}


	console.log('tiles made');
	//RequestID = window.requestAnimationFrame(DrawGame);
}


var ct = null;
var et = null;

var p;
function DrawGame(timer) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	Mouse.Update();
	var deltaTime = timer - startTimer;
	for (var i = 0; i < 64; i++) {
		for (var j = 0; j < 64; j++) {

			Tiles[i][j].Draw();
		}
	}



	for (var i = 0; i < Foxes.length; i++) {
		Foxes[i].Update(deltaTime);
		Foxes[i].Draw();
	}

	startTimer = timer;


		RequestID = window.requestAnimationFrame(DrawGame);
};

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
};

canvas.addEventListener('mousemove', function (e) {
	Mouse.Pos = Mouse.GetMousePos(e);
});

canvas.addEventListener('mousedown', function (e) {
	e.preventDefault();
	console.log(e);
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

canvas.addEventListener('touchstart', function (e) {
	e.preventDefault();
	Mouse.ClickStart(e, true);
});

canvas.addEventListener('touchend', function (e) {
	Mouse.ClickEnd(e);
});

const deepCopyFunction = (inObject) => {
	let outObject, value, key

	if (typeof inObject !== "object" || inObject === null) {
		return inObject // Return the value if inObject is not an object
	}

	// Create an array or object to hold the values
	outObject = Array.isArray(inObject) ? [] : {}

	for (key in inObject) {
		value = inObject[key]

		// Recursively (deep) copy for nested objects, including arrays
		outObject[key] = deepCopyFunction(value)
	}

	return outObject
}


function AStar(startPos, EndPos) {
	Tiles = deepCopyFunction(OrigTiles);
	var openTiles = new Array();
	var closedTiles = new Array();
	var path = new Array();
	var currentTile = Tiles[startPos.X][startPos.Y];
	var EndTile = Tiles[EndPos.X][EndPos.Y];
	if (currentTile === EndTile) {
		return new Array();;
	}
	var scanRange = 160;
	do {
		currentTile.Draw(ctx);
		if (!(currentTile.Pos.X - 1 < 0)) {
			var newTile = Tiles[currentTile.Pos.X - 1][currentTile.Pos.Y];
			CheckTile(openTiles, closedTiles, newTile, EndTile, currentTile);
		}
		//tile top
		if (!(currentTile.Pos.Y - 1 < 0)) {
			newTile = Tiles[currentTile.Pos.X][currentTile.Pos.Y - 1];
			CheckTile(openTiles, closedTiles, newTile, EndTile, currentTile);
		}
		//tile right
		if (!(currentTile.Pos.X + 1 > 63)) {
			var newTile = Tiles[currentTile.Pos.X + 1][currentTile.Pos.Y];
			CheckTile(openTiles, closedTiles, newTile, EndTile, currentTile);
		}
		//tile bottom
		if (!(currentTile.Pos.Y + 1 > 63)) {
			newTile = Tiles[currentTile.Pos.X][currentTile.Pos.Y + 1];
			CheckTile(openTiles, closedTiles, newTile, EndTile, currentTile);
		}
		openTiles.sort((a, b) => a.FScore - b.FScore);
		closedTiles.push(currentTile);
		currentTile = openTiles.shift();
		scanRange--;
	} while ((currentTile != EndTile) && openTiles.length > 0 && scanRange > 0);
	if (scanRange == 0) {
		return new Array();
	}
	path.push(EndTile);
	currentTile = EndTile.Closest;
	var breakOut = false;
	while (breakOut || currentTile.Pos.X != startPos.X || currentTile.Pos.Y != startPos.Y) {
		path.push(currentTile);
		if (currentTile.Closest == null) {
			breakOut = true;
		}
		else {
			currentTile = currentTile.Closest ?? Tiles[startPos.X][startPos.Y];
		}

	}

	return path.reverse();
}


document.querySelector('#perlin-tab').addEventListener('shown.bs.tab', function (e) {
	console.log("Show perlin");
	RequestID = window.requestAnimationFrame(DrawGame);
});
document.querySelector('#perlin-tab').addEventListener('hide.bs.tab', function (e) {
	console.log("Hide perlin");

	window.cancelAnimationFrame(RequestID);
});

function CheckTile(openTiles, closedTiles, newTile, EndTile, currentTile) {
	if (!closedTiles.includes(newTile)) {
		if (!openTiles.includes(newTile)) {
			if (newTile.type != "water") {
				newTile.Distance = Math.hypot(newTile.Pos.X - EndTile.Pos.X, newTile.Pos.Y - EndTile.Pos.Y);
				newTile.GScore = currentTile.GScore + 1;
				newTile.FScore = newTile.Distance + newTile.GScore;
				if (newTile.Closest == null || newTile.Closest.FScore > currentTile.FScore || newTile.Closest == newTile) {
					newTile.Closest = currentTile;
				}
				//newTile.type = "hit";
				openTiles.push(newTile);
			}
		}
	}
}



export default InitPerlin;