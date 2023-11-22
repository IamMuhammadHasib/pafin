document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('notice-modal');
    modal.style.display = 'block';


    document.getElementById('refresh-button').addEventListener('click', initializeMaze);
    initializeMaze();
});

function closeModal(){
    const modal = document.getElementById('notice-modal');
    modal.style.display = 'none';
}

var maze;
var canvas = document.querySelector('.maze');
var boxSize;

function initializeMaze() {
    const inputNumberOfRows = document.getElementById('nrow');
    const inputNumberOfCols = document.getElementById('ncol');

    const rows = parseInt(inputNumberOfRows.value) || 50;
    const cols = parseInt(inputNumberOfCols.value) || 100;
    // console.log(rows + " " + cols);

    maze = new GenerateMaze(rows, cols);
}

const canvasList = document.getElementById('canvas-selection');

canvasList.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        const selectedCanvas = event.target.getAttribute('value');
        console.log(selectedCanvas);

        if (selectedCanvas == 1) {
            maze = new GenerateMaze(50, 100);

        } else if (selectedCanvas == 2) {
            console.log("Board to draw your maze");
        } else if (selectedCanvas == 3) {
            console.log("Can we load world map with paths as line to visualize path between two distance?");
        }
    }
});


const algorithmList = document.getElementById('algorithm-selection');
let selectedAlgorithm = 1;

algorithmList.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        selectedAlgorithm = event.target.getAttribute('value');
        // console.log(selectedAlgorithm);
    }
});

document.getElementById('visualize-btn').addEventListener('click', () => {
    // console.log(selectedAlgorithm);
    maze.drawMaze();
    if (selectedAlgorithm == 1) {
        let bfsTraversal = maze.visualizePathBFS();
        console.log('BFS');
        console.log(bfsTraversal);

        // console.log(this.exit);
        // let [cx, cy] = this.exit;
        // console.log(cx + "-" + cy);
    }
    else if (selectedAlgorithm == 2) console.log('Dijkstra');
    else if (selectedAlgorithm == 3) console.log('A* search');
});

document.getElementById('getShortestPath').addEventListener('click', () => {
    maze.drawMaze();
    let color = 'aquamarine';
    maze.findPathBFS(color);
});


