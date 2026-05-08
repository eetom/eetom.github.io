import random from "https://cdn.skypack.dev/random";
import seedrandom from "https://cdn.skypack.dev/seedrandom";
import { createVoronoiTessellation } from "https://cdn.skypack.dev/@georgedoescode/generative-utils";

class VoronoiPattern {
    static get inputProperties() {
        return ["--pattern-seed", "--pattern-background"];
    }

    constructor() {
        // Define colors array
        this.colors = ["#D8B4FE", "#A855F7", "#7E22CE", "#3B0764"];
    }

    paint(ctx, geometry, props) {
        const { width, height } = geometry;

        const background = props.get("--pattern-background").toString();
        const seed = props.get("--pattern-seed").value;

        random.use(seedrandom(seed));

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);

        const { cells } = createVoronoiTessellation({
            width,
            height,
            points: [...Array(40)].map(() => ({
                x: random.float(0, width),
                y: random.float(0, height)
            }))
        });

        cells.forEach((cell) => {
            // Randomly select a color from the colors array
            const color = this.colors[random.int(0, this.colors.length - 1)];
            ctx.fillStyle = color;

            const cx = cell.centroid.x;
            const cy = cell.centroid.y;

            ctx.save();

            ctx.translate(cx, cy);
            ctx.rotate((random.float(0, 360) / 180) * Math.PI);
            ctx.translate(-cx, -cy);

            ctx.beginPath();
            ctx.arc(
                cell.centroid.x,
                cell.centroid.y,
                cell.innerCircleRadius * 0.75,
                0,
                Math.PI * random.int(1, 2)
            );
            ctx.fill();

            if (random.float(0, 1) > 0.25) {
                ctx.fillStyle = background;
                ctx.beginPath();
                ctx.arc(
                    cell.centroid.x,
                    cell.centroid.y,
                    (cell.innerCircleRadius * 0.75) / 2,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }

            ctx.restore();
        });
    }
}

if (typeof registerPaint !== "undefined") {
    registerPaint("voronoiPattern", VoronoiPattern);
}
