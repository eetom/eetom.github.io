document.addEventListener('DOMContentLoaded', function () {
    const tileContainer = document.querySelector('.tile-container');
    let numCols, numRows;
    const tileSize = 200; // Size of each tile in pixels
    let numTilesWithImage = Math.floor(Math.random() * 100); // Random number of tiles with image
    let numTilesWithoutImage = 0;


    console.log('with Iamges', numTilesWithImage);
    console.log('without Iamges', numTilesWithoutImage);

    // Function to redraw tiles
    function redrawTiles() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        numCols = Math.ceil(viewportWidth / tileSize);
        numRows = Math.ceil(viewportHeight / tileSize);

        // Clear existing tiles
        tileContainer.innerHTML = '';

        // Create new tiles
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.style.width = `${tileSize}px`;
                tile.style.height = `${tileSize}px`;
                tile.style.left = `${col * tileSize}px`;
                tile.style.top = `${row * tileSize}px`;

                // Randomly choose whether to add image or not
                if (numTilesWithImage > 0 && Math.random() < 0.7) {
                    tile.style.backgroundImage = `url('../../img/hosted/tile_1.png')`;
                    console.log('tile image');
                    // numTilesWithImage--;
                } else {
                    // tile.style.backgroundColor = 'lightgray'; 
                    tile.style.backgroundImage = `url('../../img/hosted/tile_3.png')`;
                    console.log('no image');
                }

                tile.style.backgroundSize = `cover`;

                // Randomly choose rotation in 90-degree increments
                const rotation = Math.floor(Math.random() * 4) * 90;
                tile.style.transform = `rotate(${rotation}deg)`;

                tileContainer.appendChild(tile);
            }
        }
    }

    // Initial redraw
    redrawTiles();

    // Redraw tiles on window resize
    window.addEventListener('resize', redrawTiles);
});
