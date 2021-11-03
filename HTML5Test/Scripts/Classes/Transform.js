export default class Transform {

	constructor(dx, dy, width, height) {
		this.X = dx;
		this.Y = dy;
		this.Width = width;
		this.Height = height;
		this.Rotation = 0;
		this.ScaleX = 1;
		this.ScaleY = 1;
	};

	Translate(x, y) {
		this.X += x;
		this.Y += y;
	}

	Rotate(r) {
		this.Rotation += r;
	}

	Resize(x, y) {
		this.ScaleX = x;
		this.ScaleY = y;
    }
};