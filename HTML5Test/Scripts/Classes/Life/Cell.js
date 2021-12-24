import Sprite from "../Sprite.js";
import Helper from "../../Helpers/Helpers.js";

let Help = new Helper();
export default class Cell extends Sprite {
    constructor(x, y, img) {
        super(x, y, img);
        this.UpChance = Help.getRandomInt(20);
        this.DownChance = Help.getRandomInt(20) + this.UpChance;
        this.LeftChance = Help.getRandomInt(20) + this.DownChance;
        this.RightChance = Help.getRandomInt(20) + this.LeftChance;
        this.StayStill = Help.getRandomInt(20) + this.RightChance;
        //console.log("Expected:")
        //console.log((this.UpChance/this.StayStill)*100 + '% Up');
        //console.log(((this.DownChance - this.UpChance) / this.StayStill) * 100 + '% Down');
        //console.log(((this.LeftChance - this.DownChance) / this.StayStill) * 100 + '% LEft');
        //console.log(((this.RightChance - this.LeftChance) / this.StayStill) * 100 + '% Right');
        //console.log(((this.StayStill - this.RightChance) / this.StayStill) * 100 + '% Still');
        //console.log('---------------')
        this.ticks = 0;
        this.upHits = 0;
        this.DownHits = 0;
        this.RightHits = 0;
        this.LeftHits = 0;
        this.Stillhits = 0;
        this.Active = true;
        this.Stunned = 0;
    };

    Update(dt) {
        if (this.Active) {
            
            this.ticks++;
            if (this.Stunned > 0) {
                this.Stunned--;
            }
            else {
                var i = Help.getRandomInt(this.StayStill+1);
                if (i <= this.UpChance) {
                    this.upHits++;
                    if (this.transform.Y - 1 > 0) {
                        this.transform.Translate(0, -1);
                    }
                }
                else if (i <= this.DownChance) {
                    this.DownHits++;
                    if (this.transform.Y + 1 < 640) {
                        this.transform.Translate(0, 1);
                    }

                }
                else if (i <= this.LeftChance) {
                    this.LeftHits++;
                    if (this.transform.X - 1 > 0) {
                        this.transform.Translate(-1, 0);
                    }
                }
                else if (i <= this.RightChance) {
                    this.RightHits++;
                    if (this.transform.X + 1 < 640) {
                        this.transform.Translate(1, 0);
                    }
                }
                else if(i <= this.StayStill) {
                    //stuns for 4 ticks
                    this.Stunned = 10;
                    this.Stillhits++;
                }
            }

            //if (this.ticks % 600 == 0) {
            //    console.log((this.upHits / this.ticks) * 100 + '% Up');
            //    console.log((this.DownHits / this.ticks) * 100 + '% Down');
            //    console.log((this.LeftHits / this.ticks) * 100 + '% Left');
            //    console.log((this.RightHits / this.ticks) * 100 + '% Right');
            //    console.log((this.Stillhits / this.ticks) * 100 + '% Still');
            //    console.log('---------------');
            //}

        }
    }

    Draw(ctx) {
        if (this.Active) {
            ctx.drawImage(this.tex, this.transform.X, this.transform.Y);
        }
    }

    Replicate(c) {
        this.UpChance = c.UpChance;
        this.DownChance = c.DownChance;
        this.LeftChance = c.LeftChance;
        this.RightChance = c.RightChance;
        this.StayStill = c.StayStill;
        var mutateAmt = Help.getRandomInt(10);
        if (Help.getRandomInt(100) <= 20) {
            if (Help.getRandomInt(100) % 2 == 0) {
                mutateAmt *= -1;
            }
            else {
                mutateAmt = -10;
            }

            var mutate = Help.getRandomInt(5);
            if (mutate == 0) {
                this.UpChance += mutateAmt;
               // console.log('UpChance ' + mutateAmt);
                if (this.UpChance < 0) {
                    this.UpChance = 0;
                }
            }
            else if (mutate == 1) {
                this.DownChance += mutateAmt;
                //console.log('DownChance ' + mutateAmt);
                if (this.DownChance < 0) {
                    this.DownChance = 0;
                }
            } else if (mutate == 2) {
                this.LeftChance += mutateAmt;
                //console.log('LeftChance ' + mutateAmt);
                if (this.LeftChance < 0) {
                    this.LeftChance = 0;
                }
            } else if (mutate == 3) {
                this.RightChance += mutateAmt;
                //console.log('RightChance ' + mutateAmt);
                if (this.RightChance < 0) {
                    this.RightChance = 0;
                }
            } else if (mutate == 4) {
                this.StayStill += mutateAmt;
                //console.log('StayStill ' + mutateAmt);
                if (this.StayStill < 0) {
                    this.StayStill = 0;
                }
            }
        }
    }
}