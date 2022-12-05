var x = d3.csv("static/GraduationDropoutTrend-2.csv", function(d) {
    return {
        location: d.LocationName,
        rt_yr: d.RateYear,
        cohortGraduation: new Date(+d.CohortGraduationYear,0,1),
        year: new Date(d.SchoolYear),
        tot_cohort: +d.TotalCohort,
        tot_grad: +d.TotalGraduated,
        oth_completer: +d["OtherCompleter(GED,etc.)"],
        otc: +d["Off-TrackContinuing"],
        dropouts: +d.Dropouts,
        grad_rt: parseFloat(d.GraduationRate).toFixed(2),
        drop_rt: parseFloat(d.DropoutRate).toFixed(2)
    };
});

var y = d3.csv("static/md_data.csv", function(d) {
    return {
        allegany_county: +d["Allegany County"],
        anne_arundel_county: +d["Anne Arundel County"],
        baltimore_city: +d["Baltimore City"],
        baltimore_county: +d["Baltimore County"],
        cavert_county: +d["Calvert County"],
        caroline_county: +d["Caroline County"],
        carroll_county: +d["Carroll County"],
        cecil_county: +d["Cecil County"],
        charles_county: +d["Charles County"],
        dorchester_county: +d["Dorchester County"],
        frederick_county: +d["Frederick County"],
        garrett_county: +d["Garrett County"],
        harford_county: +d["Harford County"],
        howard_county: +d["Howard County"],
        kent_county: +d["Kent County"],
        total: +d.Maryland,
        montgomery_county: +d["Montgomery County"],
        pg_county: +d["Prince George's County"],
        qa_county: +d["Queen Anne's County"],
        somerset_county: +d["Somerset County"],
        sm_county: +d["St. Mary's County"],
        talbot_county: +d["Talbot County"],
        washington_county: +d["Washington County"],
        wicomico_county: +d["Wicomico County"],
        worchester_county: +d["Worchester County"],
        year: new Date(d.Year),
        grades: d.Grades
    };
});

var z = d3.csv("static/college_readiness.csv", function(d) {
    return {
        year: d["School Year"],
        assesment: d["Assessment/ Subject"],
        mean_sat: +d["Mean SAT Score"],
        met_bench: +d["Met or Exceeded"],
        missed_bench: +d["Did Not Meet"]
    };
});

var a = d3.csv("static/maryland attendance.csv", function(d) {
    return {
        year: new Date(d.Year),
        category: d.Category,
        pct: +d.Percentage
    };
});

var b = d3.csv("static/md_enr_trend.csv", function(d) {
    return {
        year: new Date(d.Year),
        grade: d.Grade,
        count: +d.Count,
        county: d.County
    };
});

var c = d3.csv("static/yr_cty_md_enr.csv", function(d) {
    return {
        year: new Date(d.Year),
        county: d.County,
        count: +d.Count
    };
});

var d = d3.csv("static/NAEPmd.csv", function(d) {
    return {
        year: new Date(d.YEAR),
        stu_gp: d["STUDENT GROUP"],
        percentage: +d.PERCENTAGE
    };
});

var e = d3.csv("static/md_enr_grade.csv", function(d) {
    return {
        year: new Date(d.Year),
        grade: d.Grade,
        count: +d.Count
    };
});

var ch1 = x.then(function(result) {
    delete result["columns"];
    console.log(result);
    var chart_1 = LineChart(result, {
        x: d => d.year,
        y: d => d.dropouts,
        z: d => d.rt_yr,
        yLabel: "↑ Dropout #",
        width: 1000,
        height: 500,
        color: d3.scaleOrdinal().range(['#0047AB', '#6495ED', '#00008B', '#6F8FAF', '#4169E1'])
      });
    return chart_1;
 });

var ch2 = y.then(function(result) {
    console.log(result);
    var chart_2 = LineChart(result, {
        x: d => d.year,
        y: d => +d.total,
        z: d => d.grades,
        yLabel: "↑ Enrolled Student #",
        width: 1000,
        height: 500,
        color: d3.scaleOrdinal().range(['#0047AB', '#6495ED', '#00008B', '#6F8FAF', '#4169E1'])
      });
    return chart_2;
 });

