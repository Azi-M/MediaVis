fileUrl = "data/data_1.csv";
//time changes August 2017
var timeSpan =2700;
var delayFactor =900;
var LeavesTansitionSpeed = 200;//300;
//
var outerWidth = document.getElementById('canvas').clientWidth;
var outerHeight = document.getElementById('canvas').clientHeight;

console.log(outerWidth);
console.log(outerHeight);

var blinkColor1 = "#ffffff";
var blinkColor2 = "gainsboro";

var completed=0;


var iBranch = 0;
//var height = 800,
//    width = 1200;
/*var div = d3.select("body").append("div") // Define the div for the tooltip
    .attr("class", "tooltip")
    .style("opacity", 0);
*/

var audio = new Audio();
var monoCircles=["null", "Relationship", "Business Strategies", "Child Free",  "Social Media", "Team Management", "New York", "Self Improvements", "General Design", "Habits", "Visual Perception", "Book Reviews", "Dataviz", "Etiquettes"];
var MediaType = ["null", "was online", "watched video", "listened to podcast", " read paper & magazine"];
var Duration = ["null", "for 1-3 mins", "for 3-10 mins", "for 10-20 mins", "for More than 20 mins"];
var What = ["null", "while relaxing", "when waiting", "while walking", "when relaxed after work", "when supposed to work", "while indulging in bed"];
var Click = ["null", "So much clicked with me", "Just ok", "Did not finish"];
var SentTo = ["", "sent to a friend", "sent to boy friend", "sent to coworkers"];
var ReceivedFrom = ["", "received from you", "received from person you know", "received from boy friend", "received from friend"];
var AH = 300, AW = 200;  //in case the screen is not set correctly


var totalScale=1;
var chartDiv = document.getElementById("canvas");

var main = d3.select(chartDiv)
    .classed("svg-container", true)
    .append('svg')
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-200 0 1200 1400")
    //class to make it responsive
    .classed("svg-content-responsive", true)
    .attr("transform", "scale("+totalScale+") translate(" + 0 + "," + 60 + ")");


var gr = main.append('g')
    .attr('transform', 'translate(' + 0 + ',' + 0 + ')');

var legend_layer = main.append('g')
    .attr('transform', 'translate(' + 75 + ',' + 25 + ')');

var myToolTip1=gr
    .append("text")
    .attr("id","toolTip1")
    .attr("x",-165)
    .attr("y",340);
var myToolTip2=gr
    .append("text")
    .attr("id","toolTip2")
    .attr("x",-165)
    .attr("y",355);
var myToolTip3=gr
    .append("text")
    .attr("id","toolTip3")
    .attr("x",-165)
    .attr("y",370);
var myToolTip4=gr
    .append("text")
    .attr("id","toolTip4")
    .attr("x",-165)
    .attr("y",385);



mainRun();
addLegend();


function redraw(){

    // Extract the width and height that was computed by CSS.
    var width = chartDiv.clientWidth;
    var height = chartDiv.clientHeight;

    // Use the extracted size to set the size of an SVG element.
    main
        .attr("width", width)
        .attr("height", height);
}
redraw();
window.addEventListener("resize", redraw);


function showtitle(id) {
var monocircle=d3.selectAll("#ThemonoCircle")
    .text(monoCircles[id]);
}

function clearTitle() {
    var monocircle=d3.selectAll("#ThemonoCircle")
        .text("");
}

function addLegend() {


    var writing1=gr
        .append("text")
        .attr("x",-165)
        .attr("y",40)
        .text("AZAM MAJOONI | NEU | 2017")
        .attr("fill","#8b9fb0")
        .attr("style","font-weight:100; font-family: sans-serif;font-size: 12px");

    var writing2=gr
        .append("text")
        .attr("x",-165)
        .attr("y",22)
        .text("MEDIA VIS")
        .attr("fill","#8b9fb0")
        .attr("style","font-weight: bold; font-family: 'Times New Roman';font-size: 30.5px");

    var writing3=gr
        .append("text")
        .attr("x",-165)
        .attr("y",303)
        .text("The Topic of Readings")
        .attr("fill","#325093");

    var onmouseOverTag=gr
        .append("text").attr("id","ThemonoCircle")
        .attr("x",-163)
        .attr("y",323)
        .text(" ")
        .attr("style","fill:darkgray;font-family: Menlo;font-weight: bold;font-size: 11px");






    var LegendData1 = ["Online article", "Video", "Listening to podcast", "Paper & magazine"];
    var LegendData2 = ["While relaxing", "When waiting", "While walking", "When relaxed after work", "When supposed to work", "While indulging in bed"];


    var legends = legend_layer.selectAll('.Legends1')
        .data(LegendData1)
        .enter()
        .append('g')
        .attr('id', function (d) {
            return "legendData1_" + d['index'];
        });

    //Topic of Readings
    circles = legends
        .append('circle')
        .attr('cx', function (d, i) {
            return -235;
        })
        .attr('cy', function (d, i) {
            return 60 + i * 20;
        })
        .attr('r', function (d, i) {
            return 5;
        })
        .style("opacity", "1")
        .attr("class", function (d, i) {
            return "C" + (i + 1) + "_l Leaves"
        })
        .attr("id", function (d, i) {
            return "l" + (i + 1)
        });
    legends
        .append("text")
        .attr("dx", function (d, i) {
            return -228;
        })
        .attr("dy", function (d, i) {
            return 65 + i * 20;
        })
        .text(function (d) {
            return d;
        })
        .attr("class", function (d, i) {
            return "legendText_" + (i + 1) + " Leaves"
        })
        .attr("id", function (d, i) {
            return "l" + (i + 1)
        })
        .exit();
    legends = legend_layer.selectAll('.Legends2')
        .data(LegendData2)
        .enter()
        .append('g')
        .attr('id', function (d) {
            return "legendData1_" + d['index'];
        });
    circles = legends
        .append('circle')
        .attr('cx', function (d, i) {
            return -236;
        })
        .attr('cy', function (d, i) {
            return 145 + i * 20;
        })
        .attr('r', function (d, i) {
            return 2;
        })
        .style("opacity", "1")
        .attr("class", function (d, i) {
            return "dot" + (i + 1) + "_l Leaves"
        })
        .attr('id', function (d, i) {
            return "dot" + eval(i + 1);
        });
    legends
        .append("text")
        .attr("dx", function (d, i) {
            return -228;
        })
        .attr("dy", function (d, i) {
            return 147 + i * 20;
        })
        .text(function (d) {
            return d;
        })
        .attr("class", function (d, i) {
            return "DlegendText_" + (i + 1) + " Leaves"
        })
        .attr('id', function (d, i) {
            return "dot" + eval(i + 1);
        })
        .exit();
}


