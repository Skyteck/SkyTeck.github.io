import BoundingBox from './Classes/BoundingBox.js';
import Transform from './Classes/Transform.js';

export default class Mole {

	constructor(dx, dy, boomTime, img) {
		this.Transform = new Transform(dx, dy, 64, 64);
		this.Active = false;
		this.WentBoom = false;
		this.BoundingBox = new BoundingBox(this.Transform.X, this.Transform.Y, this.Transform.Width, this.Transform.Height);
		this.CreateAnimation(img, boomTime);
	};

	CreateAnimation(img, boomTime) {
		this.AnimFrame = 0;
		this.FrameTime = 0;
		this.ActiveTime = 0;
		this.Frames = 8;
		this.BoomTime = boomTime;
		this.MoleFPS = this.BoomTime / this.Frames;
		this.Texture = img;
    }

	Activate() {
		this.AnimFrame = 0;
		this.FrameTime = 0;
		this.ActiveTime = 0;
		this.Active = true;
		this.WentBoom = false;
	};

	GetBoundingBox() {
		return this.BoundingBox;
    }

	Update (dt) {
		this.BoundingBox.Update(this.Transform.X, this.Transform.Y);

		this.WentBoom = false;
		if (this.Active) {
			this.ActiveTime += dt;

			if (this.ActiveTime > this.BoomTime) {
				this.Deactivate();
				this.WentBoom = true;
			}

			this.FrameTime += dt;

			if (this.FrameTime >= this.MoleFPS) {
				this.FrameTime -= this.MoleFPS;
				this.AnimFrame++;
				if (this.AnimFrame >= this.Frames) {
					this.AnimFrame = this.Frames;
				}
			}
		}
	};

	Draw(ctx) {
		ctx.drawImage(this.Texture, (this.AnimFrame * this.Transform.Width), 0, this.Transform.Width, this.Transform.Height,
						this.Transform.X, this.Transform.Y, this.Transform.Width, this.Transform.Height);
    }

	Deactivate() {
		this.Active = false;
		this.AnimFrame = 0;
		this.FrameTime = 0;
		this.ActiveTime = 0;
	};
};