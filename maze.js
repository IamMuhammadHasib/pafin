const canvasList = document.getElementById('canvas-selection');

canvasList.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        const selectedCanvas = event.target.getAttribute('value');
        console.log(selectedCanvas);

        if (selectedCanvas == 1) {
            console.log("DFS maze generator");
        } else if (selectedCanvas == 2) {
            console.log("Board to draw your maze");
        } else if (selectedCanvas == 3) {
            console.log("Can we load world map with paths as line to visualize path between two distance?");
        }
    }
});