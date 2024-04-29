angular
    .module('app', [])
    .directive('vennDiagram', vennDiagram)


function vennDiagram() {
    return {
        bindToController: {
            hashMap: '<?',
            colorMap: '<?'
        },
        controller: Controller,
        template: `
      <svg class="venn-diagram-svg">
        <g class="venn-diagram-inner-circles"></g>
        <g class="venn-diagram-border-circles"></g>
        <g class="venn-diagram-outer-circles"></g>
        <g class="venn-diagram-labels"></g>
      </svg>`,
        controllerAs: 'vm',
        scope: {}
    }
}

const POSITION_COLOR_MAPPING = {
    0: 'priorColor',
    1: 'laterColor'
};

class Controller {
    private hashMap = {
        'left': {
            'value': 0,
            'formattedValue': '0'
        },
        'right': {
            'value': 0,
            'formattedValue': '0'
        },
        'common': {
            'value': 200,
            'formattedValue': '200'
        }
    };
    private colorMap = {
        'borderColor': '#ff1744',
        'priorColor': '#ffccd6',
        'laterColor': '#ff8099'
    };

    public vennDiagramModel = {
        ui: {
            height: null,
            width: null,
            radius: null,
            offset: null
        },
        dom: {
            container: 'venn-diagram',
            svg: 'venn-diagram-svg',
            groups: {
                outerCircles: 'venn-diagram-outer-circles',
                innerCircles: 'venn-diagram-inner-circles',
                borderCircles: 'venn-diagram-border-circles',
                circleLabels: 'venn-diagram-labels'
            },
            elements: {
                outerCircle: 'venn-diagram-outer-circle',
                innerCircle: 'venn-diagram-inner-circle',
                borderCircle: 'venn-diagram-border-circles',
                circleLabel: 'venn-diagram-label'
            }
        }
    }

    // main content
    private container = d3.select(this.$element[0]);
    private svg = this.container.select(`.${this.vennDiagramModel.dom.svg}`);
    // grouping content
    private outerCircles = null;
    private innerCircles = null;
    private borderCircles = null;
    private circleLabels = null;
    // TODO: on resize

    constructor(private $scope, private $element) { }

    $onInit(): void {
        this.setConfig();
        this.setContent();
        this.render();
    }

    /**
     * Sets the UI config
     */
    setConfig(): void {
        this.vennDiagramModel.ui.height = parseInt(this.container.style('height'), 10);
        this.vennDiagramModel.ui.width = parseInt(this.container.style('width'), 10);
        this.vennDiagramModel.ui.offset = Math.abs(this.vennDiagramModel.ui.width - this.vennDiagramModel.ui.height) > 25 ? 20 : 40;
        this.vennDiagramModel.ui.radius = Math.min(this.vennDiagramModel.ui.width, this.vennDiagramModel.ui.height) / 2 - this.vennDiagramModel.ui.offset;
    }

    /**
     * Sets the DOM content
     */
    setContent(): void {
        Object.keys(this.vennDiagramModel.dom.groups).forEach(key => {
            this[key] = this.svg
                .select(`g.${this.vennDiagramModel.dom.groups[key]}`)
                .attr('transform', () => `translate(${this.vennDiagramModel.ui.width / 2}, ${this.vennDiagramModel.ui.height / 2})`);
        });
    }

    /**
     * Render function
     */
    render(): void {
        this.svg.attr('width', this.vennDiagramModel.ui.width).attr('height', this.vennDiagramModel.ui.height);
        this.setOuterCircles();
        this.setInnerCircles();
        this.setBorderCircles();
        this.setCircleLabels();
    }

    /**
     * Sets the outer circles
     */
    setOuterCircles(): void {
        this.outerCircles
            .selectAll(`circle.${this.vennDiagramModel.dom.elements.outerCircle}`)
            .data(this.getCircles('outer'))
            .call(this.renderOuterCircle, this.vennDiagramModel.dom.elements.outerCircle);
    }

    /**
     * Sets the inner circles
     */
    setInnerCircles(): void {
        this.innerCircles
            .selectAll(`circle.${this.vennDiagramModel.dom.elements.innerCircle}`)
            .data(this.getCircles())
            .call(this.renderInnerCircle, this.vennDiagramModel.dom.elements.innerCircle);
    }

    /**
     * Sets the border circles
     */
    setBorderCircles(): void {
        this.borderCircles
            .selectAll(`circle.${this.vennDiagramModel.dom.elements.borderCircle}`)
            .data(this.getCircles())
            .call(this.renderBorderCircle, this.vennDiagramModel.dom.elements.borderCircle);
    }