function mainRun() {
    var delay = d3.scaleLinear()
        .domain([3, 7])
        .range([1000, 2000]);




    var S = [0, 0, delay(5), delay(7), delay(3), delay(3), delay(6), delay(5), delay(7), delay(5), delay(4), delay(2), delay(2), delay(3), delay(3)]
    var CUURENT_time = (timeSpan);
    //Phase 0: show horizontal line
    setTimeout(function () {
        ADDManualSVG('<line id="DatumLine" class="st0" x1="16.1" y1="300.1" x2="1000.1" y2="300.1"/>');
    }, 1);
//------------------------------------------------------------------------------------------
    //Phase 1: ICON 1
    iBranch = 1;
    //console.log(CUURENT_time);
    setTimeout(function () {
        ADDManualSVG('<circle class="st2" cx="138.4" cy="300.1" r="14.5"/>');
    }, CUURENT_time);
    setTimeout(function () {
        Paths('M138.5,119.5c61.1,19.6,63.9,67.5-5.3,64.5c-37.3-1.6-35.2,27-4.4,25.6c106-4.6,51.3,69.4-10.3,60.1', 'P1', 1);
    }, CUURENT_time + 1000);
    setTimeout(function () {
        ADDManualSVG("<circle id='T1' class='st1' cx='137.6' cy='300.1' r='14.5' onmouseout='clearTitle()' onmouseover='showtitle(1)'><animate xlink:href='#T1'attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "' dur='1s' begin='3s' repeatcount='3' id='Ti1'/></circle>");
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG("<g transform='scale(1)'>" +
            "<circle fill='#374976' cx='138.7' cy='293.7' r='0.7'/>" +
            "<circle fill='#374976' cx='140.3' cy='292.7' r='0.7'/>" +
            "<circle fill='#374976' cx='130.4' cy='302.3' r='0.9'/>" +
            "<circle fill='#374976' cx='147.4' cy='297.2' r='1'/>" +
            "<circle fill='#374976' cx='146.9' cy='299.4' r='0.9'/>" +
            "<circle fill='#374976' cx='146.6' cy='294.8' r='1.1'/>" +
            "<circle fill='#374976' cx='143.9' cy='303.2' r='0.7'/>" +
            "<circle fill='#374976' cx='142.3' cy='304.7' r='0.9'/>" +
            "<circle fill='#374976' cx='134' cy='305.6' r='1'/>" +
            "<circle fill='#374976' cx='132' cy='304' r='1'/>" +
            "<circle fill='#374976' cx='137.6' cy='308.4' r='1'/>" +
            "<circle fill='#374976' cx='135.7' cy='307.3' r='0.9'/>" +
            "<circle fill='#374976' cx='145.5' cy='301.5' r='0.9'/>" +
            "<circle fill='#374976' cx='140.9' cy='306' r='0.7'/>" +
            "<circle fill='#374976' cx='139.6' cy='307.3' r='0.8'/>" +
            "<circle fill='#374976' cx='127.9' cy='299.1' r='0.9'/>" +
            "<circle fill='#374976' cx='127.6' cy='296.9' r='0.8'/>" +
            "<circle fill='#374976' cx='130.4' cy='293' r='1.1'/>" +
            "<circle fill='#374976' cx='128.6' cy='294.8' r='1'/>" +
            "<circle fill='#374976' cx='136.7' cy='293.7' r='1'/>" +
            "<circle fill='#374976' cx='144.8' cy='293' r='1.1'/>" +
            "<circle fill='#374976' cx='142.4' cy='292.3' r='1'/>" +
            "<circle fill='#374976' cx='132.5' cy='292.3' r='0.8'/>" +
            "<circle fill='#374976' cx='134.8' cy='292.6' r='0.6'/>" +
            "<circle fill='#374976' cx='128.9' cy='300.9' r='0.8'/>" +
            "</g>")
    }, CUURENT_time);

//------------------------------------------------------------------------------------------

    //phase 2: Show the first Icon + Branch + Leaves
    iBranch = 2;//circ-anim.end
    CUURENT_time += (timeSpan + S[iBranch]);
    //console.log(CUURENT_time);
    setTimeout(function () {
        Paths('M169.5,342.6c0,0,159.8,66.8,44.4,116.2c-80.8,30.6-60.8,66.5-10.6,87.1', 'P2', 2);
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG('<circle id="T2" class="st1" cx="199.5" cy="300.1" r="14.5" onmouseout="clearTitle()" onmouseover="showtitle(2)">' + "<animate xlink:href='#T2' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='7s' repeatcount='3' id='Ti2'/>" + '</circle>');
    }, CUURENT_time);

    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='194.9' cy='293.4' r='0.8'/>" +
            "<circle fill='#374976' cx='194.9' cy='291.2' r='0.8'/>" +
            "<circle fill='#374976' cx='201.7' cy='291.2' r='1.1'/>" +
            "<circle fill='#374976' cx='201.7' cy='293.4' r='0.7'/>" +
            "<circle fill='#374976' cx='198.2' cy='291.2' r='1.1'/>" +
            "<circle fill='#374976' cx='208.6' cy='299.3' r='0.9'/>" +
            "<circle fill='#374976' cx='198.2' cy='296' r='1.2'/>" +
            "<circle fill='#374976' cx='192.3' cy='296' r='0.7'/>" +
            "<circle fill='#374976' cx='208.6' cy='302.2' r='1.1'/>" +
            "<circle fill='#374976' cx='194.9' cy='296' r='0.8'/>" +
            "<circle fill='#374976' cx='192.1' cy='305.8' r='0.8'/>" +
            "<circle fill='#374976' cx='189.4' cy='305.8' r='1'/>" +
            "<circle fill='#374976' cx='208.6' cy='305.8' r='1.1'/>" +
            "<circle fill='#374976' cx='201.7' cy='305.8' r='0.9'/>" +
            "<circle fill='#374976' cx='198.2' cy='305.8' r='1.2'/>" +
            "<circle fill='#374976' cx='194.9' cy='305.8' r='0.8'/>" +
            "<circle fill='#374976' cx='205.1' cy='305.8' r='1.2'/>" +
            "<circle fill='#374976' cx='208.6' cy='296' r='1.1'/>" +
            "<circle fill='#374976' cx='205.1' cy='296' r='1.1'/>" +
            "<circle fill='#374976' cx='201.7' cy='296' r='1'/>" +
            "<circle fill='#374976' cx='189.4' cy='299.1' r='1.2'/>" +
            "<circle fill='#374976' cx='189.4' cy='302.2' r='0.7'/>" +
            "<circle fill='#374976' cx='189.4' cy='296' r='0.8'/>" +
            "<circle fill='#374976' cx='194.9' cy='303.3' r='0.7'/>" +
            "<circle fill='#374976' cx='194.9' cy='298.6' r='0.7'/>" +
            "<circle fill='#374976' cx='194.9' cy='300.8' r='0.7'/>");
    }, CUURENT_time);


