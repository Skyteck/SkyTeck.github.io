import Transform from './Transform.js';

export default class Human {
	constructor(px, py, dx, dy, img) {
		this.Infected = false;
		this.Healed = false;
		this.Transform = new Transform(px, py, 4, 4);
		this.Direction = {
			X: dx,
			Y: dy
		};
		this.Speed = .2;
		this.Active = true;
		this.Texture = new Image();
		this.Texture.src = '/Content/Assets/img/diglett/' + img + '.png';
		this.TimeSinceLastHealRoll = 0;
		this.TimeSinceLastDieRoll = 0;
	};

	Update(dt) {
		if (!this.Active) {
			return;
		}
		if (this.Infected) {
			this.TimeSinceLastDieRoll += dt;
			this.TimeSinceLastHealRoll += dt;
			let percentHeal = document.querySelector('#txtHealP').value;
			if (this.TimeSinceLastHealRoll > 1000) {
				if (this.getRandomInt(100) < percentHeal) {
					this.Infected = false;
					this.Healed = true;
				}
				this.TimeSinceLastHealRoll -= 1000;
			}
			let percentDie = document.querySelector('#txtDieT').value;
			if (this.TimeSinceLastDieRoll > 1000) {
				if (this.getRandomInt(100) < percentDie) {
					this.Deactivate();
				}
				this.TimeSinceLastDieRoll -= 1000;
			}

        }
		this.Transform.X += (this.Speed * dt) * this.Direction.X;
		this.Transform.Y += (this.Speed * dt) * this.Direction.Y;

		if (this.Transform.X + 4 > 640 || this.Transform.X < 0) {
			this.Direction.X *= -1;
			if (this.Transform.X + 4 > 640) {
				this.Transform.X = 640 - 6;
			}
			else if (this.Transform.X < 0) {
				this.Transform.X = 0;
			}
		}


		if (this.Transform.Y + 4 > 640 || this.Transform.Y < 0) {
			this.Direction.Y *= -1;
			if (this.Transform.Y + 4 > 640) {
				this.Transform.Y = 640 - 6;
			}
			else if (this.Transform.Y < 0) {
				this.Transform.Y = 0;
			}
		}
	};

	Draw(ctx) {
		if (!this.Active) {
			return;
		}
		if (this.Infected) {
			ctx.fillStyle = 'rgb(69, 143, 91)';

			ctx.fillRect(this.Transform.X, this.Transform.Y, 4, 4);
		}
		else if (this.Healed) {
			ctx.fillStyle = 'rgb(69, 255, 255)';

			ctx.fillRect(this.Transform.X, this.Transform.Y, 4, 4);
        }
		else {
			ctx.drawImage(this.Texture, this.Transform.X, this.Transform.Y);
        }
		
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
		this.InfectedTime = 0;
	};

	Deactivate() {
		this.Active = false;
		this.InfectedTime = 0;
	};

	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	};
}