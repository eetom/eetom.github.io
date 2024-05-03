document.addEventListener("DOMContentLoaded", function () {
    // Your JavaScript code here
    //set up buttons
    let button = document.getElementsByTagName("button")[0];
    let button2 = document.getElementsByTagName("button")[1];

    const data = [{
        "year": 2015,
        "tour": "The Red Bullet",
        "venue": "Rosemont theatre",
        "capacity": 4400,
        "boxes": 18
    },
    {
        "year": 2017,
        "tour": "Wings",
        "venue": "Allstate arena",
        "capacity": 18500,
        "boxes": 74
    },
    {
        "year": 2018,
        "tour": "Love Yourself",
        "venue": "United center",
        "capacity": 23500,
        "boxes": 94
    },
    {
        "year": 2019,
        "tour": "Love Yourself - Speak Yourself",
        "venue": "Soldier Field",
        "capacity": 61500,
        "boxes": 246
    }
    ];

    const colors = ["#D8B4FE", "#A855F7", "#7E22CE", "#3B0764"];

    scaleColor = d3.scaleOrdinal()
        .domain(data.map(d => d.year))
        .range(colors);

    uncount = (data, accessor) =>
        data.reduce((arr, item) => {
            const count = accessor(item)
            for (let i = 0; i < count; i++) {
                arr.push({
                    ...item
                })
            }
            return arr
        }, []);

    const boxes = uncount(data, d => d.boxes);

    const nest = d3
        .nest()
        .key(d => d.venue)
        .entries(boxes);

    const graph = d3.select(".chart");
    // const group = graph
    //     .selectAll(".container")
    //     .data(nest)
    //     .join("div")
    //     .attr("class", "container");

    const group = graph
        .selectAll(".container")
        .data(nest)
        .join("div")
        .attr("class", "container")
        .each(function (d) {
            d3.select(this).append("div")
                .attr("class", "venue-label")
                .text(d.key); // This adds the venue name as the label
            d3.select(this).append("div")
                .attr("class", "year")
                .text(d.values[0].year); // This adds the year from the data to the container
        });

    group
        .selectAll(".box")
        .data(d => d.values)
        .join("div")
        .attr("class", "box")
        .style("background-color", d => scaleColor(d.year))
        .on("mouseenter", function (d) {
            const box = d3.select(this);
            const tooltip = box.append("div")
                .attr("class", "tooltip")
                .html(`<strong>Venue Capacity:</strong> ${d.capacity}<br><strong>Number of Boxes:</strong>${d.boxes}`);

            const boxRect = this.getBoundingClientRect();
            const tooltipRect = tooltip.node().getBoundingClientRect();

            tooltip.style("top", boxRect.top - tooltipRect.height - 5 + "px")
                .style("left", boxRect.left + (boxRect.width - tooltipRect.width) / 2 + "px");

            // Lower the z-index of all other box elements
            d3.selectAll(".box").style("z-index", 1);
            // Increase the z-index of the current box element
            box.style("z-index", 2);
        })
        .on("mouseleave", function () {
            d3.select(this).select(".tooltip").remove();
            // Restore the z-index of all box elements
            d3.selectAll(".box").style("z-index", null);
        });

    //intitiate paused animation
    let anim = new TimelineLite({ paused: true });
    anim.staggerTo(".box", 1, {
        scale: 1,
        ease: Back.easeOut,
        stagger: {
            grid: "auto",
            from: "start",
            axis: "y",
            each: 0.08
        }
    });
    //play animation 
    button.addEventListener("click", function (e) {
        e.preventDefault();
        if (!anim.isActive()) {
            anim.play(0);
        }
    });
    //reverse animation
    button2.addEventListener("click", function (e) {
        e.preventDefault();
        anim.reverse();
    });
});