//------------------------------------------------------------------------------------------
    //phase 3: Show the first Icon + Branch + Leaves
    iBranch = 3;
    CUURENT_time += (timeSpan + S[iBranch]);
    //icon 3
    setTimeout(function () {
        Paths('M251.3,157.5c27.5-7,75.1,15.4-3.3,56.7c-53.6,28.3-5.6,53.7,13.1,66.3', 'P3', 3);
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG('<circle id="T3" class="st1" cx="260.6" cy="300.1" r="14.5" onmouseout="clearTitle()"  onmouseover="showtitle(3)">' + "<animate xlink:href='#T3' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='11.6s' repeatcount='3' id='Ti3'/>" + '</circle>');
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='262.1' cy='300.7' r='0.8'/>" +
            "<circle fill='#374976' cx='257.8' cy='302.2' r='1'/>" +
            "<circle fill='#374976' cx='263.7' cy='302.3' r='0.7'/>" +
            "<circle fill='#374976' cx='258.3' cy='296.8' r='0.7'/>" +
            "<circle fill='#374976' cx='259.2' cy='300.7' r='0.8'/>" +
            "<circle fill='#374976' cx='260.5' cy='299.3' r='0.7'/>" +
            "<circle fill='#374976' cx='259.4' cy='298' r='0.7'/>" +
            "<circle fill='#374976' cx='261.8' cy='298.2' r='0.7'/>" +
            "<circle fill='#374976' cx='263.2' cy='296.8' r='1'/>" +
            "<circle fill='#374976' cx='254.8' cy='298' r='1.2'/>" +
            "<circle fill='#374976' cx='254.9' cy='301.2' r='1.2'/>" +
            "<circle fill='#374976' cx='258.9' cy='305.1' r='0.8'/>" +
            "<circle fill='#374976' cx='259.2' cy='293.6' r='0.8'/>" +
            "<circle fill='#374976' cx='262.1' cy='293.5' r='0.7'/>" +
            "<circle fill='#374976' cx='261.9' cy='305.1' r='1'/>" +
            "<circle fill='#374976' cx='266.5' cy='298.2' r='1.1'/>" +
            "<circle fill='#374976' cx='266.5' cy='301.3' r='0.7'/>" +
            "<circle fill='#374976' cx='256.2' cy='303.9' r='0.8'/>" +
            "<circle fill='#374976' cx='264.8' cy='295.3' r='1.1'/>" +
            "<circle fill='#374976' cx='266.8' cy='293.3' r='1'/>" +
            "<circle fill='#374976' cx='254.4' cy='305.7' r='1'/>" +
            "<circle fill='#374976' cx='256.3' cy='295.1' r='1'/>" +
            "<circle fill='#374976' cx='265.1' cy='303.8' r='0.8'/>" +
            "<circle fill='#374976' cx='266.6' cy='305.4' r='0.8'/>" +
            "<circle fill='#374976' cx='254.4' cy='293.2' r='1.1'/>" +
            "<circle fill='#374976' cx='252.7' cy='291.5' r='0.7'/>" +
            "<circle fill='#374976' cx='268.4' cy='291.7' r='0.8'/>" +
            "<circle fill='#374976' cx='252.6' cy='307.5' r='1'/>" +
            "<circle fill='#374976' cx='268.6' cy='307.3' r='1.2'/>");
    }, CUURENT_time);

//------------------------------------------------------------------------------------------
    iBranch = 4;
    CUURENT_time += (timeSpan + S[iBranch]);
    //phase 4: Show the first Icon + Branch + Leaves
    //icon 4
    setTimeout(function () {
        Paths('M333.1,471.1c-27.5,7-75.1-15.4,3.3-56.7c53.6-28.3,5.1-79.1-13.1-93.4', 'P4', 4);
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG('<circle id="T4" class="st1" cx="323.6" cy="300.1" r="14.5" onmouseout="clearTitle()" onmouseover="showtitle(4)">' + "<animate xlink:href='#T4' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='15.3s' repeatcount='3' id='Ti4'/>" + '</circle>');
    }, CUURENT_time);

    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='317.1' cy='292.6' r='1'/>" +
            "<circle fill='#374976' cx='320.6' cy='293.1' r='1.4'/>" +
            "<circle fill='#374976' cx='326.7' cy='296.8' r='0.8'/>" +
            "<circle fill='#374976' cx='325' cy='305.4' r='1.2'/>" +
            "<circle fill='#374976' cx='330' cy='305.4' r='1.1'/>" +
            "<circle fill='#374976' cx='329.8' cy='302.4' r='0.9'/>" +
            "<circle fill='#374976' cx='328.4' cy='299.4' r='1.3'/>" +
            "<circle fill='#374976' cx='324.3' cy='294.7' r='1.2'/>" +
            "<circle fill='#374976' cx='324' cy='302.3' r='1.2'/>" +
            "<circle fill='#374976' cx='322.2' cy='299.8' r='1'/>" +
            "<circle fill='#374976' cx='320' cy='298.3' r='0.8'/>" +
            "<circle fill='#374976' cx='317.2' cy='297.6' r='1.2'/>" +
            "<circle fill='#374976' cx='318.1' cy='304.2' r='2.1'/>" +
            "");
    }, CUURENT_time);


//------------------------------------------------------------------------------------------
    //phase 5: Show the first Icon + Branch + Leaves
    iBranch = 5;
    CUURENT_time += (timeSpan + S[iBranch]);
//icon 5

    setTimeout(function () {
        Paths('M384.2,558.5c49.8,0,82.8-94.3,6.6-110.6c-72.5-15.6-47.4-122.3-6.3-117.3', 'P5', 5);
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG('<circle id="T5" class="st1" cx="385.1" cy="300.1" r="14.5" onmouseout="clearTitle()"  onmouseover="showtitle(5)">' + "<animate xlink:href='#T5' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='19' repeatcount='3' id='Ti5'/>" + '</circle>');
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='375.4' cy='300.5' r='1'/>" +
            "<circle fill='#374976' cx='373' cy='300.5' r='1'/>" +
            "<circle fill='#374976' cx='393.5' cy='300.5' r='1'/>" +
            "<circle fill='#374976' cx='396.2' cy='300.5' r='1.2'/>" +
            "<circle fill='#374976' cx='384.7' cy='305.6' r='1'/>" +
            "<circle fill='#374976' cx='384.7' cy='303' r='1.1'/>" +
            "<circle fill='#374976' cx='384.7' cy='300.5' r='0.8'/>" +
            "<circle fill='#374976' cx='384.7' cy='298.1' r='0.7'/>" +
            "<circle fill='#374976' cx='379' cy='298.1' r='0.8'/>" +
            "<circle fill='#374976' cx='379' cy='300.5' r='0.8'/>" +
            "<circle fill='#374976' cx='379' cy='303' r='1.2'/>" +
            "<circle fill='#374976' cx='379' cy='305.6' r='0.8'/>" +
            "<circle fill='#374976' cx='379' cy='293.5' r='2.1'/>" +
            "<circle fill='#374976' cx='384.7' cy='293.5' r='2.1'/>" +
            "<circle fill='#374976' cx='390.2' cy='305.6' r='1.1'/>" +
            "<circle fill='#374976' cx='390.2' cy='303' r='1'/>" +
            "<circle fill='#374976' cx='390.1' cy='300.5' r='0.8'/>" +
            "<circle fill='#374976' cx='390.2' cy='298.1' r='1.2'/>" +
            "<circle fill='#374976' cx='390.2' cy='293.5' r='2.1'/>" +
            "");
    }, CUURENT_time);

