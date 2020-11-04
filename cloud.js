function main(input) {
  var fill = d3.scaleOrdinal(d3.schemeCategory10)

  Wordout = getData(input)
  var results = Wordout.then(function (result) {
    result.map(function (d) {
      console.log(d.size)
      return {
        size: d.size,
      }
    })
  })

  var wordScale = d3
    .scaleLinear()
    .domain([
      d3.min(results, function (d) {
        console.log(sssss)
        console.log(min(d.size))
        return d.size
      }),
      d3.max(results, function (d) {
        console.log(min(d.size))
        return d.size
      }),
    ])
    .range([10, 60])

  var wordLayout = Wordout.then(function (result) {
    var layout = d3.layout
      .cloud()
      .size([1500, 745])
      .words(
        result.map(function (d) {
          return {
            text: d.text,
            size: d.size,
            color: d.color,
          }
        })
      )
      .padding(0)
      //.rotate(function () {        return ~~(Math.random() * 2) * 90      })
      .font('Impact')
      .fontSize(function (d) {
        return d.size * 15
      })
      .on('end', draw)

    layout.start()
    function fillColor(d) {
      return d.color
    }

    function draw(words) {
      d3.select('body')
        .append('svg')
        .attr('width', layout.size()[0])
        .attr('height', layout.size()[1])
        .append('g')
        .attr(
          'transform',
          'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')'
        )
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', function (d) {
          return d.size + 'px'
        })
        .style('font-family', 'Impact')
        .attr('text-anchor', 'middle')
        .style('fill', fillColor)
        .attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
        })
        .text(function (d) {
          return d.text
        })
    }
  })
}
