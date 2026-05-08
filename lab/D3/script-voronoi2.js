import random from "https://cdn.skypack.dev/random";
import seedrandom from "https://cdn.skypack.dev/seedrandom";

class BauhausPattern {
    static get inputProperties() {
        return [
            "--pattern-seed",
            "--pattern-colors",
            "--pattern-size",
            "--pattern-detail"
        ];
    }

    paint(ctx, geometry, props) {
        const { width, height } = geometry;

        const patternSize = props.get("--pattern-size").value;
        const patternDetail = props.get("--pattern-detail").value;
        const seed = props.get("--pattern-seed").value;
        const colors = props.getAll("--pattern-colors").map((c) => c.toString());

        random.use(seedrandom(seed));

        this.scaleCtx(ctx, patternSize, patternSize, width, height);

        const cellSize = patternSize / patternDetail;

        for (let x = 0; x < patternSize; x += cellSize) {
            for (let y = 0; y < patternSize; y += cellSize) {
                const color = colors[random.int(0, colors.length - 1)];
                ctx.fillStyle = color;

                const cx = x + cellSize / 2;
                const cy = y + cellSize / 2;

                // const shapeChoice = ["circle", "arc", "rectangle", "triangle"][
                //     random.int(0, 3)
                // ];

                const shapeChoice = ["circle", "rectangle", "triangle"][
                    random.int(0, 3)
                ];

                const rotationDegrees = [0, 90, 180][random.int(0, 2)];

                ctx.save();

                ctx.translate(cx, cy);
                ctx.rotate((rotationDegrees * Math.PI) / 180);
                ctx.translate(-cx, -cy);

                switch (shapeChoice) {
                    case "circle":
                        circle(ctx, cx, cy, cellSize / 2);
                        break;
                    case "arc":
                        arc(ctx, cx, cy, cellSize / 2);
                        break;
                    case "rectangle":
                        rectangle(ctx, cx, cy, cellSize);
                        break;
                    case "triangle":
                        triangle(ctx, cx, cy, cellSize);
                        break;
                }

                ctx.fill();

                ctx.restore();
            }
        }
    }

    scaleCtx(ctx, width, height, elementWidth, elementHeight) {
        const ratio = Math.max(elementWidth / width, elementHeight / height);
        const centerShiftX = (elementWidth - width * ratio) / 2;
        const centerShiftY = (elementHeight - height * ratio) / 2;

        ctx.setTransform(ratio, 0, 0, ratio, centerShiftX, centerShiftY);
    }
}

function circle(ctx, cx, cy, radius) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.closePath();
}

function arc(ctx, cx, cy, radius) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 1);
    ctx.closePath();
}

function rectangle(ctx, cx, cy, size) {
    ctx.beginPath();
    ctx.rect(cx - size / 2, cy - size / 2, size, size);
    ctx.closePath();
}

function triangle(ctx, cx, cy, size) {
    const originX = cx - size / 2;
    const originY = cy - size / 2;

    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + size, originY + size);
    ctx.lineTo(originX, originY + size);
    ctx.closePath();
}

if (typeof registerPaint !== "undefined") {
    registerPaint("bauhausPattern", BauhausPattern);
}