//------------------------------------------------------------------------------------------
    iBranch = 6;
    CUURENT_time += (timeSpan + S[iBranch]);
    //phase 6: Show the first Icon + Branch + Leaves

    //icon 6
    setTimeout(function () {
        Paths('M446.1,272.7c-41.3-9.6-64.9-48.6-3-59c102.9-17.4-47.5-72,0-110.4', 'P6', 6);
    }, CUURENT_time);

    setTimeout(function () {
        ADDManualSVG('<circle id="T6" class="st1" cx="445.8" cy="300.1" r="14.5"  onmouseout="clearTitle()" onmouseover="showtitle(6)">' + "<animate xlink:href='#T6' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='23s' repeatcount='3' id='Ti6'/>" + '</circle>');
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='446.6' cy='305.2' r='0.8'/>" +
            "<circle fill='#374976' cx='440.8' cy='308.8' r='0.8'/>" +
            "<circle fill='#374976' cx='440.8' cy='299.5' r='0.9'/>" +
            "<circle fill='#374976' cx='440.8' cy='294.3' r='1'/>" +
            "<circle fill='#374976' cx='440.8' cy='296.9' r='1'/>" +
            "<circle fill='#374976' cx='440.8' cy='291.6' r='0.9'/>" +
            "<circle fill='#374976' cx='446' cy='298.9' r='0.7'/>" +
            "<circle fill='#374976' cx='450.9' cy='302' r='0.7'/>" +
            "<circle fill='#374976' cx='448.9' cy='303.4' r='1.1'/>" +
            "<circle fill='#374976' cx='443.8' cy='311.6' r='1'/>" +
            "<circle fill='#374976' cx='440.8' cy='289.2' r='0.8'/>" +
            "<circle fill='#374976' cx='446.6' cy='309.3' r='0.9'/>" +
            "<circle fill='#374976' cx='444.9' cy='292.5' r='1.6'/>" +
            "<circle fill='#374976' cx='440.8' cy='287' r='0.7'/>" +
            "<circle fill='#374976' cx='448.9' cy='311.6' r='0.8'/>" +
            "<circle fill='#374976' cx='443.8' cy='297.8' r='1'/>" +
            "<circle fill='#374976' cx='448.9' cy='307.3' r='0.8'/>" +
            "<circle fill='#374976' cx='443.8' cy='300.7' r='1.1'/>" +
            "<circle fill='#374976' cx='440.8' cy='311.6' r='1'/>" +
            "<circle fill='#374976' cx='443.8' cy='307.1' r='1.2'/>" +
            "<circle fill='#374976' cx='440.8' cy='303.8' r='0.7'/>" +
            "<circle fill='#374976' cx='440.8' cy='301.7' r='0.8'/>" +
            "<circle fill='#374976' cx='446.6' cy='311.6' r='0.7'/>" +
            "<circle fill='#374976' cx='446.7' cy='290.6' r='0.7'/>" +
            "<circle fill='#374976' cx='447.4' cy='292.6' r='0.7'/>" +
            "<circle fill='#374976' cx='449' cy='292.6' r='0.7'/>" +
            "<circle fill='#374976' cx='447.9' cy='289.5' r='0.7'/>" +
            "<circle fill='#374976' cx='444.9' cy='290' r='0.7'/>" +
            "<circle fill='#374976' cx='444.9' cy='288.4' r='0.7'/>" +
            "<circle fill='#374976' cx='449.3' cy='297.2' r='1'/>" +
            "<circle fill='#374976' cx='442.9' cy='290.6' r='0.7'/>" +
            "<circle fill='#374976' cx='452.7' cy='300.7' r='0.8'/>" +
            "<circle fill='#374976' cx='454.6' cy='299.3' r='0.8'/>" +
            "<circle fill='#374976' cx='440.8' cy='306.3' r='0.5'/>" +
            "");
    }, CUURENT_time);

//------------------------------------------------------------------------------------------
//phase 7: Show the first Icon + Branch + Leaves
    iBranch = 7;
    CUURENT_time += (timeSpan + S[iBranch]);
    //icon 7
    setTimeout(function () {
        ADDManualSVG('<circle id="T7" class="st1" cx="508.5" cy="300.1" r="14.5" onmouseout="clearTitle()"  onmouseover="showtitle(7)">' + "<animate xlink:href='#T7' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='27s' repeatcount='3' id='Ti7'/>" + '</circle>');
    }, CUURENT_time);
    setTimeout(function () {
        Paths('M487.5,13c43.9,14,75.7,82.8,4,122.5c-29.9,16.6,81,48.3,46.3,46.9c-85.4-3.3-75.2,84-37.7,90.3', 'P7', 7);
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='504.6' cy='288.6' r='1.2'/>" +
            "<circle fill='#374976' cx='502.4' cy='290.8' r='1.2'/>" +
            "<circle fill='#374976' cx='502.3' cy='296.5' r='0.8'/>" +
            "<circle fill='#374976' cx='510.8' cy='288.5' r='0.8'/>" +
            "<circle fill='#374976' cx='512.9' cy='290.5' r='0.7'/>" +
            "<circle fill='#374976' cx='504.7' cy='298.5' r='1'/>" +
            "<circle fill='#374976' cx='512.7' cy='297' r='1.1'/>" +
            "<circle fill='#374976' cx='510.5' cy='299.1' r='0.7'/>" +
            "<circle fill='#374976' cx='501.4' cy='293.7' r='0.8'/>" +
            "<circle fill='#374976' cx='513.6' cy='293.7' r='1.1'/>" +
            "<circle fill='#374976' cx='512' cy='303.9' r='1'/>" +
            "<circle fill='#374976' cx='503.2' cy='303.9' r='1'/>" +
            "<circle fill='#374976' cx='507.7' cy='287.6' r='1'/>" +
            "<circle fill='#374976' cx='507.7' cy='299.9' r='0.8'/>" +
            "<circle fill='#374976' cx='507.7' cy='302.1' r='0.8'/>" +
            "<circle fill='#374976' cx='507.7' cy='311.8' r='1.1'/>" +
            "<circle fill='#374976' cx='514.3' cy='303.9' r='0.8'/>" +
            "<circle fill='#374976' cx='500.6' cy='303.9' r='1'/>" +
            "<circle fill='#374976' cx='507.7' cy='304.9' r='1.2'/>" +
            "<circle fill='#374976' cx='498.3' cy='304' r='0.7'/>" +
            "<circle fill='#374976' cx='507.7' cy='307.4' r='0.7'/>" +
            "<circle fill='#374976' cx='507.7' cy='309.5' r='0.7'/>" +
            "<circle fill='#374976' cx='516.6' cy='304' r='1.2'/>" +
            "");
    }, CUURENT_time);

//------------------------------------------------------------------------------------------
    iBranch = 8;
    CUURENT_time += (timeSpan + S[iBranch]);
    //icon 8
    setTimeout(function () {
        Paths('M558.7,321.5c-47.7,8.8-58.6,101.2,24.4,97.8c77.9-3.1,63.1,48.1,14.6,36.8 c-15.4-3.6-42.2-23.8-67.2,13.1', 'P8', 8);
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG('<circle id="T8" class="st1" cx="569" cy="300.1" r="14.5"  onmouseout="clearTitle()" onmouseover="showtitle(8)">' + "<animate xlink:href='#T8' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='32s' repeatcount='3' id='Ti8'/>" + '</circle>');
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='571.2' cy='299.3' r='0.7'/>" +
            "<circle fill='#374976' cx='574.1' cy='306.5' r='1.1'/>" +
            "<circle fill='#374976' cx='571.8' cy='308.8' r='0.7'/>" +
            "<circle fill='#374976' cx='560.5' cy='300.3' r='0.9'/>" +
            "<circle fill='#374976' cx='557.7' cy='298' r='1.5'/>" +
            "<circle fill='#374976' cx='566.4' cy='302.1' r='0.8'/>" +
            "<circle fill='#374976' cx='563.5' cy='301.4' r='0.8'/>" +
            "<circle fill='#374976' cx='576.3' cy='309.3' r='1'/>" +
            "<circle fill='#374976' cx='572.8' cy='290.3' r='1.6'/>" +
            "<circle fill='#374976' cx='573.2' cy='293.8' r='0.7'/>" +
            "<circle fill='#374976' cx='572.6' cy='296.9' r='0.7'/>" +
            "<circle fill='#374976' cx='576.6' cy='304.2' r='0.7'/>" +
            "<circle fill='#374976' cx='569.1' cy='310.5' r='1'/>" +
            "<circle fill='#374976' cx='569.1' cy='301.5' r='1'/>" +
            "<circle fill='#374976' cx='576' cy='301.5' r='0.9'/>" +
            "<circle fill='#374976' cx='579' cy='301.5' r='1.1'/>" +
            "<circle fill='#374976' cx='569.1' cy='307.4' r='0.8'/>" +
            "<circle fill='#374976' cx='572.5' cy='301.5' r='1.1'/>" +
            "<circle fill='#374976' cx='569.1' cy='304.8' r='0.8'/>" +
            "");
    }, CUURENT_time);


