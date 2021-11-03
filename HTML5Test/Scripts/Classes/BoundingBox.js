export default class BoundingBox {
	x = 0;
	y = 0;
	w = 0;
	h = 0;

	constructor(x,y,w,h) {
		this.Resize(x, y, w, h);
	};

	//this.x = x;
	//this.y = y;
	//this.w = w;
	//this.h = h;
	//this.Top = this.y;
	//this.Bottom = this.y + this.h;
	//this.Left = this.x;
	//this.right = this.x + this.w;

	Contains(Point) {
		if (Point.X && Point.Y) {
			if (Point.X >= this.Left && Point.X <= this.Right && Point.Y >= this.Top && Point.Y <= this.Bottom) {
				return true;
			}
        }

		return false;
	};

	Contains(X, Y) {
		if (X && Y) {
			if (X >= this.Left && X <= this.Right && Y >= this.Top && Y <= this.Bottom) {
				return true;
			}
		}

		return false;
	};

	Draw (ctx, MyColor = 'rgb(0, 0, 0)') {
		var priorFillStyle = ctx.fillStyle;
		ctx.fillStyle = MyColor;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.fillStyle = priorFillStyle;
	};

	Update (x, y) {
		this.x = x;
		this.y = y;
	};

	Resize(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.Top = this.y;
		this.Bottom = this.y + this.h;
		this.Left = this.x;
		this.Right = this.x + this.w;
	};

	Intersects(otherBB) {
		if (otherBB.x === undefined || otherBB.x === null || otherBB.y === undefined || otherBB.y === null) {
			console.log('BoundingBox contains received invalid Point');
		}
		if (this.x < otherBB.x + otherBB.w &&
			this.x + this.w > otherBB.x &&
			this.y < otherBB.y + otherBB.h &&
			this.y + this.h > otherBB.y) {
			return true;
		}
		return false;
	};
}