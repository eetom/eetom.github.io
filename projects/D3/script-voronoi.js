import random from "https://cdn.skypack.dev/random";
import seedrandom from "https://cdn.skypack.dev/seedrandom";
import { createVoronoiTessellation } from "https://cdn.skypack.dev/@georgedoescode/generative-utils";

class VoronoiPattern {
    static get inputProperties() {
        return ["--pattern-seed", "--pattern-colors", "--pattern-background"];
    }

    paint(ctx, geometry, props) {
        const { width, height } = geometry;

        // Increase the range of random points

        const background = props.get("--pattern-background").toString();
        const seed = props.get("--pattern-seed").value;
        const colors = props.getAll("--pattern-colors").map((c) => c.toString());

        random.use(seedrandom(seed));

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);

        const { cells } = createVoronoiTessellation({
            width,
            height,
            points: [...Array(100)].map(() => ({
                x: random.float(0, width),
                y: random.float(0, height)
            }))
        });

        cells.forEach((cell) => {
            ctx.fillStyle = colors[random.int(0, colors.length - 1)];

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
