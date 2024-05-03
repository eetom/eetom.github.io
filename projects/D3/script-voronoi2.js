class VoronoiPattern {
    static get inputProperties() {
        return ['--pattern-seed', '--pattern-background'];
    }

    paint(ctx, geometry, props) {
        const { width, height } = geometry;

        console.log("Canvas Width:", width);
        console.log("Canvas Height:", height);

        const background = props.get("--pattern-background").toString();
        const seed = props.get("--pattern-seed").value;
        const tileImage = document.getElementById('tile-image');
        const tileSize = 100;

        random.use(seedrandom(seed));

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);

        const tiles = [...Array(24)].map(() => ({
            x: random.float(0, width),
            y: random.float(0, height),
            rotation: random.float(0, Math.PI * 2)
        }));

        console.log("Generated Tiles:", tiles);

        tiles.forEach(tile => {
            ctx.save();
            ctx.translate(tile.x, tile.y);
            ctx.rotate(tile.rotation);
            ctx.drawImage(tileImage, -tileSize / 2, -tileSize / 2, tileSize, tileSize);
            ctx.restore();
        });
    }
}

if (typeof registerPaint !== "undefined") {
    registerPaint("customPattern", CustomPattern);
}
