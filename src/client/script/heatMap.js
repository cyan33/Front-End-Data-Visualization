import * as d3 from 'd3'
import '../stylesheet/heatmap.scss'

let width = 960,
  height = 136,
  cellSize = 17;

const formatPercent = d3.format('.1%');

const color = d3.scaleQuantize()
    .domain([-0.05, 0.05])
    .range(['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837']);

const svg = d3.select('body')
  .selectAll('svg')
  .data(d3.range(1990, 2011))
  .enter().append('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', `translate(${(width - cellSize * 53) / 2},${height - cellSize * 7 - 1})`);

svg.append('text')
    .attr('transform', `translate(-6,${cellSize * 3.5})rotate(-90)`)
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'middle')
    .text(d => d);

const rect = svg.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#ccc')
  .selectAll('rect')
  .data(d => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
  .enter().append('rect')
    .attr('width', cellSize)
    .attr('height', cellSize)
    .attr('x', d => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
    .attr('y', d => d.getDay() * cellSize)
    .datum(d3.timeFormat('%Y-%m-%d'));

svg.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#000')
  .selectAll('path')
  .data(d => d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
  .enter().append('path')
    .attr('d', pathMonth);

d3.csv('/heat-map.csv', (error, csv) => {
  if (error) throw error;

  const data = d3.nest()
      .key(d => d.Date)
      .rollup(d => (d[0].Close - d[0].Open) / d[0].Open)
    .object(csv);

  rect.filter(d => d in data)
      .attr('fill', d => color(data[d]))
    .append('title')
      .text(d => `${d}: ${formatPercent(data[d])}`);
});

function pathMonth(t0) {
  let t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
    d0 = t0.getDay(),
    w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
    d1 = t1.getDay(),
    w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
  return `M${(w0 + 1) * cellSize},${d0 * cellSize
       }H${w0 * cellSize}V${7 * cellSize
       }H${w1 * cellSize}V${(d1 + 1) * cellSize
       }H${(w1 + 1) * cellSize}V${0
       }H${(w0 + 1) * cellSize}Z`;
}

document.querySelector('.preloader-wrapper').style.display = 'none'
