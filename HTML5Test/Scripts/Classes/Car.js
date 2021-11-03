import Transform from './Transform.js';

export default class Car {
	constructor(px, py, dx, dy, speed) {
		this.carImg = new Image();
		this.carImg.src = '/Content/Assets/img/Diglett/Car.png';
		this.Pos = {
			X: px,
			Y: py
		};
		this.Direction = {
			X: dx,
			Y: dy
		};
		this.Rotation
		this.Height = 32;
		this.Width = 16;
		this.Speed = speed;
		this.Active = false;
		this.FrontCam = {
			X: 0,
			Y: (this.Height / 2),
			EndX: 0,
			EndY: 0
		}
		this.BackCam = {
			X: 0,
			Y: -(this.Height / 2),
			EndX: 0,
			EndY: 0
		}
		this.RightCam = {
			X: -(this.Width / 2),
			Y: 0,
			EndX: 0,
			EndY: 0
		}
		this.LeftCam = {
			X: (this.Width / 2),
			Y: 0,
			EndX: 0,
			EndY: 0
		}

		this.FrontRightCam = {
			X: -(this.Width / 2),
			Y: (this.Height / 2),
			EndX: 0,
			EndY: 0
		}
		this.FrontLeftCam = {
			X: (this.Width / 2),
			Y: (this.Height / 2),
			EndX: 0,
			EndY: 0
		}
		this.BackRightCam = {
			X: -(this.Width / 2),
			Y: -(this.Height / 2),
			EndX: 0,
			EndY: 0
		}
		this.BackLeftCam = {
			X: (this.Width / 2),
			Y: -(this.Height / 2),
			EndX: 0,
			EndY: 0
		}
		this.Rotation = 0;
		this.idk = { X: 0, Y: 0 }
		this.SightRange = 60;

		this.DiagSightRange = (this.SightRange * (0.4142135624 * 1.414213));
	};

	Update(dt) {
		this.Direction.Y = Math.cos(this.Rotation);
		this.Direction.X = -Math.sin(this.Rotation);

		this.Pos.Y += (this.Speed * dt) * (this.Direction.Y);
		this.Pos.X += (this.Speed * dt) * (this.Direction.X);


		//for (var i = 0; i < Boxes.length; i++) {
		//	if (Boxes[i].Contains(this.FrontCam.EndX, this.FrontCam.EndY)) {
		//		Stop();
		//	}
		//}
	};

	Stop() {
		this.Pos.Y -= (this.Speed * dt) * (this.Direction.Y);
		this.Pos.X -= (this.Speed * dt) * (this.Direction.X);
		this.Speed = 0;
	}

	TransformLine(x1, y1, x2, y2) {
		var one = this.getTransformedCoords(x1, y1, this.Rotation);
		one.X += this.Pos.X;
		one.Y += this.Pos.Y;
		var two = this.getTransformedCoords(x2, y1 + y2, this.Rotation);
		two.X += this.Pos.X;
		two.Y += this.Pos.Y;
		var returned = { X: one.X, Y: one.Y, EndX: two.X, EndY: two.Y };
		return returned;
	}

	Draw(ctx) {
		ctx.translate(this.Pos.X, this.Pos.Y);
		ctx.rotate(this.Rotation);
		ctx.drawImage(this.carImg, -8, -16);
		this.FrontCam = this.TransformLine(0, 0 + (this.Height / 2), 0, this.SightRange);
		this.BackCam = this.TransformLine(0, -(this.Height / 2), 0, -this.SightRange);
		this.RightCam = this.TransformLine((this.Width / 2), 0, this.SightRange, 0);
		this.LeftCam = this.TransformLine(-(this.Width / 2), 0, -this.SightRange, 0);
		this.FrontRightCam = this.TransformLine((this.Width / 2), (this.Height / 2), (this.DiagSightRange), this.DiagSightRange);
		this.FrontLeftCam = this.TransformLine(-(this.Width / 2), (this.Height / 2), -(this.DiagSightRange), this.DiagSightRange);
		this.BackRightCam = this.TransformLine((this.Width / 2), -(this.Height / 2), (this.DiagSightRange), -this.DiagSightRange);
		this.BackLeftCam = this.TransformLine(-(this.Width / 2), -(this.Height / 2), -(this.DiagSightRange), -this.DiagSightRange);

		//DrawLine(this.BackRightCam.X, this.BackRightCam.Y, this.BackRightCam.X - (this.DiagSightRange), this.BackRightCam.Y - this.DiagSightRange);
		//DrawLine(this.BackLeftCam.X, this.BackLeftCam.Y, this.BackLeftCam.X + (this.DiagSightRange), this.BackLeftCam.Y - this.DiagSightRange);

		ctx.rotate(-this.Rotation);
		ctx.translate(-this.Pos.X, -this.Pos.Y);

		ctx.fillStyle = 'rgb(200, 0, 0)';

		ctx.fillRect(this.FrontCam.EndX, this.FrontCam.EndY, 4, 4);
		this.DrawLine(this.FrontCam.X, this.FrontCam.Y, this.FrontCam.EndX, this.FrontCam.EndY, ctx);
		this.DrawLine(this.BackCam.X, this.BackCam.Y, this.BackCam.EndX, this.BackCam.EndY, ctx);
		this.DrawLine(this.LeftCam.X, this.LeftCam.Y, this.LeftCam.EndX, this.LeftCam.EndY, ctx);
		this.DrawLine(this.FrontRightCam.X, this.FrontRightCam.Y, this.FrontRightCam.EndX, this.FrontRightCam.EndY, ctx);
		this.DrawLine(this.FrontLeftCam.X, this.FrontLeftCam.Y, this.FrontLeftCam.EndX, this.FrontLeftCam.EndY, ctx);
		this.DrawLine(this.BackRightCam.X, this.BackRightCam.Y, this.BackRightCam.EndX, this.BackRightCam.EndY, ctx);
		this.DrawLine(this.BackLeftCam.X, this.BackLeftCam.Y, this.BackLeftCam.EndX, this.BackLeftCam.EndY, ctx);
		this.DrawLine(this.RightCam.X, this.RightCam.Y, this.RightCam.EndX, this.RightCam.EndY, ctx);

	};

	Activate() {
		this.Active = true;
	};

	Deactivate() {
		this.Active = false;
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