import MouseInfo from '../Classes/MouseInfo.js';
import BoundingBox from '../Classes/BoundingBox.js';
import Transform from '../Classes/Transform.js';

var canvas = document.getElementById('canvasAmazing');
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

var TabActive = true;
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
	this.CameFrom = null;
	this.prevCurrent = false;
	this.CameFromDirection = null;
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

		if (this.Seen) {
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

function InitAmazing(theme) {
	hole.src = '/Content/Assets/img/' + theme + '/Fox.png';
	for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE) {
		for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE) {
			let v = perlin.get(x, y);// * COLOR_SCALE;
			let gstr = 200;


			var xz = x / GRID_SIZE * canvas.width;
			var yz = y / GRID_SIZE * canvas.width;

			
				xz /= 10;
				yz /= 10;
				var newMole = new Tile(xz, yz, 'land');

				Tiles[xz][yz] = newMole;
		}
	}
	OrigTiles = deepCopyFunction(Tiles);


	currentTile = Tiles[getRandomInt(63)][getRandomInt(63)];
	currentTile.type = 'water';
	console.log('tiles made');
	RequestID = window.requestAnimationFrame(DrawGame);
}


var ct = null;
var et = null;

var p;
function DrawGame(timer) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (TabActive == false) {
		window.cancelAnimationFrame(RequestID);
		return;
	}
	Mouse.Update();
	var deltaTime = timer - startTimer;
	for (var i = 0; i < 64; i++) {
		for (var j = 0; j < 64; j++) {
			Tiles[i][j].Draw();
		}
	}

	startTimer = timer;

	StepMaze();

	RequestID = window.requestAnimationFrame(DrawGame);
};
let OpenTiles = new Array(); //Tiles waiting to be processed
let ProcessedTiles = new Array(); //Tiles processed
let currentTile = new Tile();
let previousTile = new Tile();
function StepMaze() {
	//get current tiles neighbors and add them to OpenTiles if they haven't been added yet
	var ElibleTiles = GetNeighborTiles(currentTile);
	var TilesAdded = TryAddToOpenTiles(ElibleTiles);
	//mark currentTile as checked
	currentTile.Seen = true;
	//choose one of the neighbors to be our next tile, if they've never been checked
	var t = ChooseRandomNeighbor(ElibleTiles);
	while (!t) {//go up the chain til we find a new neighbortile to use
		currentTile = currentTile.CameFrom; //go up a level
		ElibleTiles = GetNeighborTiles(currentTile); //get its neighbors
		t = ChooseRandomNeighbor(ElibleTiles);
	}

	if (t) { //found a new tile
		t.CameFrom = currentTile;
		if (t.CameFrom.Pos.X > t.Pos.X) {//came from the right
			t.CameFromDirection = 'right';
		}
		else if (t.CameFrom.Pos.X < t.Pos.X) {//came from the left
			t.CameFromDirection = 'left';
		}
		if (t.CameFrom.Pos.Y > t.Pos.Y) {//came from the right
			t.CameFromDirection = 'down';
		}
		else if (t.CameFrom.Pos.Y < t.Pos.Y) {//came from the left
			t.CameFromDirection = 'up';
		}
		currentTile = t;
    }
}

function GetNeighborTiles(t) {
	var ta = new Array();
	var x = t.Pos.X;
	var y = t.Pos.Y;
	if (x != 0) {
		var t = Tiles[x - 1][y];
		ta.push(t);
	}
	if (x != 63) {
		var t = Tiles[x + 1][y];
		ta.push(t);
	}
	if (y != 0) {
		var t = Tiles[x][y - 1];
		ta.push(t);
	}
	if (y != 63) {
		var t = Tiles[x][y + 1];
		ta.push(t);
	}
	return ta;
}

function ChooseRandomNeighbor(et) {
	var argh = new Array();
	for (var i = 0; i < et.length; i++) {
		if (et[i].Seen == false) {
			argh.push(et[i]);
        }
	}

	if (argh.length > 0) {
		var r = getRandomInt(argh.length);
		return argh[r];
    }
}

function TryAddToOpenTiles(et) {
	var a = 0;
	for (var i = 0; i < et.length; i++) {
		if (!OpenTiles.includes(et[i])) {
			et[i].type = 'hit';
			OpenTiles.push(et[i]);
			a++;
		}
	}
	return a;
}
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
};



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

document.querySelector('#amazing-tab').addEventListener('shown.bs.tab', function (e) {
	TabActive = true;
	RequestID = window.requestAnimationFrame(DrawGame);
});
document.querySelector('#amazing-tab').addEventListener('hide.bs.tab', function (e) {
	TabActive = false;
});


export default InitAmazing;