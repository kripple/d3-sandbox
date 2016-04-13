var data = [
  {letter:'A', frequency:.1},
  {letter:'B', frequency:.2},
  {letter:'C', frequency:.35},
  {letter:'D', frequency:.7},
  {letter:'E', frequency:.997}
];

var lineData = [
  {letter:'A', frequency:.8},
  {letter:'B', frequency:.9},
  {letter:'C', frequency:1},
  {letter:'D', frequency:1},
  {letter:'E', frequency:1}
];

var legendItems = [
  {name:'Rectangle', color:'red', style:'rect' }, 
  {name:'Circle', color:'orange', style:'circle' },
  {name:'Circle with Line', color:'blue', style:'lined-circle' },
  {name:'Line', color:'limegreen', style:'line' }
];

var expand1 = false;
var expand2 = false;
var expand3 = false;

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

  var line = d3.svg.line()
    .x(function(d) { return x(d.letter); })
    .y(function(d) { return y(d.frequency); });



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
    .attr("height", function(d) { return height - y(d.frequency); });
    // .on('mouseover', displayPopup)
    // .on('mouseout', hidePopup);

  svg.append("path")
    .datum(lineData)
    .attr("class", "line")
    .attr("d", line);

  ///////////////////////////////////////////////////////////

  var prints1 = ['apple','bannana','cherry','elderberry'];
  var prints2 = ['anteater','cheetah','elephant'];
  var prints3 = ['aubergine','blue','coral','daffodil','emerald'];

  var padding = {top: 8, right: 10, bottom: 8, left: 10};
  var lineHeight = 16;
  var headingPadding = 5;
  var linePadding = 6;

  var expandableBox = d3.select("body").append("svg")
    .attr("class","expandable-box")
    .style("font-size","12px")
    .attr('pointer-events','all')
    .style('left', (width / 2) - margin.left)
    .style('top', (height / 2) - margin.top);

  expandableBox.attr('height',(padding.top+padding.bottom+(3*lineHeight))+'px')
    .append('svg:a').attr('xlink:href','#').on('click',toggle1)
    .append('svg:text').text('1. Click Me!').attr('class','toggle1')
    .attr('dy',(lineHeight+headingPadding) + 'px').attr('dx', padding.left +'px');

  d3.select('.expandable-box')
    .append('svg:a').attr('xlink:href','#').on('click',toggle2)
    .append('svg:text').text('2. Click Me!').attr('class','toggle2')
    .attr('dy',((lineHeight*2)+headingPadding) + 'px').attr('dx', padding.left +'px');

  d3.select('.expandable-box')
    .append('svg:a').attr('xlink:href','#').on('click',toggle3)
    .append('svg:text').text('3. Click Me!').attr('class','toggle3')
    .attr('dy',((lineHeight*3)+headingPadding) + 'px').attr('dx', padding.left +'px');

  function toggle1() {
    d3.event.preventDefault();
    d3.event.stopImmediatePropagation();
    var link = this;
    var currHeight = link.parentNode.height.baseVal.value;
    var shiftUp = 0;

    if(expand1) {
      var height = currHeight - (prints1.length*lineHeight);
      d3.selectAll('.one').remove();

      // for southerly headings
      if(!!d3.select('.toggle2').node()) {
        var twoHeight = d3.select('.toggle2').node().dy.baseVal[0].value;
        d3.select('.toggle2').attr('dy',(twoHeight - (prints1.length*lineHeight) - headingPadding) +'px');
        height -= headingPadding;

        // if children, move back up
        if(!!d3.select('.two').node()) {
          //for all nodes, get height, subtract height of all removed elements
          var items = d3.selectAll('.two')[0];
          for(var i=0;i<items.length;i++){
            var itemHeight = items[i].dy.baseVal[0].value;
            items[i].dy.baseVal[0].value = itemHeight - (prints1.length*lineHeight) - headingPadding;
          }  
        }
      }

      if(!!d3.select('.toggle3').node()) {
        var threeHeight = d3.select('.toggle3').node().dy.baseVal[0].value;
        d3.select('.toggle3').attr('dy',(threeHeight - (prints1.length*lineHeight) - headingPadding) +'px');
        height -= headingPadding;

        // if children, move back up
        if(!!d3.select('.three').node()) {
          //for all nodes, get height, subtract height of all removed elements
          var items = d3.selectAll('.three')[0];
          for(var i=0;i<items.length;i++){
            var itemHeight = items[i].dy.baseVal[0].value;
            items[i].dy.baseVal[0].value = itemHeight - (prints1.length*lineHeight) - headingPadding;
          }  
        }
      }

      d3.select('.expandable-box').attr('height',height +'px');

    } else {
      var height = currHeight + (prints1.length*lineHeight);

      // for southerly headings
      if(!!d3.select('.toggle2').node()) {
        var twoHeight = d3.select('.toggle2').node().dy.baseVal[0].value;
        d3.select('.toggle2').attr('dy',(twoHeight + (prints1.length*lineHeight) + headingPadding) +'px');
        height += headingPadding;
        shiftUp += lineHeight;

        // if children, move down
        if(!!d3.select('.two').node()) {
          //for all nodes, get height, add .. height of all elements-to-be-added
          var items = d3.selectAll('.two')[0];
          for(var i=0;i<items.length;i++){
            var itemHeight = items[i].dy.baseVal[0].value;
            items[i].dy.baseVal[0].value = itemHeight + (prints1.length*lineHeight) + headingPadding;
          }  
          shiftUp += (lineHeight * items.length); 
        }
      }
      if(!!d3.select('.toggle3').node()) {
        var threeHeight = d3.select('.toggle3').node().dy.baseVal[0].value;
        d3.select('.toggle3').attr('dy',(threeHeight + (prints1.length*lineHeight) + headingPadding) +'px');
        height += headingPadding;
        shiftUp += lineHeight;

        // if children, move down
        if(!!d3.select('.three').node()) {
          //for all nodes, get height, add .. height of all elements-to-be-added
          var items = d3.selectAll('.three')[0];
          for(var i=0;i<items.length;i++){
            var itemHeight = items[i].dy.baseVal[0].value;
            items[i].dy.baseVal[0].value = itemHeight + (prints1.length*lineHeight) + headingPadding;
          }  
          shiftUp += (lineHeight * items.length); 
        }
      }

      var adjust = 0;
      if(expand2) { adjust = headingPadding; }

      for(var i=0;i<prints1.length;i++){
        var printHeight = (i * lineHeight) + currHeight + linePadding - shiftUp - adjust;
        link.insertAdjacentHTML('afterend',"<text class='one' dy='"+printHeight+"px' dx='"+(2*padding.left)+"px'>- "+prints1[i]+"</text>");
      }
      d3.select('.expandable-box').attr('height',height +'px');
    }

    expand1 = !expand1;
  }


  function toggle2() {
    d3.event.preventDefault();
    d3.event.stopImmediatePropagation();
    var link = this;
    var currHeight = link.parentNode.height.baseVal.value;
    var shiftUp = 0;

    if(expand2) {
      var height = currHeight - (prints2.length*lineHeight);
      d3.selectAll('.two').remove();

      // for southerly headings
      if(!!d3.select('.toggle3').node()) {
        var threeHeight = d3.select('.toggle3').node().dy.baseVal[0].value;
        d3.select('.toggle3').attr('dy',(threeHeight - (prints2.length*lineHeight) - headingPadding) +'px');
        height -= headingPadding;

        // if children, move back up
        if(!!d3.select('.three').node()) {
          //for all nodes, get height, subtract height of all removed elements
          var items = d3.selectAll('.three')[0];
          for(var i=0;i<items.length;i++){
            var itemHeight = items[i].dy.baseVal[0].value;
            items[i].dy.baseVal[0].value = itemHeight - (prints2.length*lineHeight) - headingPadding;
          }  
        }
      }
      d3.select('.expandable-box').attr('height',height +'px');

    } else {
      var height = currHeight + (prints2.length*lineHeight);

      // for southerly headings
      if(!!d3.select('.toggle3').node()) {
        var threeHeight = d3.select('.toggle3').node().dy.baseVal[0].value;
        d3.select('.toggle3').attr('dy',(threeHeight + (prints2.length*lineHeight) + headingPadding) +'px');
        height += headingPadding;
        shiftUp += lineHeight;

        // if children, move down
        if(!!d3.select('.three').node()) {
          //for all nodes, get height, add .. height of all elements-to-be-added
          var items = d3.selectAll('.three')[0];
          for(var i=0;i<items.length;i++){
            var itemHeight = items[i].dy.baseVal[0].value;
            items[i].dy.baseVal[0].value = itemHeight + (prints2.length*lineHeight) + headingPadding;
          }  
          shiftUp += (lineHeight * items.length);
        }
      }
      for(var i=0;i<prints2.length;i++){
        var adjust = 0;
        if(expand1) { adjust = headingPadding; }
        var printHeight = (i * lineHeight) + currHeight + linePadding - shiftUp - adjust;
        link.insertAdjacentHTML('afterend',"<text class='two' dy='"+printHeight+"px' dx='"+(2*padding.left)+"px'>- "+prints2[i]+"</text>");
      }
      d3.select('.expandable-box').attr('height',height +'px');
    }

    expand2 = !expand2;
  }

  function toggle3() {
    d3.event.preventDefault();
    d3.event.stopImmediatePropagation();
    var link = this;
    var currHeight = link.parentNode.height.baseVal.value;

    if(expand3) {
      var height = currHeight - (prints3.length*lineHeight);
      d3.selectAll('.three').remove();
      d3.select('.expandable-box').attr('height',height +'px');

    } else {
      var adjust = 0;
      if(expand1) { adjust = headingPadding; }
      var height = currHeight + (prints3.length*lineHeight);
      for(var i=0;i<prints3.length;i++){
        var printHeight = (i * lineHeight) + currHeight + linePadding - adjust;
        link.insertAdjacentHTML('afterend',"<text class='three' dy='"+printHeight+"px' dx='"+(2*padding.left)+"px'>- "+prints3[i]+"</text>");
      }
      d3.select('.expandable-box').attr('height',height +'px');
    }
    
    expand3 = !expand3;
  }

  ///////////////////////////////////////////////////////////

  // legend = svg.append("g")
  //   .attr("class","legend")
  //   .attr("transform","translate(50,30)")
  //   .style("font-size","12px");
    
  // var items = d3.entries(legendItems);
  // var legendPadding = 5;

  // var lb = legend.selectAll(".legend-box").data([true]);
  // var li = legend.selectAll(".legend-items").data([true]);

  // lb.enter().append("rect").classed("legend-box",true);
  // li.enter().append("g").classed("legend-items",true);

  // li.selectAll("text")
  //     .data(items,function(d) { return d.key})
  //     .call(function(d) { d.enter().append("text")})
  //     .call(function(d) { d.exit().remove()})
  //     .attr("y",function(d,i) { return i+"em"}) // use to position text
  //     .attr("x","1em") // use to position text
  //     .text(function(d) { return d.value.name; });

  // li.selectAll("rect")
  //     .data(items,function(d) { return d.key})
  //     .call(function(d) { d.enter().append("rect")})
  //     .call(function(d) { d.exit().remove()})
  //     .attr("x",-4) // use to position rects
  //     .attr("y",function(d,i) { return i-0.6+"em"}) // use to position rects
  //     .attr("height",'8px') // use to size rects
  //     .attr("width",'8px') // use to size rects
  //     .style("fill",function(d) { return d.value.color})
  //     .style("opacity",function(d) { return ( d.value.style == 'rect' ) ? 1 : 0 });

  // li.selectAll("circle")
  //     .data(items,function(d) { return d.key})
  //     .call(function(d) { d.enter().append("circle")})
  //     .call(function(d) { d.exit().remove()})
  //     .attr("cy",function(d,i) { return i-0.25+"em"}) // use to position circles
  //     .attr("cx",0) // use to position circles
  //     .attr("r","0.4em") // use to size circles
  //     .style("fill",function(d) { return d.value.color})
  //     .style("opacity",function(d) { return ( d.value.style == 'circle' || d.value.style == 'lined-circle' ) ? 1 : 0 });

  // li.selectAll("line")
  //     .data(items,function(d) { return d.key})
  //     .call(function(d) { d.enter().append("line")})
  //     .call(function(d) { d.exit().remove()})
  //     .attr("x1",-8) // use to position line
  //     .attr("x2",8) // use to position line
  //     .attr("y1",function(d,i) { return i-0.25+"em"}) // use to position line
  //     .attr("y2",function(d,i) { return i-0.25+"em"}) // use to position line
  //     .style("stroke",function(d) { return d.value.color})
  //     .style("opacity",function(d) { return ( d.value.style == 'line' || d.value.style == 'lined-circle' ) ? 1 : 0 });

  // // Reposition and resize the box
  // var lbbox = li[0][0].getBBox()  

  // lb.attr("x",(lbbox.x-legendPadding)) // use to position legend, consider dynamic positioning
  //     .attr("y",(lbbox.y-legendPadding)) // use to position legend
  //     .attr("height",(lbbox.height+2*legendPadding))
  //     .attr("width",(lbbox.width+2*legendPadding));



  // barwidth = x.rangeBand();

  // function displayPopup(popupData) {

  //   // var left = 0;
  //   // var top = 9;
  //   // for( var i = 0; i < data.length; i++ ) {
  //   //   if(popupData.letter == data[i].letter) {
  //   //     left = x(data[i].letter) + (barwidth / 2);
  //   //   }
  //   // }
  //   // top += y(popupData.frequency);
  //   // // if top < height of popup + padding + arrow => flip orientation of popup

  //   var left = (width / 2) -160 + margin.left; // 160 is half the width of the popup box
  //   var top = height / 2;

  //   var arrowLeft = 0;
  //   var chunk = ( 320 - 2 ) / (data.length - 1);

  //   for( var i = 0; i < data.length; i++ ) {
  //     if(popupData.letter == data[i].letter) {
  //       arrowLeft = i * chunk; // 0 -> 320(width of popup) + 8(popup padding)
  //     }
  //   }

  //   div
  //     .style('opacity',0.9)
  //     .html('<div>Frequency: ' + (Math.floor(popupData.frequency * 100)).toString() + "%</div><div class='popup-arrow'>&#x25BC;</div>")
  //     .style("left", left.toString() + "px")
  //     .style("top", top.toString() + "px");

  //   d3.select(".popup-arrow")
  //     .style("left", arrowLeft.toString() + "px");

  // }

  // function hidePopup() {
  //   div.style("opacity", 0);
  // }


  function type(d) {
    d.frequency = +d.frequency;
    return d;
  }



}


