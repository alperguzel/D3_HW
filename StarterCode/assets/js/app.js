// @TODO: YOUR CODE HERE!

// define width and height of svg
var svgWidth = 1000;
var svgHeight = 500;

// define margins
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 80
};

// define width and height of chart
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// wrap the place at html, and create svg 
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// create chart group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import data

 d3.csv("assets/data/data.csv", function(err, data){
    if (err) throw err;
    console.log(data);

    // parse data as numbers
    data.forEach(d => {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });


    // create scale functions
    var xScale = d3.scaleLinear()
        .domain([8, d3.max(data, d => d.poverty)])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([height, 0]);

    // create axis function
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // append axis to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // now create circles

    var circleGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "steelblue")
        .attr("opacity", ".5");

    // lets do tool tip

    // var toolTip = d3.select("#scatter")
    //     .append("div")
    //     .attr("class", "tooltip");

    // circleGroup.on("mouseover", function(d, i) {
    //         toolTip.style("display", "block");
    //         toolTip.html(`<strong>${d.abbr}</strong>`)
    //           .style("left", d3.event.pageX + "px")
    //           .style("top", d3.event.pageY + "px");
    //       })
    //       .on("mouseout", function() {
    //         toolTip.style("display", "none");
    //       });


    
      // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", - 50)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Healtcare Rate (%)");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 15})`)
    .attr("class", "axisText")
    .text("Poverty Rate (%)");



    // put text in circles????
    // circleGroup.append("text")
    //     .text(d => d.abbr)
    //     .attr("x", d => xScale(d.poverty))
    //     .attr("y", d => yScale(d.healthcare));
    chartGroup.selectAll(".mytext")
        .data(data)
        .enter()
        .append("text")
        .classed('.mytext', true)
        .attr("text-anchor", "middle")
        .attr("class", "stateText")
        .style("fill", "white")
        .style("font", "10px sans-serif")
        .style("font-weight", "bold")
        .text(d => d.abbr)
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.healthcare));

    console.log(data.abbr);


    


});



