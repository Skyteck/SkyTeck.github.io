import Transform from './Transform.js';
import Helpers from './Helpers.js';

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

	Draw(ctx) {
		ctx.translate(this.Pos.X, this.Pos.Y);
		ctx.rotate(this.Rotation);
		ctx.drawImage(this.carImg, -8, -16);
		var helper = new Helpers();
		this.FrontCam = helper.TransformLine(0, 0 + (this.Height / 2), 0, this.SightRange, this.Rotation, this.Pos);
		this.BackCam = helper.TransformLine(0, -(this.Height / 2), 0, -this.SightRange, this.Rotation, this.Pos);
		this.RightCam = helper.TransformLine((this.Width / 2), 0, this.SightRange, 0, this.Rotation, this.Pos);
		this.LeftCam = helper.TransformLine(-(this.Width / 2), 0, -this.SightRange, 0, this.Rotation, this.Pos);
		this.FrontRightCam = helper.TransformLine((this.Width / 2), (this.Height / 2), (this.DiagSightRange), this.DiagSightRange, this.Rotation, this.Pos);
		this.FrontLeftCam = helper.TransformLine(-(this.Width / 2), (this.Height / 2), -(this.DiagSightRange), this.DiagSightRange, this.Rotation, this.Pos);
		this.BackRightCam = helper.TransformLine((this.Width / 2), -(this.Height / 2), (this.DiagSightRange), -this.DiagSightRange, this.Rotation, this.Pos);
		this.BackLeftCam = helper.TransformLine(-(this.Width / 2), -(this.Height / 2), -(this.DiagSightRange), -this.DiagSightRange, this.Rotation, this.Pos);

		//DrawLine(this.BackRightCam.X, this.BackRightCam.Y, this.BackRightCam.X - (this.DiagSightRange), this.BackRightCam.Y - this.DiagSightRange);
		//DrawLine(this.BackLeftCam.X, this.BackLeftCam.Y, this.BackLeftCam.X + (this.DiagSightRange), this.BackLeftCam.Y - this.DiagSightRange);

		ctx.rotate(-this.Rotation);
		ctx.translate(-this.Pos.X, -this.Pos.Y);

		ctx.fillStyle = 'rgb(200, 0, 0)';

		ctx.fillRect(this.FrontCam.EndX, this.FrontCam.EndY, 4, 4);
		helper.DrawLine(this.FrontCam.X, this.FrontCam.Y, this.FrontCam.EndX, this.FrontCam.EndY, ctx);
		helper.DrawLine(this.BackCam.X, this.BackCam.Y, this.BackCam.EndX, this.BackCam.EndY, ctx);
		helper.DrawLine(this.LeftCam.X, this.LeftCam.Y, this.LeftCam.EndX, this.LeftCam.EndY, ctx);
		helper.DrawLine(this.FrontRightCam.X, this.FrontRightCam.Y, this.FrontRightCam.EndX, this.FrontRightCam.EndY, ctx);
		helper.DrawLine(this.FrontLeftCam.X, this.FrontLeftCam.Y, this.FrontLeftCam.EndX, this.FrontLeftCam.EndY, ctx);
		helper.DrawLine(this.BackRightCam.X, this.BackRightCam.Y, this.BackRightCam.EndX, this.BackRightCam.EndY, ctx);
		helper.DrawLine(this.BackLeftCam.X, this.BackLeftCam.Y, this.BackLeftCam.EndX, this.BackLeftCam.EndY, ctx);
		helper.DrawLine(this.RightCam.X, this.RightCam.Y, this.RightCam.EndX, this.RightCam.EndY, ctx);

	};

	Activate() {
		this.Active = true;
	};

	Deactivate() {
		this.Active = false;
	};


}