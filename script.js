console.clear();

const url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"; //Data source.

const svgWidth = 900; //Width of SVG.
const svgHeight = 500; //Height of SVG.
const svgPadding = 70; //Padding from edge of SVG.
const barWidth = svgWidth / 275; //There are 275 records in the database.

let tooltipDiv = d3.select("body") //This is the div that holds the tooltip.
	.append("div")
	.attr("id", "tooltip")



d3.json(url, function(err, data) {
	//Defines elements for the x-axis.

	var yearsDate = data.data.map(function(item) {
		return new Date(item[0]);
	});

	var maxYears = new Date(d3.max(yearsDate));
	maxYears.setMonth(maxYears.getMonth() + 3);

	//console.log("MaxYears", maxYears)

	var xScale = d3.scaleTime() //Scale for the x-axis.
		.domain([d3.min(yearsDate), maxYears]) //Uses smallest and biggest years from the years array.

		.range([svgPadding, svgWidth - (svgPadding / 1.5)])

	//console.log("xScale: ", xScale)

	let years = data.data.map(function(item) {
		return item[0].substring(0, 4); //Maps out each year to this array.
	});

	//console.log("Years", years[0])
	//console.log("Years", years)

	let quarters = data.data.map(function(item) {
		return item[0].substring(5, 7); //Maps out each year's quarter to this array.
	});

	//console.log("Quarters", quarters[0])
	// console.log("Quarters", quarters)

	// console.log(d3.min(years));
	// console.log(d3.max(years));

	let xAxis = d3.axisBottom() //The x-axis.
		.scale(xScale)



	//Defines elements for the y-axis.      
	let ourGDP = data.data.map(function(item) {
		return item[1]; //Maps out each year to this array.
	});

	//console.log("ourGDP", ourGDP)

	let maxGDP = d3.max(ourGDP); //Gets the highest GDP value.
	//  console.log("Max GDP:", maxGDP)

	let minGDP = d3.min(ourGDP); //Gets the lowest GDP value.
	// console.log("Min GDP:", minGDP)

	let linearScale = d3.scaleLinear()
		.domain([0, maxGDP])
		.range([0, svgHeight - (svgPadding * 2)]);

	let scaledGDP = ourGDP.map(function(item) {
		return linearScale(item);
	});

	//console.log("ScaledGDP", scaledGDP[0])

	let yScale = d3.scaleLinear() //Scale for the y-axis.
		.domain([0,
                            maxGDP]) //Uses smallest and biggest GDP from data.
		.range([svgHeight - svgPadding, svgPadding]);

	//console.log("YearsDate", yearsDate)

	let yAxis = d3.axisLeft(yScale) //The y-axis.
	//.tickFormat(timeFormat) //Y-axis uses "12:34" format for time.

  

	//Defines the main SVG element.
	let svgContainer = d3.select("body")
		.append("svg")
		.attr("width", svgWidth)
		.attr("height", svgHeight);

	svgContainer.append("text") //Appends the Title element.
		.attr("transform", "translate(100,0)")
		.attr("x", svgWidth / 4.5)
		.attr("y", svgPadding / 1.5)
		.text("GDP of the United States")
		.attr("id", "title")

	svgContainer.append("text") //X-Axis label.
		.attr("transform", "translate(100,0)")
		.attr("x", svgWidth / 2.8)
		.attr("y", svgHeight - 20)
		.text("Year")

	svgContainer.append("text") //Y-Axis label.
		.attr("transform", "rotate(-90)")
		.attr("x", 0 - (svgHeight / 1.65))
		.attr("y", 20)
		.text("Gross Domestic Product")

	// svgContainer.append('text')
	// .attr('x', 525)
	// .attr('y', 580)
	// .text('2 More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
	// .attr('class', 'info');

	d3.select('svg').selectAll('rect')
		.data(scaledGDP)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', function(d, i) {
			return xScale(yearsDate[i]) - svgPadding;
		})

		.attr('y', function(d, i) {
			return svgHeight - d - svgPadding;
		})
		.attr('width', barWidth)
		.attr('height', function(d) {
			return d;
		})
		//.style('fill', '#33adff')

		.attr('transform', 'translate(' + svgPadding + ', 0)')
		.attr('data-date', function(d, i) {
			return yearsDate[i]
		})
		.attr('data-gdp', function(d, i) {
			return ourGDP[i]
		})

	svgContainer.append("g") //Appends the x-axis to the SVG file.
		.attr("id", "x-axis")
		.attr("transform", "translate(0," + (svgHeight - svgPadding) + ")")
		.call(xAxis)

	svgContainer.append("g") //Appends the y-axis to the SVG file.
		.call(yAxis)
		.attr("id", "y-axis")
		.attr("transform", "translate(" + (svgPadding) + ",0)")

	console.log("End of chart")
});
console.log("End of program")
