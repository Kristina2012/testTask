
const app = new PIXI.Application({ width:window.innerWidth, height:window.innerHeight,transparent: true});
document.body.appendChild(app.view);
const stepColor = 10;
const lines = [[0,0,0,0,0,0],[1,3,1,3,1,3],[2,1,2,1,2,1]];

let container = new PIXI.Container();
let grid = new PIXI.Container();

app.stage.addChild(container);
grid = createGrid();
container.addChild(grid);
//Отцентровка контейнера
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;
createLines();

    function createGrid(){
        // Сетка
        for (let i = 0; i < 6; i++) {
            const column = new PIXI.Container();
        for(let j=0; j < 4; j++){
            const rectangle = new PIXI.Graphics();
            rectangle.lineStyle(1, 0x000000, 1);
            rectangle.beginFill(0xFFFFFF);
            rectangle.drawRect(0, 0, 100, 100);
            rectangle.beginHole();
            rectangle.endHole();
            rectangle.endFill();
            rectangle.x = i * 100;
            rectangle.y = j * 100;
            column.addChild(rectangle);
        }
        grid.addChild(column);
        }
        return grid;
    }

    function createLines(){
        //Рисование линии
        for(let line=0; line<lines.length; line++){
            const curvedLine = new PIXI.Graphics();
            let r = randomInteger(0,255);
            let g = randomInteger(0,255);
            let b = randomInteger(0,255);
            let color = rgbToHex(r, g, b);
            curvedLine.lineStyle(2, color, 1);
            for(let index=0; index<lines[line].length; index++){
                let cell = grid.children[index].children[lines[line][index]];
                let x = cell.x+(cell.width/2);
                let y = cell.y+(cell.height/2);
                if(index == 0){
                    curvedLine.moveTo(x,y);
                }else{
                    curvedLine.lineTo(x,y);
                }
            }
            container.addChild(curvedLine);
        }
    }

    function resize() {
        app.renderer.view.style.width = window.innerWidth + 'px';
        app.renderer.view.style.height = window.innerHeight + 'px';
    }
    window.onresize = function(event) {
        resize();
    };

    function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  }