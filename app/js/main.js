requirejs.config({
    appDir: 'medex/',
    baseUrl: 'app/js/',
    paths: {
        underscore: '../../node_modules/underscore/underscore-min',
        d3: '../../node_modules/d3/d3'
    },
    shim: {
        d3: {
            exports: 'd3'
        },
        underscore: {
            exports: '_'
        }
    },
    dir: 'build/',
    modules: [
        {name: 'main'}
    ]
});

require([
    'd3',
], function (d3) {
    var margins, panes, svg, svgW, svgH;

    svgW = window.innerWidth;
    svgH = window.innerHeight;

    margins = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    ////////////////////////////////////////////////////////////////////////////
    // Drawing /////////////////////////////////////////////////////////////////
    svg = d3.select('#context')
    .append('svg')    
    .attr({
        width: svgW,
        height: svgH
    });

    panes = { // Organizes visualization features into "panes"
        line: svg.append('g').attr('class', 'plot line'),
        up: svg.append('g').attr('class', 'control up'),
        down: svg.append('g').attr('class', 'control down')
    };

    // Orient controls /////////////////////////////////////////////////////////
    (function () {
        var controlHeight = (svgH - margins.bottom - margins.top) / 2;

        svg.selectAll('.control')
        .attr({
            // Each control takes up the whole width; they're stacked on top of each other
            width: svgW - margins.left - margins.right,

            // Each control fills half the screen height
            height: controlHeight,

            transform: function (d, i) {
                return 'translate(0, ' + (controlHeight * i).toString() + ')';
            }
        });

    }());

    // Draw the controls ///////////////////////////////////////////////////////
    (function () {
        var attrs, dim; 

        dim = 200;

        attrs = {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            'class': 'arrow',
            'd': 'M41.147,21.777l-1.557,1.705l-0.209,0.216c-0.372,0.385-0.739,0.794-1.099,1.213L1.702,64.92c-3.189,3.078-3.276,8.16-0.199,11.35l1.101,1.139c3.08,3.189,8.162,3.277,11.35,0.199L49.547,50l35.076,26.917c3.189,3.08,8.271,2.991,11.351-0.198l1.101-1.14c3.08-3.188,2.99-8.27-0.197-11.349L58.851,24.136c-0.136-0.168-0.264-0.345-0.411-0.498l-1.529-1.583C52.634,17.627,45.575,17.503,41.147,21.777z'
        }

        panes.up.append('path')
        .attr(attrs)
        .attr('transform', [
            'translate(' + ((svgW / 2) - (dim / 2)) + ', ' + ((svgW / 4) - (dim / 2)) + ')',
            'scale(2, 2)'
        ].join(' '));

        panes.down.append('path')
        .attr(attrs)
        .attr('transform', [
            'translate(' + ((svgW / 2) - (dim / 2)) + ', ' + dim + ')',
            'scale(2, -2)'
        ].join(' '));

    }());

    ////////////////////////////////////////////////////////////////////////////
    // GeoJSON /////////////////////////////////////////////////////////////////
    d3.json('/medex/me.json', function (error, na) {
    });

});

