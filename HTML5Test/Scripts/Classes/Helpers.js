export default class Helpers {
    constructor() {

    };

	TransformLine(x1, y1, x2, y2, Rotation, Pos) {
		var one = this.getTransformedCoords(x1, y1, Rotation);
		one.X += Pos.X;
		one.Y += Pos.Y;
		var two = this.getTransformedCoords(x2, y1 + y2, Rotation);
		two.X += Pos.X;
		two.Y += Pos.Y;
		var returned = { X: one.X, Y: one.Y, EndX: two.X, EndY: two.Y };
		return returned;
	};

	getTransformedCoords(x, y, Rotation) {
		var angle = (Rotation * -1);
		var x2 = x;
		var y2 = y;
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);

		var newx = -Math.floor(x2 * cos - y2 * sin);
		var newy = Math.floor(x2 * sin + y2 * cos);
		var returned = { X: newx, Y: newy };
		return returned;
	};

	DrawLine(sx, sy, ex, ey, ctx) {
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.lineTo(ex, ey);
		ctx.stroke();
	}
}