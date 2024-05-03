import random from "https://cdn.skypack.dev/random";
import seedrandom from "https://cdn.skypack.dev/seedrandom";
import { createVoronoiTessellation } from "https://cdn.skypack.dev/@georgedoescode/generative-utils";

class VoronoiPattern {
    static get inputProperties() {
        return ["--pattern-seed", "--pattern-colors", "--pattern-background"];
    }

    paint(ctx, geometry, props) {
        const { width, height } = geometry;

        const background = props.get("--pattern-background").toString();
        const seed = props.get("--pattern-seed").value;
        const tileImage = document.getElementById('tile-image'); // Get the tile image element
        const tileSize = 100; // Adjust the size of the tiles

        random.use(seedrandom(seed));

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);

        // Generate random tile positions and rotations
        const tileCount = 24; // Adjust the number of tiles
        const tiles = [...Array(tileCount)].map(() => ({
            x: random.float(0, width),
            y: random.float(0, height),
            rotation: random.float(0, Math.PI * 2) // Random rotation angle in radians
        }));

        // Draw tiles
        tiles.forEach(tile => {
            ctx.save(); // Save the current transformation matrix
            ctx.translate(tile.x, tile.y); // Translate to the tile position
            ctx.rotate(tile.rotation); // Rotate the canvas
            ctx.drawImage(tileImage, -tileSize / 2, -tileSize / 2, tileSize, tileSize); // Draw the tile
            ctx.restore(); // Restore the saved transformation matrix
        });
    }
}

if (typeof registerPaint !== "undefined") {
    registerPaint("voronoiPattern", VoronoiPattern);
}
