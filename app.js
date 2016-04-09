var data = [
  {letter:'A', frequency:.08167},
  {letter:'B', frequency:.01492},
  {letter:'C', frequency:.02782},
  {letter:'D', frequency:.04253},
  {letter:'E', frequency:.12702}
];

var legendItems = [
  {name:'Letter', color:'red', style:'rect' }, 
  {name:'Test', color:'orange', style:'circle' },
  {name:'Test-2', color:'blue', style:'lined-circle' }
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

  ///////////////////////////////////////////////////////////

  legend = svg.append("g")
    .attr("class","legend")
    .attr("transform","translate(50,30)")
    .style("font-size","12px");
    
  var items = d3.entries(legendItems);
  var legendPadding = 5;

  var lb = legend.selectAll(".legend-box").data([true]);
  var li = legend.selectAll(".legend-items").data([true]);

  lb.enter().append("rect").classed("legend-box",true);
  li.enter().append("g").classed("legend-items",true);

  li.selectAll("text")
      .data(items,function(d) { return d.key})
      .call(function(d) { d.enter().append("text")})
      .call(function(d) { d.exit().remove()})
      .attr("y",function(d,i) { return i+"em"}) // use to position text
      .attr("x","1em") // use to position text
      .text(function(d) { return d.value.name; });

  
  li.selectAll("rect")
      .data(items,function(d) { return d.key})
      .call(function(d) { d.enter().append("rect")})
      .call(function(d) { d.exit().remove()})
      .attr("x",-4) // use to position rects
      .attr("y",function(d,i) { return i-0.6+"em"}) // use to position rects
      .attr("height",'8px') // use to size rects
      .attr("width",'8px') // use to size rects
      .style("fill",function(d) { return d.value.color})
      .style("opacity",function(d) { return ( d.value.style == 'rect' ) ? 1 : 0 });

  li.selectAll("circle")
      .data(items,function(d) { return d.key})
      .call(function(d) { d.enter().append("circle")})
      .call(function(d) { d.exit().remove()})
      .attr("cy",function(d,i) { return i-0.25+"em"}) // use to position circles
      .attr("cx",0) // use to position circles
      .attr("r","0.4em") // use to size circles
      .style("fill",function(d) { return d.value.color})
      .style("opacity",function(d) { return ( d.value.style == 'circle' || d.value.style == 'lined-circle' ) ? 1 : 0 });

  li.selectAll("line")
      .data(items,function(d) { return d.key})
      .call(function(d) { d.enter().append("line")})
      .call(function(d) { d.exit().remove()})
      .attr("x1",-8) // use to position line
      .attr("x2",8) // use to position line
      .attr("y1",function(d,i) { return i-0.25+"em"}) // use to position line
      .attr("y2",function(d,i) { return i-0.25+"em"}) // use to position line
      .style("stroke",function(d) { return d.value.color})
      .style("opacity",function(d) { return ( d.value.style == 'lined-circle' ) ? 1 : 0 });

  // Reposition and resize the box
  var lbbox = li[0][0].getBBox()  
  lb.attr("x",(lbbox.x-legendPadding))
      .attr("y",(lbbox.y-legendPadding))
      .attr("height",(lbbox.height+2*legendPadding))
      .attr("width",(lbbox.width+2*legendPadding));



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
        arrowLeft = i * chunk; // 0 -> 320(width of popup) + 8(popup padding)
      }
    }

    div
      .style('opacity',0.9)
      .html('<div>Frequency: ' + (Math.floor(popupData.frequency * 100)).toString() + "%</div><div class='popup-arrow'>&#x25BC;</div>")
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


