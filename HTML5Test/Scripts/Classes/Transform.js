export default class Transform {



	constructor(dx, dy) {
		this.X = dx;
		this.Y = dy;
		this.Width = 0;
		this.Height = 0;
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

	SetPosition(x, y) {
		this.X = x;
		this.Y = y;
	}

	SetDimentions(w, h) {
		this.Width = w;
		this.Height = h;
    }
};