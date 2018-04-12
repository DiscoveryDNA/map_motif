var margin = {top: 20, right: 15, bottom: 60, left: 60}
  , width = 960 - margin.left - margin.right
  , height = 500 - margin.top - margin.bottom;

d3.csv("test.csv", function(data){

	var points = d3.select("svg")
		.attr('width', width + margin.right + margin.left)
		.attr('height', height + margin.top + margin.bottom)
		.selectAll("p")
			.data(data)
			.enter()
			.append("g")
				.attr("class", "point")
				.attr("transform", function(d){
					return "translate(" + d.raw_position * 6 + "," + d.score * 50 +")";
				})
			.on("mouseover", function(d){
				d3.select(this).raise()
					.append("text")
					.attr("class", "coordinates")
					.text("(" + d.raw_position + "," + d.score + ")");
			})
			.on("mouseout", function(d) {
				d3.selectAll("text.coordinates").remove();
			})

	points.append("circle")
		.attr("r", 2)
		.attr("fill", "#79CDCD");


    var x = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return d.raw_position; })])
              .range([ 0, width ]);

    var y = d3.scaleLinear()
    	      .domain([0, d3.max(data, function(d) { return d.score; })])
    	      .range([ height, 0 ]);

	var xAxis = d3.axisBottom(x).tickFormat(function(d){ return d.raw_position;});
	var yAxis = d3.axisLeft(y);

	d3.select("svg").append("g")
       .call(xAxis);

})
