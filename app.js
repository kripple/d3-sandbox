var data = [
  {letter:'A', frequency:.08167},
  {letter:'B', frequency:.01492},
  {letter:'C', frequency:.02782},
  {letter:'D', frequency:.04253},
  {letter:'E', frequency:.12702}
];

var margin = {top: 20, right: 20, bottom: 30, left: 40},
width = 500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var barwidth = 0;

var x = 0;
var y = 0;

window.onload = function() {

  

  x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  barWidth = x.rangeBand();

  y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var div = d3.select("body").append("div")
    .attr("class", "popup")
    .style("opacity", 0);


  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.letter); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.frequency); })
    .attr("height", function(d) { return height - y(d.frequency); })
    .on('mouseover', displayPopup)
    .on('mouseout', hidePopup);

  barwidth = x.rangeBand();

  function displayPopup(popupData) {

    // var left = 0;
    // var top = 9;
    // for( var i = 0; i < data.length; i++ ) {
    //   if(popupData.letter == data[i].letter) {
    //     left = x(data[i].letter) + (barwidth / 2);
    //   }
    // }
    // top += y(popupData.frequency);
    // // if top < height of popup + padding + arrow => flip orientation of popup

    var left = (width / 2) -160 + margin.left; // 160 is half the width of the popup box
    var top = height / 2;

    var arrowLeft = 0;
    var chunk = ( 320 - 2 ) / (data.length - 1);

    for( var i = 0; i < data.length; i++ ) {
      if(popupData.letter == data[i].letter) {
        // arrowLeft = x(data[i].letter);
        // arrowLeft = ((i+1) * barwidth) - margin.left;
        arrowLeft = i * chunk; // 0 -> 320(width of popup) + 8(popup padding)
      }
    }

    div
      .style('opacity',0.9)
      .html('<div>Frequency: ' + (Math.floor(popupData.frequency * 100)).toString() + "%</div><div class='popup-arrow'>&#x25BC;</div>")
      // .attr('width', width - ( 2 * (margin.left + margin.right)) + 'px')
      .style("left", left.toString() + "px")
      .style("top", top.toString() + "px");

    d3.select(".popup-arrow")
      .style("left", arrowLeft.toString() + "px");

  }

  function hidePopup() {
    // div.style("opacity", 0);
  }


  function type(d) {
    d.frequency = +d.frequency;
    return d;
  }



}