//------------------------------------------------------------------------------------------
    iBranch = 9;
    CUURENT_time += (timeSpan + S[iBranch]);
    //phase 9: Show the first Icon + Branch + Leaves

    //icon 9

    setTimeout(function () {
        Paths('M620.6,97.1c54.4-13.1,105.8,78.6,4.1,118.8c-62.8,24.8-14.3,48.9,1.9,50.6', 'P9', 9);
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG('<circle id="T9" class="st1" cx="629.903" cy="300.1" r="14.5" onmouseout="clearTitle()"  onmouseover="showtitle(9)">' + "<animate xlink:href='#T9' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='36s' repeatcount='3' id='Ti9'/>" + '</circle>');
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='626.5' cy='294.1' r='1.2'/>" +
            "<circle fill='#374976' cx='624.3' cy='296.4' r='1.2'/>" +
            "<circle fill='#374976' cx='624.2' cy='302' r='0.8'/>" +
            "<circle fill='#374976' cx='632.7' cy='294.1' r='0.8'/>" +
            "<circle fill='#374976' cx='634.8' cy='296' r='0.7'/>" +
            "<circle fill='#374976' cx='626.5' cy='304' r='1'/>" +
            "<circle fill='#374976' cx='634.6' cy='302.5' r='1.1'/>" +
            "<circle fill='#374976' cx='632.4' cy='304.7' r='0.7'/>" +
            "<circle fill='#374976' cx='623.3' cy='299.2' r='0.8'/>" +
            "<circle fill='#374976' cx='635.5' cy='299.2' r='1.1'/>" +
            "<circle fill='#374976' cx='638.3' cy='299.2' r='1'/>" +
            "<circle fill='#374976' cx='620.7' cy='299.2' r='1'/>" +
            "<circle fill='#374976' cx='629.6' cy='293.1' r='1'/>" +
            "<circle fill='#374976' cx='629.6' cy='305.4' r='0.8'/>" +
            "<circle fill='#374976' cx='629.6' cy='307.6' r='0.8'/>" +
            "<circle fill='#374976' cx='629.6' cy='290.4' r='1.1'/>" +
            "<circle fill='#374976' cx='629.6' cy='288' r='0.7'/>" +
            "<circle fill='#374976' cx='640.5' cy='299.2' r='0.8'/>" +
            "<circle fill='#374976' cx='618.1' cy='299.2' r='1'/>" +
            "<circle fill='#374976' cx='629.6' cy='310.4' r='1.2'/>" +
            "");
    }, CUURENT_time);

//------------------------------------------------------------------------------------------
    iBranch = 10;
    CUURENT_time += (timeSpan + S[iBranch]);
    //console.log(CUURENT_time);////console.log("br:"+iBranch+":"+S[iBranch]);
    //phase 10: Show the first Icon + Branch + Leaves
    //icon 10
    setTimeout(function () {
        Paths('M702.3,444c-27.5,7-75.1-15.4,3.3-56.7c53.6-28.3,5.6-53.7-13.1-66.3', 'P10', 10);
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG('<circle id="T10" class="st1" cx="691.7" cy="300.1" r="14.5" onmouseout="clearTitle()"  onmouseover="showtitle(10)">' + "<animate xlink:href='#T10' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='40s' repeatcount='3' id='Ti10'/>" + '</circle>');
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='700' cy='295.4' r='0.8'/>" +
            "<circle fill='#374976' cx='704.2' cy='300.1' r='0.7'/>" +
            "<circle fill='#374976' cx='695.3' cy='302.2' r='0.8'/>" +
            "<circle fill='#374976' cx='702.3' cy='297.5' r='0.9'/>" +
            "<circle fill='#374976' cx='684.3' cy='294.8' r='0.9'/>" +
            "<circle fill='#374976' cx='681.3' cy='297.4' r='1.1'/>" +
            "<circle fill='#374976' cx='693.7' cy='296.4' r='0.7'/>" +
            "<circle fill='#374976' cx='690.9' cy='296' r='0.6'/>" +
            "<circle fill='#374976' cx='685.7' cy='306.2' r='1'/>" +
            "<circle fill='#374976' cx='691.8' cy='300.2' r='1.9'/>" +
            "<circle fill='#374976' cx='694.4' cy='307.7' r='0.7'/>" +
            "<circle fill='#374976' cx='695.7' cy='298.8' r='0.8'/>" +
            "<circle fill='#374976' cx='697.1' cy='293.6' r='1.1'/>" +
            "<circle fill='#374976' cx='687.9' cy='301.7' r='0.8'/>" +
            "<circle fill='#374976' cx='692.8' cy='304' r='0.7'/>" +
            "<circle fill='#374976' cx='688.9' cy='307.3' r='1.1'/>" +
            "<circle fill='#374976' cx='690' cy='303.8' r='0.7'/>" +
            "<circle fill='#374976' cx='697.3' cy='306.4' r='1'/>" +
            "<circle fill='#374976' cx='700.2' cy='304.6' r='1'/>" +
            "<circle fill='#374976' cx='693.5' cy='292.3' r='0.9'/>" +
            "<circle fill='#374976' cx='681' cy='302.4' r='1.1'/>" +
            "<circle fill='#374976' cx='687' cy='293.2' r='0.7'/>" +
            "<circle fill='#374976' cx='702.5' cy='302.5' r='0.7'/>" +
            "<circle fill='#374976' cx='690.2' cy='292.3' r='0.6'/>" +
            "<circle fill='#374976' cx='683.3' cy='304.5' r='0.6'/>" +
            "<circle fill='#374976' cx='691.8' cy='308' r='0.6'/>" +
            "<circle fill='#374976' cx='679' cy='300' r='0.6'/>" +
            "<circle fill='#374976' cx='688.1' cy='298' r='0.6'/>" +
            "");
    }, CUURENT_time);