    /**
     * Sets the inner circles
     */
    setCircleLabels(): void {
        this.circleLabels
            .selectAll(`text.${this.vennDiagramModel.dom.elements.circleLabel}`)
            .data(this.getCircleLabels())
            .call(this.renderCircleLabel, this.vennDiagramModel.dom.elements.circleLabel, this.vennDiagramModel.ui.radius);
    }

    /**
     * Renders the outer circle with specific diagram attrs
     */
    renderOuterCircle(selection, tag: string) {
        // Enter
        selection
            .enter()
            .append('circle')
            .attr('cx', function (d) { return d.cx; })
            .attr('cy', function (d) { return d.cy; })
            .attr('r', function (d) { return d.radius; })
            .attr('class', tag)
            .style('stroke', function (d) { return d.color; });

        // Update
        selection
            .attr('cx', function (d) { return d.cx; })
            .attr('cy', function (d) { return d.cy; })
            .attr('r', function (d) { return d.radius; })
            .attr('class', tag)
            .style('stroke', function (d) { return d.color; });

        // Exit
        selection.exit().remove();

        return selection;
    }

    /**
     * Renders the inner circle with specific diagram attrs
     */
    renderInnerCircle(selection, tag: string) {
        // Enter
        selection
            .enter()
            .append('circle')
            .attr('cx', function (d) { return d.cx; })
            .attr('cy', function (d) { return d.cy; })
            .attr('r', function (d) { return d.radius; })
            .attr('class', tag)
            .style('fill', function (d) { return d.color; });

        // Update
        selection
            .attr('cx', function (d) { return d.cx; })
            .attr('cy', function (d) { return d.cy; })
            .attr('r', function (d) { return d.radius; })
            .attr('class', tag)
            .style('fill', function (d) { return d.color; });

        // Exit
        selection.exit().remove();

        return selection;
    }

    /**
     * Renders the white border circles
     */
    renderBorderCircle(selection, tag: string) {
        // Enter
        selection
            .enter()
            .append('circle')
            .attr('cx', function (d) { return d.cx; })
            .attr('cy', function (d) { return d.cy; })
            .attr('r', function (d) { return d.radius; })
            .attr('class', tag);

        // Update
        selection
            .attr('cx', function (d) { return d.cx; })
            .attr('cy', function (d) { return d.cy; })
            .attr('r', function (d) { return d.radius; })
            .attr('class', tag);

        // Exit
        selection.exit().remove();

        return selection;
    }

    /**
     * Renders the circle labels
     */
    renderCircleLabel(selection, tag: string, radius: number) {
        // Update
        selection
            .attr('x', function (d, i) {
                return `${(i - 1) * (radius)}`;
            })
            .attr('y', function (d, i) {
                return 5;
            })
            .text(function (d) {
                return d.formattedValue;
            });

        // Enter
        selection
            .enter()
            .append('text')
            .attr('class', function (d) {
                return `${tag} ${d.value !== 0 ? 'haspointer' : ''}`
            })
            .attr('x', function (d, i) { return `${(i - 1) * (radius)}`; })
            .attr('y', function (d, i) { return 5; })
            .text(function (d) {
                return d.formattedValue;
            });

        // Exit
        selection.exit().remove();

        return selection;
    }

    /**
     * Resolves the circle data
     */
    getCircles(type: any = 'inner', data = [{}, {}]): any[] {
        return data.map((item, i) => Object.assign(item, {
            cx: this.getCircleCx(i),
            cy: 0,
            radius: this.vennDiagramModel.ui.radius,
            color: this.getCircleColor(type, i),
        })).reverse(); // we reverse so we get the proper ordering in dom
    }

    /**
     * Resolves the labels
     */
    getCircleLabels() {
        let labels = [];

        labels.push({
            key: 'left',
            value: this.hashMap['left'].value,
            formattedValue: this.hashMap['left'].formattedValue
        });
        labels.push({
            key: 'common',
            value: this.hashMap['common'].value,
            formattedValue: this.hashMap['common'].formattedValue
        });
        labels.push({
            key: 'right',
            value: this.hashMap['right'].value,
            formattedValue: this.hashMap['right'].formattedValue
        });

        return labels;
    }

    /**
     * Resolves a circle color
     */
    getCircleColor(type, index: number): string {
        switch (type) {
            case 'outer':
                return this.colorMap['borderColor'];
            case 'inner':
                return this.colorMap[POSITION_COLOR_MAPPING[index]];
        }
    }

    /**
     * Resolves the circle cx coord based on index
     * This is formula that makes sure the circles entwine
     */
    getCircleCx(index: number): number {
        return (-this.vennDiagramModel.ui.width / 2) +
            (this.vennDiagramModel.ui.width - (this.vennDiagramModel.ui.radius * 3)) / 2 +
            (this.vennDiagramModel.ui.radius * (index + 1));
    }
}