var ch3 = z.then(function(result) {
    console.log(result);
    var chart_3 = GroupedBarChart(result, {
        x: d => d.year,
        y: d => d.mean_sat,
        z: d => d.assesment,
        yLabel: "↑ Score",
        colors: d3.schemeTableau10,
        width: 1000,
        height: 500
    });
    return chart_3;
});

var ch4 = z.then(function(result) {
    var chart_4 = GroupedBarChart(result, {
        x: d => d.year,
        y: d => d.met_bench,
        z: d => d.assesment,
        yLabel: "# Students That Met Benchmark",
        colors: d3.schemeTableau10,
        width: 1000,
        height: 500
    });
    return chart_4;
});

var ch5 = a.then(function(result) {
    console.log(result);
    var chart_5 = LineChart(result, {
        x: d => d.year,
        y: d => d.pct,
        z: d => d.category,
        yLabel: "%",
        width: 1000,
        height: 500,
        marginLeft: 37,
        color: d3.scaleOrdinal().range(['#0047AB', '#6495ED', '#00008B', '#6F8FAF', '#4169E1'])
      });
    return chart_5;
});

var ch6 = c.then(function(result) {
    console.log(result);
    var chart_6 = LineChart(result, {
        x: d => d.year,
        y: d => d.count,
        z: d => d.county,
        yLabel: "↑ Enrolled Student #",
        width: 1000,
        height: 500,
        color: d3.scaleOrdinal().range(['#0047AB', '#6495ED', '#00008B', '#6F8FAF', '#4169E1'])
      });
    return chart_6;
});

var ch7 = d.then(function(result) {
    console.log(result);
    var chart_7 = LineChart(result, {
        x: d => d.year,
        y: d => d.percentage,
        z: d => d.stu_gp,
        yLabel: "%",
        width: 1000,
        height: 500,
        marginLeft: 37,
        color: d3.scaleOrdinal().range(['#0047AB', '#6495ED', '#00008B', '#6F8FAF', '#4169E1'])
      });
    return chart_7;
});


// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/multi-line-chart
function LineChart(data, {
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    z = () => 1, // given d in data, returns the (categorical) z-value
    title, // given d in data, returns the title text
    defined, // for gaps in data
    curve = d3.curveLinear, // method of interpolation between points
    marginTop = 20, // top margin, in pixels
    marginRight = 80, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 80, // left margin, in pixels
    width = 70, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleUtc, // type of x-scale
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    zDomain, // array of z-values
    color = "currentColor", // stroke color of line, as a constant or a function of *z*
    strokeLinecap, // stroke line cap of line
    strokeLinejoin, // stroke line join of line
    strokeWidth = 1.5, // stroke width of line
    strokeOpacity, // stroke opacity of line
    mixBlendMode = "multiply", // blend mode of lines
    voronoi // show a Voronoi overlay? (for debugging)
  } = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);
    const O = d3.map(data, d => d);
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);
  
    // Compute default domains, and unique the z-domain.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (yDomain === undefined) yDomain = [0, d3.max(Y, d => typeof d === "string" ? +d : d)];
    if (zDomain === undefined) zDomain = Z;
    zDomain = new d3.InternSet(zDomain);
  
    // Omit any data not present in the z-domain.
    const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));
  
    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);
  
    // Compute titles.
    const T = title === undefined ? Z : title === null ? null : d3.map(data, title);
  
    // Construct a line generator.
    const line = d3.line()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]));
  
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .style("-webkit-tap-highlight-color", "transparent")
        .on("pointerenter", pointerentered)
        .on("pointermove", pointermoved)
        .on("pointerleave", pointerleft)
        .on("touchstart", event => event.preventDefault());
  
    // An optional Voronoi display (for fun).
    if (voronoi) svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("d", d3.Delaunay
          .from(I, i => xScale(X[i]), i => yScale(Y[i]))
          .voronoi([0, 0, width, height])
          .render());
  
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);
  
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(voronoi ? () => {} : g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));
  
    const path = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", typeof color === "string" ? color : null)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-opacity", strokeOpacity)
      .selectAll("path")
      .data(d3.group(I, i => Z[i]))
      .join("path")
        .style("mix-blend-mode", mixBlendMode)
        .attr("stroke", typeof color === "function" ? ([z]) => color(z) : null)
        .attr("d", ([, I]) => line(I));
  
    const dot = svg.append("g")
        .attr("display", "none");
  
    dot.append("circle")
        .attr("r", 2.5);
  
    dot.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("y", -8);
  
    function pointermoved(event) {
      const [xm, ym] = d3.pointer(event);
      const i = d3.least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym)); // closest point
      path.style("stroke", ([z]) => Z[i] === z ? null : "#ddd").filter(([z]) => Z[i] === z).raise();
      dot.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`);
      if (T) dot.select("text").text(T[i]);
      svg.property("value", O[i]).dispatch("input", {bubbles: true});
    }
  
    function pointerentered() {
      path.style("mix-blend-mode", null).style("stroke", "#ddd");
      dot.attr("display", null);
    }
  
    function pointerleft() {
      path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
      dot.attr("display", "none");
      svg.node().value = null;
      svg.dispatch("input", {bubbles: true});
    }
  
    return Object.assign(svg.node(), {value: null});
}

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/grouped-bar-chart
function GroupedBarChart(data, {
    x = (d, i) => i, // given d in data, returns the (ordinal) x-value
    y = d => d, // given d in data, returns the (quantitative) y-value
    z = () => 1, // given d in data, returns the (categorical) z-value
    title, // given d in data, returns the title text
    marginTop = 30, // top margin, in pixels
    marginRight = 0, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xDomain, // array of x-values
    xRange = [marginLeft, width - marginRight], // [xmin, xmax]
    xPadding = 0.1, // amount of x-range to reserve to separate groups
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [ymin, ymax]
    zDomain, // array of z-values
    zPadding = 0.05, // amount of x-range to reserve to separate bars
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    colors = d3.schemeTableau10, // array of colors
  } = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);
  
    // Compute default domains, and unique the x- and z-domains.
    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    if (zDomain === undefined) zDomain = Z;
    xDomain = new d3.InternSet(xDomain);
    zDomain = new d3.InternSet(zDomain);
  
    // Omit any data not present in both the x- and z-domain.
    const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));
  
    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
    const xzScale = d3.scaleBand(zDomain, [0, xScale.bandwidth()]).padding(zPadding);
    const yScale = yType(yDomain, yRange);
    const zScale = d3.scaleOrdinal(zDomain, colors);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);
  
    // Compute titles.
    if (title === undefined) {
      const formatValue = yScale.tickFormat(100, yFormat);
      title = i => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
    } else {
      const O = d3.map(data, d => d);
      const T = title;
      title = i => T(O[i], i, data);
    }
  
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));
  
    const bar = svg.append("g")
      .selectAll("rect")
      .data(I)
      .join("rect")
        .attr("x", i => xScale(X[i]) + xzScale(Z[i]))
        .attr("y", i => yScale(Y[i]))
        .attr("width", xzScale.bandwidth())
        .attr("height", i => yScale(0) - yScale(Y[i]))
        .attr("fill", i => zScale(Z[i]));
  
    if (title) bar.append("title")
        .text(title);
  
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);
  
    return Object.assign(svg.node(), {scales: {color: zScale}});
  }



ch1.then(function(result) {
    $(".svg-chart-1").append(result);
 });

ch2.then(function(result) {
    $(".svg-chart-2").append(result);
 });

ch3.then(function(result) {
    $(".svg-chart-3").append(result);
 });

ch4.then(function(result) {
    $(".svg-chart-4").append(result);
 });

ch5.then(function(result) {
    $(".svg-chart-5").append(result);
 });

ch6.then(function(result) {
    $(".svg-chart-6").append(result);
 });

ch7.then(function(result) {
    $(".svg-chart-7").append(result);
 });

 var svg1 = d3.select("#legend-1")

 // Handmade legend
 svg1.append("circle").attr("cx",10).attr("cy",25).attr("r", 6).style("fill", "#5778a4")
 svg1.append("circle").attr("cx",110).attr("cy",25).attr("r", 6).style("fill", "#e49444")
 svg1.append("circle").attr("cx",270).attr("cy",25).attr("r", 6).style("fill", "#d1615d")
 svg1.append("text").attr("x", 20).attr("y", 25).text("SAT Total").style("font-size", "15px").attr("alignment-baseline","middle")
 svg1.append("text").attr("x", 120).attr("y", 25).text("Reading and Writing").style("font-size", "15px").attr("alignment-baseline","middle")
 svg1.append("text").attr("x", 280).attr("y", 25).text("Mathematics").style("font-size", "15px").attr("alignment-baseline","middle")

 var svg2 = d3.select("#legend-2")

 // Handmade legend
 svg2.append("circle").attr("cx",10).attr("cy",25).attr("r", 6).style("fill", "#0047AB")
 svg2.append("circle").attr("cx",80).attr("cy",25).attr("r", 6).style("fill", "#6495ED")
 svg2.append("circle").attr("cx",150).attr("cy",25).attr("r", 6).style("fill", "#00008B")
 svg2.append("text").attr("x", 20).attr("y", 25).text("4-Year").style("font-size", "15px").attr("alignment-baseline","middle")
 svg2.append("text").attr("x", 90).attr("y", 25).text("5-Year").style("font-size", "15px").attr("alignment-baseline","middle")
 svg2.append("text").attr("x", 160).attr("y", 25).text("6-Year").style("font-size", "15px").attr("alignment-baseline","middle")

 var svg3 = d3.select("#legend-3")

 // Handmade legend
 svg3.append("circle").attr("cx",10).attr("cy",25).attr("r", 6).style("fill", "#0047AB")
 svg3.append("circle").attr("cx",65).attr("cy",25).attr("r", 6).style("fill", "#6495ED")
 svg3.append("circle").attr("cx",160).attr("cy",25).attr("r", 6).style("fill", "#00008B")
 svg3.append("circle").attr("cx",250).attr("cy",25).attr("r", 6).style("fill", "#6F8FAF")
 svg3.append("text").attr("x", 20).attr("y", 25).text("Pre-K").style("font-size", "15px").attr("alignment-baseline","middle")
 svg3.append("text").attr("x", 75).attr("y", 25).text("Grades K-5").style("font-size", "15px").attr("alignment-baseline","middle")
 svg3.append("text").attr("x", 170).attr("y", 25).text("Grades 6-8").style("font-size", "15px").attr("alignment-baseline","middle")
 svg3.append("text").attr("x", 260).attr("y", 25).text("Grades 9-12").style("font-size", "15px").attr("alignment-baseline","middle")

 var svg4 = d3.select("#legend-4")

 // Handmade legend
 svg4.append("circle").attr("cx",10).attr("cy",25).attr("r", 6).style("fill", "#0047AB")
 svg4.append("circle").attr("cx",140).attr("cy",25).attr("r", 6).style("fill", "#6495ED")
 svg4.append("circle").attr("cx",300).attr("cy",25).attr("r", 6).style("fill", "#00008B")
 svg4.append("circle").attr("cx",420).attr("cy",25).attr("r", 6).style("fill", "#6F8FAF")
 svg4.append("text").attr("x", 20).attr("y", 25).text("Attendance Rate").style("font-size", "15px").attr("alignment-baseline","middle")
 svg4.append("text").attr("x", 150).attr("y", 25).text("Chronic Absenteeism").style("font-size", "15px").attr("alignment-baseline","middle")
 svg4.append("text").attr("x", 310).attr("y", 25).text("AbsenteeRate5").style("font-size", "15px").attr("alignment-baseline","middle")
 svg4.append("text").attr("x", 430).attr("y", 25).text("AbsenteeRate20").style("font-size", "15px").attr("alignment-baseline","middle")

 var svg5 = d3.select("#legend-5")

 // Handmade legend
 svg5.append("circle").attr("cx",10).attr("cy",25).attr("r", 6).style("fill", "#0047AB")
 svg5.append("circle").attr("cx",140).attr("cy",25).attr("r", 6).style("fill", "#6495ED")
 svg5.append("circle").attr("cx",300).attr("cy",25).attr("r", 6).style("fill", "#00008B")
 svg5.append("circle").attr("cx",420).attr("cy",25).attr("r", 6).style("fill", "#6F8FAF")
 svg5.append("text").attr("x", 20).attr("y", 25).text("Below Basic %").style("font-size", "15px").attr("alignment-baseline","middle")
 svg5.append("text").attr("x", 150).attr("y", 25).text("Basic %").style("font-size", "15px").attr("alignment-baseline","middle")
 svg5.append("text").attr("x", 310).attr("y", 25).text("Proficient %").style("font-size", "15px").attr("alignment-baseline","middle")
 svg5.append("text").attr("x", 430).attr("y", 25).text("Advanced %").style("font-size", "15px").attr("alignment-baseline","middle")