//------------------------------------------------------------------------------------------
    iBranch = 11;
    CUURENT_time += (timeSpan + S[iBranch]);
    //console.log(CUURENT_time);////console.log("br:"+iBranch+":"+S[iBranch]);
    //phase 11: Show the first Icon + Branch + Leaves

    //icon 11

    setTimeout(function () {
        Paths('M770.7,160.4c-64.5,3.3-64.5,89-22.9,77.5c55-15.3,50.4,31.9,6.7,34.8', 'P11', 11);
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG('<circle id="T11" class="st1" cx="754.2" cy="300.1" r="14.5" onmouseout="clearTitle()"  onmouseover="showtitle(11)">' + "<animate xlink:href='#T11' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='43s' repeatcount='3' id='Ti11'/>" + '</circle>');
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='748.1' cy='293.4' r='0.8'/>" +
            "<circle fill='#374976' cx='757.9' cy='309.3' r='0.9'/>" +
            "<circle fill='#374976' cx='748.1' cy='290.9' r='0.9'/>" +
            "<circle fill='#374976' cx='761' cy='299' r='1.1'/>" +
            "<circle fill='#374976' cx='761' cy='293.7' r='0.7'/>" +
            "<circle fill='#374976' cx='754' cy='309.3' r='1'/>" +
            "<circle fill='#374976' cx='748.1' cy='309.3' r='1'/>" +
            "<circle fill='#374976' cx='761' cy='296.1' r='0.8'/>" +
            "<circle fill='#374976' cx='748.1' cy='302.5' r='0.9'/>" +
            "<circle fill='#374976' cx='748.1' cy='299.5' r='1.1'/>" +
            "<circle fill='#374976' cx='748.1' cy='296.1' r='0.8'/>" +
            "<circle fill='#374976' cx='751.1' cy='309.3' r='0.8'/>" +
            "<circle fill='#374976' cx='748.1' cy='306' r='1.1'/>" +
            "<circle fill='#374976' cx='761' cy='309.3' r='1.1'/>" +
            "<circle fill='#374976' cx='761' cy='306' r='1'/>" +
            "<circle fill='#374976' cx='761' cy='302.5' r='1'/>" +
            "<circle fill='#374976' cx='757.9' cy='290.9' r='1.1'/>" +
            "<circle fill='#374976' cx='754' cy='290.9' r='0.7'/>" +
            "<circle fill='#374976' cx='761' cy='290.9' r='0.8'/>" +
            "<circle fill='#374976' cx='751.1' cy='290.9' r='0.7'/>" +
            "<circle fill='#374976' cx='752.1' cy='296.1' r='0.7'/>" +
            "<circle fill='#374976' cx='754.5' cy='296.1' r='0.7'/>" +
            "<circle fill='#374976' cx='756.9' cy='296.1' r='0.7'/>");
    }, CUURENT_time);

//------------------------------------------------------------------------------------------
    iBranch = 12;
    CUURENT_time += (timeSpan + S[iBranch]);
    //phase 12: Show the first Icon + Branch + Leaves
    //console.log(CUURENT_time)

    //icon 12
    setTimeout(function () {
        Paths('M825.1,449.2c-27.5,6.2-12.8-14.8,7.6-36.5c30-31.9,25.1-74.1-11-82.4', 'P12', 12);
    }, CUURENT_time);

    setTimeout(function () {
        ADDManualSVG('<circle id="T12" class="st1" cx="814.9" cy="300.1" r="14.5" onmouseout="clearTitle()"   onmouseover="showtitle(12)">' + "<animate xlink:href='#T12' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='47.4s' repeatcount='3' id='Ti12'/>" + '</circle>');
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='811.8' cy='299.7' r='1.3'/>" +
            "<circle fill='#374976' cx='809.4' cy='302.2' r='1.3'/>" +
            "<circle fill='#374976' cx='809.3' cy='308.5' r='0.9'/>" +
            "<circle fill='#374976' cx='818.6' cy='299.7' r='0.9'/>" +
            "<circle fill='#374976' cx='821' cy='301.9' r='0.8'/>" +
            "<circle fill='#374976' cx='811.9' cy='310.6' r='1.1'/>" +
            "<circle fill='#374976' cx='820.8' cy='309' r='1.2'/>" +
            "<circle fill='#374976' cx='818.4' cy='311.4' r='0.8'/>" +
            "<circle fill='#374976' cx='808.3' cy='305.4' r='0.9'/>" +
            "<circle fill='#374976' cx='821.7' cy='305.4' r='1.3'/>" +
            "<circle fill='#374976' cx='815.2' cy='298.6' r='1.1'/>" +
            "<circle fill='#374976' cx='815.2' cy='312.2' r='0.9'/>" +
            "<circle fill='#374976' cx='808.8' cy='291.2' r='1.1'/>" +
            "<circle fill='#374976' cx='808.8' cy='294.1' r='1.1'/>" +
            "<circle fill='#374976' cx='808.8' cy='296.6' r='0.8'/>" +
            "<circle fill='#374976' cx='818.7' cy='291' r='0.9'/>" +
            "<circle fill='#374976' cx='818.7' cy='294.1' r='1.3'/>" +
            "<circle fill='#374976' cx='818.7' cy='296.9' r='0.8'/>" +
            "<circle fill='#374976' cx='815.2' cy='294.1' r='1.2'/>" +
            "<circle fill='#374976' cx='815.2' cy='291.4' r='0.8'/>" +
            "<circle fill='#374976' cx='815.2' cy='288.9' r='0.8'/>" +
            "<circle fill='#374976' cx='811.8' cy='296.6' r='1.1'/>" +
            "<circle fill='#374976' cx='811.8' cy='294.1' r='0.9'/>" +
            "<circle fill='#374976' cx='811.9' cy='291.5' r='1.3'/>" +
            "");
    }, CUURENT_time);

