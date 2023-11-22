document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('refresh-button').addEventListener('click', initializeMaze);
    initializeMaze();
});

function initializeMaze() {
    const inputNumberOfRows = document.getElementById('nrow');
    const inputNumberOfCols = document.getElementById('ncol');

    const rows = parseInt(inputNumberOfRows.value) || 50;
    const cols = parseInt(inputNumberOfCols.value) || 100;
    // console.log(rows + " " + cols);

    let maze = new GenerateMaze(rows, cols);
}

const canvasList = document.getElementById('canvas-selection');

canvasList.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        const selectedCanvas = event.target.getAttribute('value');
        console.log(selectedCanvas);

        if (selectedCanvas == 1) {
            let maze = new GenerateMaze(50, 100);

        } else if (selectedCanvas == 2) {
            console.log("Board to draw your maze");
        } else if (selectedCanvas == 3) {
            console.log("Can we load world map with paths as line to visualize path between two distance?");
        }
    }
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

    drawMaze() {
        const canvas = document.querySelector('.maze');
        const ctx = canvas.getContext('2d');
        let canvasSize = document.querySelector('canvas.maze');
        canvasSize.width = window.innerWidth - (parseInt(getComputedStyle(document.body).margin) * 4);
        canvasSize.height = window.innerHeight - (parseInt(getComputedStyle(document.body).margin) * 6) - document.querySelector('.topnav').offsetHeight;

        // Calculate the box size
        const boxSizeByWidth = canvas.width / this.cols;
        const boxSizeByHeight = canvas.height / this.rows;
        const boxSize = Math.min(boxSizeByHeight, boxSizeByWidth);

        // Calculate the starting coordinates to center the maze
        const startX = (canvas.width - (boxSize * this.cols)) / 2;
        const startY = (canvas.height - (boxSize * this.rows)) / 2;

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
