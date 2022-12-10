const canvas = document.getElementById('mycanvas');

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth, 
    height: window.innerHeight
});

let inventory;
let inventory2;
let turn = 'player one';

class Inventory extends PIXI.Sprite {
    items
    constructor(_offset) {
        super(PIXI.Texture.WHITE);
        this.anchor.x = 0 - 1.05 * _offset;
        this.anchor.y = -1.3;
        this.height = 325;
        this.width = 700;
        app.stage.addChild(this);
        this.items = [];
    }
    put(_food) {
        let _row = 3 + Math.floor(this.items.length / 7);
        let _col = this.items.length % 7;
        if (turn == 'player two') _col += 7.35;
        _food.height = 100;
        _food.width = 100;
        _food.anchor.x = -_col;
        _food.anchor.y = -_row/0.7;
        app.stage.addChild(_food);
        this.items[this.items.length] = _food;
    }
}

class BaseFood extends PIXI.Sprite {
    
    constructor(_type, _src, _row, _col) {
        super(PIXI.Texture.from(_src));
        this.type = _type;
        this.attack = this.getStats(_type)[0];
        this.defense = this.getStats(_type)[1];
        this.putInShop(_row, _col);
    }

    foodClicked() {
        if (inventory.items.indexOf(this) != -1 ||
            inventory2.items.indexOf(this) != -1) return; // stop if in an inventory

        app.stage.removeChild(this);
        if (turn == 'player one') {
            inventory.put(this);
            turn = 'player two';
        }
        else if (turn == 'player two') {
            inventory2.put(this);
            turn = 'player one';
        }
    }

    putInShop(_row, _col) {
        this.anchor.x = -_col/0.95 - 0.37;
        this.anchor.y = -_row/0.95;
        this.height = 200;
        this.width = 200;
        this.interactive = true;
        this.on('mousedown', (e) => this.foodClicked(e));
        app.stage.addChild(this);
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

inventory = new Inventory(0);
inventory2 = new Inventory(1);

let myBasil = new BaseFood('basil', 'resources/images/basil.png', 0, 0);
let myBread = new BaseFood('bread', 'resources/images/bread.png', 0, 1);
let myBroccoli = new BaseFood('broccoli', 'resources/images/broccoli.png', 0, 2);
let myCheese = new BaseFood('cheese', 'resources/images/cheese.png', 0, 3);
let myGarlic = new BaseFood('garlic', 'resources/images/garlic.png', 0, 4);
let myMeatball = new BaseFood('meatball', 'resources/images/meatball.png', 0, 5);
let myOlive = new BaseFood('olive', 'resources/images/olive.png', 1, 0);
let myPasta = new BaseFood('pasta', 'resources/images/pasta.png', 1, 1);
let myTomato = new BaseFood('tomato', 'resources/images/tomato.png', 1, 2);

let myBasil2 = new BaseFood('basil', 'resources/images/basil.png', 0, 0);
let myBread2 = new BaseFood('bread', 'resources/images/bread.png', 0, 1);
let myBroccoli2 = new BaseFood('broccoli', 'resources/images/broccoli.png', 0, 2);
let myCheese2 = new BaseFood('cheese', 'resources/images/cheese.png', 0, 3);
let myGarlic2 = new BaseFood('garlic', 'resources/images/garlic.png', 0, 4);
let myMeatball2 = new BaseFood('meatball', 'resources/images/meatball.png', 0, 5);
let myOlive2 = new BaseFood('olive', 'resources/images/olive.png', 1, 0);
let myPasta2 = new BaseFood('pasta', 'resources/images/pasta.png', 1, 1);
let myTomato2 = new BaseFood('tomato', 'resources/images/tomato.png', 1, 2);