//------------------------------------------------------------------------------------------
    iBranch = 13;
    CUURENT_time += (timeSpan + S[iBranch]);
    //icon 13
    setTimeout(function () {
        Paths('M883.2,279.3c80.2,2.3,68.6-91.4-25.5-54.5c-72.6,28.5-57.7-34-9.1-22.7 c15.4,3.6,42.2,23.8,67.2-13.1', 'P13', 13);
    }, CUURENT_time);
    setTimeout(function () {
        ADDManualSVG('<circle id="T13" class="st1" cx="877.2" cy="300.1" r="14.5" onmouseout="clearTitle()"   onmouseover="showtitle(13)">' + "<animate xlink:href='#T13' attributeName='fill' from='" + blinkColor1 + "' to='" + blinkColor2 + "'  dur='1s' begin='51.1s' repeatcount='3' id='Ti13'/>" + '</circle>');
    }, CUURENT_time);

    setTimeout(function () {
        ADDManualSVG("" +
            "<circle fill='#374976' cx='872.6' cy='290.4' r='1.1'/>" +
            "<circle fill='#374976' cx='870.4' cy='292.5' r='1'/>" +
            "<circle fill='#374976' cx='870.4' cy='298' r='0.8'/>" +
            "<circle fill='#374976' cx='872.6' cy='300' r='0.9'/>" +
            "<circle fill='#374976' cx='880.4' cy='298.5' r='1'/>" +
            "<circle fill='#374976' cx='878.4' cy='300.6' r='0.7'/>" +
            "<circle fill='#374976' cx='869.5' cy='295.3' r='0.8'/>" +
            "<circle fill='#374976' cx='881.1' cy='295.6' r='0.8'/>" +
            "<circle fill='#374976' cx='874.9' cy='289.2' r='0.8'/>" +
            "<circle fill='#374976' cx='875.6' cy='301.3' r='0.8'/>" +
            "<circle fill='#374976' cx='875.6' cy='303.5' r='0.8'/>" +
            "<circle fill='#374976' cx='875.6' cy='312.9' r='1'/>" +
            "<circle fill='#374976' cx='875.6' cy='306.2' r='1.1'/>" +
            "<circle fill='#374976' cx='871.8' cy='304.2' r='0.9'/>" +
            "<circle fill='#374976' cx='869.3' cy='304.2' r='0.9'/>" +
            "<circle fill='#374976' cx='867.1' cy='304.3' r='0.7'/>" +
            "<circle fill='#374976' cx='875.6' cy='308.6' r='0.7'/>" +
            "<circle fill='#374976' cx='875.6' cy='310.7' r='0.7'/>" +
            "<circle fill='#374976' cx='880.7' cy='302.2' r='0.9'/>" +
            "<circle fill='#374976' cx='882.2' cy='300.6' r='0.8'/>" +
            "<circle fill='#374976' cx='883.8' cy='299' r='1.1'/>" +
            "<circle fill='#374976' cx='882.6' cy='294' r='0.8'/>" +
            "<circle fill='#374976' cx='884.2' cy='295.6' r='0.7'/>" +
            "<circle fill='#374976' cx='878.6' cy='290' r='0.7'/>" +
            "<circle fill='#374976' cx='881.2' cy='292.5' r='0.7'/>" +
            "<circle fill='#374976' cx='879.9' cy='291.3' r='0.7'/>" +
            "<circle fill='#374976' cx='879.7' cy='287.1' r='0.8'/>" +
            "<circle fill='#374976' cx='882.6' cy='286.9' r='0.7'/>" +
            "<circle fill='#374976' cx='886.9' cy='291.4' r='1'/>" +
            "<circle fill='#374976' cx='887' cy='294.4' r='0.7'/>" +
            "<circle fill='#374976' cx='885.3' cy='288.6' r='1.1'/>" +
            "<circle fill='#374976' cx='877.1' cy='288.5' r='1'/>" +
            "<circle fill='#374976' cx='885.6' cy='297' r='0.8'/>" +
            "");
    }, CUURENT_time);
    setTimeout(function () {
        addCirclesAtEnd();
        completed=1;
    }, CUURENT_time);
    setTimeout(function () {
        branches();
    }, timeSpan + 2000);

//------------------------------------------------------------------------------------------


}


function ADDManualSVG(code) {
    main.append('g')
        .html(code)
        .style("opacity", 0)
        .transition()
        .duration(300)
        .style("opacity", 1)
}
function ADDManualSVG2(code, delay) {
    main.append('g')
        .html(code)
        .style("opacity", 0)
        .transition()
        .duration(delay)
        .style("opacity", 1)
}
function Paths(dValue, id, id2) {
    audio.src = "sounds/" + id2 + ".mp3";
    audio.loop = false;
    audio.play();
    var curves = main.append('path')
        .attr('d', dValue)
        .attr('class', 'path')
        .attr('id', id)
        .style('fill', 'none')
        .style('stroke', '#325093')
        .style('stroke', '.75')
        .style('stroke-miterlimit', '10')
        .attr('class', 'path')
        .on("click", function () {
            alert('ok');
            audio.src = "sounds/1.mp3";
            audio.loop = false;
            audio.play();
        });
}

function audioP(id) {
    audio.src = "sounds/" + id + ".mp3";
    console.log("sounds/" + id + ".mp3");
    audio.loop = false;
    audio.play();

}

