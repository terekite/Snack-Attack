const canvas = document.getElementById('mycanvas');

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth, 
    height: window.innerHeight
});

let objectsOnScreen = 2;
let inventory = [];

class Inventory extends PIXI.Sprite {
    constructor() {
        super(PIXI.Texture.WHITE);
        this.anchor.x = 0;
        this.anchor.y = -1.3;
        this.height = 325;
        this.width = 1450;
        app.stage.addChild(this);
    }
}

class BaseFood extends PIXI.Sprite {
    
    constructor(_type, _src, _row, _col) {
        super(PIXI.Texture.from(_src));
        this.type = _type;
        this.attack = this.getStats(_type)[0];
        this.defense = this.getStats(_type)[1];
        this.putOnScreen(_row, _col);
        // console.log(this);
    }

    putOnScreen(_row, _col) {
        this.anchor.x = -_col/0.95 - 0.37;
        this.anchor.y = -_row/0.95;
        this.height = 200;
        this.width = 200;
        this.interactive = true;
        this.on('mousedown', (e) => this.foodClicked(e));
        app.stage.addChild(this);
    }

    foodClicked() {
        app.stage.removeChild(this);
        const _col = 0;
        const _row = 3;
        this.height = 100;
        this.width = 100;
        this.anchor.x = -_col/2;
        this.anchor.y = -_row/0.7;
        app.stage.addChild(this);

        inventory[inventory.length] = this;
        objectsOnScreen--;
        if (objectsOnScreen == 0) {
            // console.log('all food has been purchased');
        }
        // console.log("inventory: ", inventory);
    }

    getStats (food) {
        const stats = {
            'basil' : [0, 2],
            'bread' : [1, 2],
            'broccoli' : [2, 3],
            'cheese' : [2, 2],
            'garlic' : [1, 3],
            'meatball' : [3, 3],
            'olive' : [1, 1],
            'pasta' : [1, 1],
            'tomato' : [1, 1]
        };
        return stats[food];
    }
}

class CombinedFood {}


let myInventory = new Inventory();

let myBasil = new BaseFood('basil', 'resources/images/basil.png', 0, 0);
let myBread = new BaseFood('bread', 'resources/images/bread.png', 0, 1);
let myBroccoli = new BaseFood('broccoli', 'resources/images/broccoli.png', 0, 2);
let myCheese = new BaseFood('cheese', 'resources/images/cheese.png', 0, 3);
let myGarlic = new BaseFood('garlic', 'resources/images/garlic.png', 0, 4);
let myMeatball = new BaseFood('meatball', 'resources/images/meatball.png', 0, 5);
let myOlive = new BaseFood('olive', 'resources/images/olive.png', 1, 0);
let myPasta = new BaseFood('pasta', 'resources/images/pasta.png', 1, 1);
let myTomato = new BaseFood('tomato', 'resources/images/tomato.png', 1, 2);