class GenerateMaze {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        if (this.rows % 2 == 0) this.rows -= 1;
        if (this.cols % 2 == 0) this.cols -= 1;
        this.grid = [];

        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = 0;
            }
        }

        this.entry = [1, 0];
        this.exit = [this.rows - 2, this.cols - 1];


        let sx = 1, sy = 1;
        this.grid[sx][sy - 1] = 1;
        this.grid[sx][sy] = 1;
        let fx = [];
        let fy = [];
        let pxy = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            pxy[i] = new Array(this.cols);
        }

        fx.push(sx, sx + 2);
        pxy[sx][sx + 2] = [sx, sx + 1];
        fy.push(sy + 2, sy);
        pxy[sy + 2][sy] = [sy + 1, sy];

        while (fx.length) {
            let rs = Math.floor(Math.random() * fx.length);
            // console.log("::" + fx.length);
            // console.log(">>" + rs);
            let cx = fx[rs], cy = fy[rs];
            this.grid[cx][cy] = 1;
            this.grid[pxy[cx][cy][0]][pxy[cx][cy][1]] = 1;
            fx = fx.slice(0, rs).concat(fx.slice(rs + 1));
            fy = fy.slice(0, rs).concat(fy.slice(rs + 1));

            // console.log(cx + " " + cy);
            // console.log(fx);
            // console.log(fy);

            if (cx + 2 < this.rows - 1 && !this.grid[cx + 2][cy])
                fx.push(cx + 2), fy.push(cy), pxy[cx + 2][cy] = [cx + 1, cy];
            if (cx - 2 >= 0 && !this.grid[cx - 2][cy])
                fx.push(cx - 2), fy.push(cy), pxy[cx - 2][cy] = [cx - 1, cy];
            if (cy + 2 < this.cols - 1 && !this.grid[cx][cy + 2])
                fx.push(cx), fy.push(cy + 2), pxy[cx][cy + 2] = [cx, cy + 1];
            if (cy - 2 >= 0 && !this.grid[cx][cy - 2])
                fx.push(cx), fy.push(cy - 2), pxy[cx][cy - 2] = [cx, cy - 1];
        }

        this.grid[this.rows - 2][this.cols - 1] = 1;

        this.drawMaze();
    }

    visualizePathBFS() {
        const startX = (canvas.width - (boxSize * this.cols)) / 2;
        const startY = (canvas.height - (boxSize * this.rows)) / 2;
        console.log(startX + "~" + startY);

        // console.log(this.entry);
        let queue = [];
        queue.push(this.entry);
        // console.log(queue);
        // console.log(queue[0]);

        let visited = [], parent = [];
        for (let i = 0; i < this.rows; i++) {
            visited[i] = [], parent[i] = []
            for (let j = 0; j < this.cols; j++)
                visited[i][j] = 0, parent[i][j] = [];
        }

        const processQueue = () => {
            if (queue.length === 0) {
                // console.log('No path available');
                return;
            }

            let vx = queue[0][0], vy = queue[0][1];
            queue.shift();

            if (vx == this.exit[0] && vy == this.exit[1]) {
                // console.log('Path found');
                let shortestPath = [];
                let [cx, cy] = this.exit;

                while (cx != this.entry[0] || cy != this.entry[1]) {
                    shortestPath.push([cx, cy]);
                    [cx, cy] = parent[cx][cy];
                }
                shortestPath.push([cx, cy]);
                shortestPath.reverse();
                console.log(shortestPath);
                // return shortestPath;
                for (let i = 0; i < shortestPath.length; i++) {
                    this.fillRectangle(shortestPath[i][0], shortestPath[i][1], 'white');
                }
                this.fillRectangle(this.exit[0], this.exit[1], 'white');
                return;

            }

            visited[vx][vy] = 1;
            this.fillRectangle(vx, vy, 'aquamarine');


            let childs = [
                [vx - 1, vy],
                [vx + 1, vy],
                [vx, vy - 1],
                [vx, vy + 1]
            ];
            // console.log(childs);

            for (let [cx, cy] of childs) {
                // console.log(cx+"~"+cy);
                if (cx >= 0 && cx < this.rows && cy >= 0 && cy < this.cols && !visited[cx][cy] && this.grid[cx][cy]) {
                    queue.push([cx, cy]);
                    parent[cx][cy] = [vx, vy];
                }
            }
            // console.log(parent);

            setTimeout(processQueue, 0);
        };

        setTimeout(processQueue, 0);
    }


    fillRectangle(x, y, color) {
        const ctx = canvas.getContext('2d');
        const startX = (canvas.width - (boxSize * this.cols)) / 2;
        const startY = (canvas.height - (boxSize * this.rows)) / 2;

        const rectX = startX + y * boxSize;
        const rectY = startY + x * boxSize;

        ctx.fillStyle = color;
        ctx.fillRect(rectX, rectY, boxSize, boxSize);
    }

    findPathBFS(color) {
        const startX = (canvas.width - (boxSize * this.cols)) / 2;
        const startY = (canvas.height - (boxSize * this.rows)) / 2;
        console.log(startX + "~" + startY);


        let queue = [];
        queue.push(this.entry);

        let visited = [], parent = [];
        for (let i = 0; i < this.rows; i++) {
            visited[i] = [], parent[i] = []
            for (let j = 0; j < this.cols; j++)
                visited[i][j] = 0, parent[i][j] = [];
        }

        while (queue.length) {
            let vx = queue[0][0], vy = queue[0][1];
            queue.shift();

            if (vx == this.exit[0] && vy == this.exit[1]) {
                console.log('Path found');
                break;
            }

            visited[vx][vy] = 1;

            let childs = [
                [vx - 1, vy],
                [vx + 1, vy],
                [vx, vy - 1],
                [vx, vy + 1]
            ];

            for (let [cx, cy] of childs) {
                if (cx >= 0 && cx < this.rows && cy >= 0 && cy < this.cols && !visited[cx][cy] && this.grid[cx][cy]) {
                    queue.push([cx, cy]);
                    parent[cx][cy] = [vx, vy];
                }
            }
        }

        let shortestPath = [];
        let [cx, cy] = this.exit;

        while (cx != this.entry[0] || cy != this.entry[1]) {
            shortestPath.push([cx, cy]);
            [cx, cy] = parent[cx][cy];
        }
        shortestPath.push([cx, cy]);
        shortestPath.reverse();
        console.log(shortestPath);

        for (let i = 0; i < shortestPath.length; i++) {
            this.fillRectangle(shortestPath[i][0], shortestPath[i][1], color);
        }
        this.fillRectangle(this.exit[0], this.exit[1], color);
    }

    drawMaze() {
        const ctx = canvas.getContext('2d');
        let canvasSize = document.querySelector('canvas.maze');
        canvasSize.width = window.innerWidth - (parseInt(getComputedStyle(document.body).margin) * 4);
        canvasSize.height = window.innerHeight - (parseInt(getComputedStyle(document.body).margin) * 6) - document.querySelector('.topnav').offsetHeight;


        const boxSizeByWidth = canvas.width / this.cols;
        const boxSizeByHeight = canvas.height / this.rows;
        boxSize = Math.min(boxSizeByHeight, boxSizeByWidth);


        const startX = (canvas.width - (boxSize * this.cols)) / 2;
        const startY = (canvas.height - (boxSize * this.rows)) / 2;
        console.log(startX + "~" + startY);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const x = startX + j * boxSize;
                const y = startY + i * boxSize;

                ctx.fillStyle = this.grid[i][j] === 0 ? 'black' : 'white';
                ctx.fillRect(x, y, boxSize, boxSize);
            }
        }

        const entryX = startX + this.entry[1] * boxSize;
        const entryY = startY + this.entry[0] * boxSize;
        ctx.fillStyle = 'aquamarine';
        ctx.fillRect(entryX, entryY, boxSize, boxSize);

        const exitX = startX + this.exit[1] * boxSize;
        const exitY = startY + this.exit[0] * boxSize;
        ctx.fillStyle = 'tomato';
        ctx.fillRect(exitX, exitY, boxSize, boxSize);
    }
}