function branches() {

    var plot = gr.append('g')
        .attr("id", "elements")
        .attr('transform', 'translate(' + AW + ',' + AH + ')');

    var guideline = gr.append("line")
        .attr("x1", "15")
        .attr("y1", "300")
        .attr("x2", "15")
        .attr("y2", "300")
        .transition()
        .duration(5000)
        .attr("y1", "0")

        .attr("class", "guideLine")
        .attr("id", "GuideLine");


    d3.csv(fileUrl + '?' + Math.floor(Math.random() * 1000), function (d) //the data file is loaded here
    {
        return { // the needed fields are arranged for further usage

            index: +d.Index,
            Topic: +d.Topic,
            Click: +d.Click,
            Duration: +d.Duration,
            MediaType: +d.MediaType,
            What: +d.What,
            SentTo: +d.SentTo,
            Received: +d.Received,
            Up_Down: +d.Up_Down,
            Branch: +d.Branch,
            Level: +d.level

        };
    }, ReaderP);

    function ReaderP(data) {                //main visualization

        /*Main Scales     */
        var VerLineScale = d3.scaleLinear()
            .domain([-7, 7])
            .range([200, -200]);
        var HorLineScale = d3.scaleLinear()
            .domain([1, 14])
            .range([0, 800]);

        var sizeScale = d3.scaleLinear()
            .domain([1, 4])
            .range([7, 15]);

//////////////////////////////////////
        /*  Leaves     */
        var Leaves = plot.selectAll('.Leaves')
            .data(data)
            .enter()
            .append('g')
            .attr('id', function (d) {
                return "l" + d['index'];
            })
            .append('circle')
            .attr('id', function (d) {
                return "l" + d.MediaType;
            })
            .on("mouseover", function (d) {
                var circleUnderMouse = this.id;
                if(completed==1) {
                    d3.selectAll('.Leaves').filter(function (b, i) {
                        return (this.id !== circleUnderMouse);
                    }).style("opacity", ".1");

                    d3.selectAll('.DoubleRing').filter(function (b, i) {
                        return (this.id !== circleUnderMouse);
                    }).style("opacity", ".1");


                    myToolTip1
                        .attr("style","fill:#325093;font-family: sans-serif;font-size: 13px")
                        .text("I " + MediaType[d.MediaType])
                        .style("opacity",0)
                        .transition()
                        .duration(200)
                        .style("opacity","1");
                    myToolTip2
                        .attr("style","fill:#325093;font-family: sans-serif;font-size: 13px")
                        .text(What[d.What])
                        .style("opacity",0)
                        .transition()
                        .duration(500)
                        .style("opacity","1");
                    myToolTip3
                        .attr("style","fill:#325093;font-family: sans-serif;font-size: 13px")
                        .text(Duration[d.Duration])
                        .style("opacity",0)
                        .transition()
                        .duration(700)
                        .style("opacity","1");
                    myToolTip4
                        .attr("style","fill:#325093;font-family: sans-serif;font-size: 13px")
                        .text(SentTo[d.SentTo])
                        .style("opacity",0)
                        .transition()
                        .duration(1000)
                        .style("opacity","1");
                        /*.append('g')
                        .html("<div id='pannel'>" +
                        "I " + MediaType[d.MediaType] + "<br>" + What[d.What] + "<br>" + Duration[d.Duration] + "<br>" + SentTo[d.SentTo] + "</div>")
                        .style("left", 73 + "px")
                        .style("top", 445 + "px")
                        .style("opacity", ".1")
                        // .attr("class","C"+d.MediaType+"_"+d.Click)
                        .transition()
                        .duration(1000)
                        .style("opacity", "1");
                        */
                }

            })
            .on("mouseout", function (d) {



                if(completed==1) {

                    var SelectedLeaves = d3.selectAll('*')
                        .transition()
                        .duration(300)
                        .style('opacity', function (b) {
                            return 1;
                        });
                    var a = d3.select('#pannel')
                        .transition()
                        .duration(400)
                        .style("opacity", "0");
                    var opacs = d3.selectAll(".Leaves")
                        .style('fill-opacity', 1);

                }

                myToolTip1
                    .transition()
                    .duration(1000)
                    .style("opacity","0");

                myToolTip2
                    .transition()
                    .duration(700)
                    .style("opacity","0");
                myToolTip3
                    .transition()
                    .duration(300)
                    .style("opacity","0");
                myToolTip4
                    .transition()
                    .duration(200)
                    .style("opacity","0");


            })
            .attr('cx', function (d, i) {
                if (d.Click == 1) {
                    return HorLineScale(-.1 + d['Branch'] - 1)
                }
                else {
                    return HorLineScale(.1 + d['Branch'] - 1)
                }
            })
            .attr('r', function (d) {
                return 0;//sizeScale(d.Duration);
            })
            .attr('class', function (d) {

                if (d.Click == 3) {
                    //  //console.log(d.MediaType);
                    return "C_empty" + d.MediaType + " Leaves";
                }
                else {
                    //     //console.log(d.MediaType);
                    return "C" + d.MediaType + "_" + d.Click + " Leaves";
                }
            })
            .transition()
            .duration(LeavesTansitionSpeed)
            .delay(function (d, i) {
                // //console.log("leave:"+d.Branch+":"+i * delayFactor)
                return i * delayFactor;

            })
            // .delay(function(d, i) { return d['Branch'] *3* delayFactor; })
            .style("opacity", "1")
            .attr('r', function (d, i) {

                ////console.log(d['Branch'] +"-"+i);
                return sizeScale(d.Duration);
            })
            .attr('cy', function (d, i) {
                if (d['Up_Down'] == 1) {
                    // //console.log(d['Level'])
                    return VerLineScale(d['Level']) - 16
                }
                else {
                    // //console.log(d['Level'])
                    return (VerLineScale(-1 * d['Level']) + 16)
                }

            });

//////////////////////////////
        /* small dots */
        var smallDots = plot.selectAll('.smallDots')
            .data(data)
            .enter()
            .append('circle')
            .style("opacity", "0")
            .attr('id', function (d) {
                return "dot" + d.What;
            })

            .attr('cx', function (d, i) {
                if (d.Click == 1) {
                    return HorLineScale(-.2 + d['Branch'] - 1) - sizeScale(d.Duration)
                }
                else {
                    return HorLineScale(.2 + d['Branch'] - 1) + sizeScale(d.Duration)
                }
            })
            .attr('r', function (d) {

                return 2;
            })
            .attr('class', function (d) {
                return "dot" + d.What + " Leaves";
            })
            .on("mouseover", function (d) {
                if(completed==1) {
                    var circleUnderMouse = this.id;
                    d3.selectAll('.Leaves').filter(function (b, i) {
                        return (this.id !== circleUnderMouse);
                    }).style("opacity", ".1");
                }
            })
            .on("mouseout", function (d) {
                if(completed==1) {
                    var SelectedLeaves = d3.selectAll('*')
                        .transition()
                        .duration(300)
                        .style('opacity', function (b) {
                            return 1;
                        });
                }
            })
            .transition()
            .duration(LeavesTansitionSpeed)
            .delay(function (d, i) {
                return i * delayFactor;
            })
            .style("opacity", "1")
            .attr('cy', function (d, i) {
                if (d['Up_Down'] == 1) {
                    // //console.log(d['Up_Down'])
                    return VerLineScale(d['Level']) - 16
                }
                else {
                    // //console.log(d['Up_Down'])
                    return (VerLineScale(-1 * d['Level']) + 16)
                }
            });

        /*rings around leaves*/

        var ringsDouble = plot.selectAll('.Rings')
            .data(data)
            .enter()
            .append('circle')
            .style("opacity", "0")
            .attr('class', function (d) {
                console.log("what is here?");
                return "DoubleRing";
            })
            .attr('id', function (d) {
                return "D_oubleRing" + d['index'];
            })

            .attr('cx', function (d, i) {
                if (d.Click == 1) {
                    return HorLineScale(-.1 + d['Branch'] - 1)
                }
                else {
                    return HorLineScale(.1 + d['Branch'] - 1)
                }
            })
            .attr('r', function (d) {
                return 0;
            })
            .transition()
            .duration(2000)
            .delay(function (d, i) {
                return i * delayFactor;
            })
            .style("opacity", "1")
            .attr('r', function (d) {
                return sizeScale(d.Duration + 2);
            })
            .attr('cy', function (d, i) {
                if (d['Up_Down'] == 1) {
                    return VerLineScale(d['Level']) - 16
                }
                else {

                    return (VerLineScale(-1 * d['Level']) + 16)
                }
            })
            .style("fill", "none")
            .style("stroke-width", ".6")
            .style("stroke", function (d) {
                if (d.Received == 1 || d.Received == 2 || d.Received == 3) {
                    return "#A897AC";
                }
                else {
                    return "#62A37A";
                }
            })
            .style("stroke-dasharray", function (d, i) {

                if (d.SentTo == 2 || d.Received == 3) {
                    // //console.log("ring"+d['index']);
                    return (2) + ",2";
                }
                else {
                    return (0) + ",0";
                }
            })
            .style("stroke-opacity", function (d) {
                if (d.SentTo == 1 || d.SentTo == 3 || d.Received == 1 || d.Received == 2 || d.Received == 4) {
                    return 1;
                }
                else {
                    return 0;
                }
            });


        var rings = plot.selectAll('.Rings')
            .data(data)
            .enter()
            .append('circle')
            .attr("class","DoubleRing")
            .attr('id', function (d) {
                return "ring" + d['index'];
            })

            .attr('cx', function (d, i) {
                if (d.Click == 1) {
                    return HorLineScale(-.1 + d['Branch'] - 1)
                }
                else {
                    return HorLineScale(.1 + d['Branch'] - 1)
                }
            })
            .attr('r', function (d) {
                return 0;
            })
            .transition()
            .duration(LeavesTansitionSpeed)
            .delay(function (d, i) {
                return i * delayFactor;
            })
            .attr('r', function (d) {
                return sizeScale(d.Duration) + 8;
            })
            .attr('cy', function (d, i) {
                if (d['Up_Down'] == 1) {
                    return VerLineScale(d['Level']) - 16
                }
                else {

                    return (VerLineScale(-1 * d['Level']) + 16)
                }
            })
            .style("fill", "none")
            .style("stroke-width", ".6")
            .style("stroke", function (d) {
                if (d.Received == 1 || d.Received == 2 || d.Received == 3) {
                    return "#A897AC";
                }
                else {
                    return "#62A37A";
                }
            })
            .style("stroke-dasharray", function (d, i) {

                if (d.SentTo == 2 || d.Received == 3) {
                    // //console.log("ring"+d['index']);
                    return (2) + ",2";
                }
                else {
                    return (0) + ",0";
                }
            })
            .style("stroke-opacity", function (d) {
                if (d.SentTo == 3 || d.Received == 2) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
    }

}
function addCirclesAtEnd() {
    ADDManualSVG2(strEnds, 3000);
}
