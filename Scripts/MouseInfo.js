export default class MouseInfo {

	constructor(canv) {
		this.Pos =
		{
			X: -1,
			Y: -1
		};
		this.Click = false;
		this.RightClick = false;
		this.clickedLastFrame = false;
		this.RightclickedLastFrame = false;
		this.justClicked = false;
		this.rightClicked = false;
		this.canvas = canv;
	};

	Update() {
		if (this.Click) {
			if (!this.clickedLastFrame) {
				this.justClicked = true;
			}
			else {
				this.justClicked = false;
			}
			this.clickedLastFrame = true;
		}

		if (this.RightClick) {
			if (!this.RightclickedLastFrame) {
				this.rightClicked = true;
			}
			else {
				this.rightClicked = false;
			}
			this.RightclickedLastFrame = true;
		}
	};

	RightClickStart(e, touch) {
		if (touch) {
			this.Pos = this.GetMousePos(e.changedTouches[0]);
		}
		else {
			this.Pos = this.GetMousePos(e);
		}

		this.RightClick = true;
	};

	RightClickEnd(e) {
		this.RightClick = false;
		this.RightclickedLastFrame = false;
	};

	ClickStart(e, touch) {
		if (touch) {
			this.Pos = this.GetMousePos(e.changedTouches[0]);
		}
		else {
			this.Pos = this.GetMousePos(e);
		}

		this.Click = true;
	};

	ClickEnd(e) {
		this.Click = false;
		this.clickedLastFrame = false;
	};

	GetMousePos(e) {
		var r = this.canvas.getBoundingClientRect();
		return {
			X: e.clientX - r.left,
			Y: e.clientY - r.top
		};
	};
};