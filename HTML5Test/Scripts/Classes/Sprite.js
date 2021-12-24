import BoundingBox from './BoundingBox.js';
import Transform from './Transform.js';
export default class Sprite {
    constructor(x, y, img) {
        this.tex = new Image();
        this.tex.src = '/Content/Assets/img/Diglett/'+img+'.png';
        this.transform = new Transform(x, y);

        this.transform.SetDimentions(this.tex.width, this.tex.height);
    };

    UpdatePosition(x, y) {
        this.transform.Translate(x, y);
    }
    SetPosition(x, y) {
        this.transform.SetPosition(x, y);
    }

    Update(dt) {

    }

    Draw(ctx) {
        ctx.drawImage(this.tex, this.transform.X, this.transform.Y);
    }
};
