////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// SET UP SIDE MAP ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*
var SimVizWidth  = Number(d3.select("#simVizSimDiv").style("width").split("px")[0]);
var SimVizMapWidth  = 120;
var SimVizMapHeight = 824;
var SimVizSvgM   = d3.select("#simVizMapDiv").append("svg")
                      .attr("width",SimVizMapWidth)
                      .attr("height",SimVizMapHeight)
                      .attr("id","simSvgMap");

d3.json("./js/I55.json", function(error, myhighway) {
  if (error) throw error;

  var sideMapX = d3.scaleLinear()
                    .domain(  [
                                d3.min(myhighway, function(d) {return d.lon;}),
                                d3.max(myhighway, function(d) {return d.lon;})])
                    .range([10, SimVizMapWidth-10]);
  var sideMapY = d3.scaleLinear()
                    .domain(  [
                                d3.min(myhighway, function(d) {return d.lat;}),
                                d3.max(myhighway, function(d) {return d.lat;})])
                    .range([SimVizMapHeight, 0]);
  var highwayOverviewLineFunction = d3.line()
            .x(function(d) { return sideMapX(d.lon); })
            .y(function(d) { return sideMapY(d.lat); });

  var thisHighway = SimVizSvgM.append("path")
            .attr("d", function(){return highwayOverviewLineFunction(myhighway);} )
            .attr("stroke","#aaa")
            .attr("stroke-width",1)
            .attr("fill","none")
            .attr("class","highwayRouteOverview");
});
*/
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SET UP MULTI SIMS ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var pi = Math.PI,
    tau = 2 * pi;
var indexCounter = 0;
var simvizsvg1 = d3.select("#sim1").attr("class","simSvg"),
    simvizwidth = +simvizsvg1.attr("width"),
    simvizheight = +simvizsvg1.attr("height");
var simvizsvg2 = d3.select("#sim2").attr("class","simSvg");
var simvizsvg3 = d3.select("#sim3").attr("class","simSvg");
var simvizsvg4 = d3.select("#sim4").attr("class","simSvg");
var simvizsvg5 = d3.select("#sim5").attr("class","simSvg");
var simvizsvg6 = d3.select("#sim6").attr("class","simSvg");
var simvizsvg7 = d3.select("#sim7").attr("class","simSvg");


// Build all scales
var mysimcolors1 = d3.scaleLog().domain([1,3000000]).range(["#daefce","#5a9a33"]);
var mysimcolors2 = d3.scaleLog().domain([1,3000000]).range(["#dbf1ef","#58BFAC"]);
var mysimcolors3 = d3.scaleLog().domain([1,3000000]).range(["#abc7de","#4682B4"]);
var mysimcolors4 = d3.scaleLog().domain([1,3000000]).range(["#e7e8e9","#53575A"]);
var mysimcolors5 = d3.scaleLog().domain([1,3000000]).range(["#e4cce3","#914D90"]);
var mysimcolors6 = d3.scaleLog().domain([1,3000000]).range(["#f7c4bc","#ED7664"]);
var mysimcolors7 = d3.scaleLog().domain([1,3000000]).range(["#ffecc3","#FFC445"]);

var textColors1 = d3.scaleLinear().domain([0,0.9,1]).range(["#888","#888","#333"]);
var textColors2 = d3.scaleLinear().domain([0,0.9,1]).range(["#888","#888","#333"]);
var textColors3 = d3.scaleLinear().domain([0,0.9,1]).range(["#888","#888","#333"]);
var textColors4 = d3.scaleLinear().domain([0,0.9,1]).range(["#888","#888","#333"]);
var textColors5 = d3.scaleLinear().domain([0,0.9,1]).range(["#888","#888","#333"]);
var textColors6 = d3.scaleLinear().domain([0,0.9,1]).range(["#888","#888","#333"]);
var textColors7 = d3.scaleLinear().domain([0,0.9,1]).range(["#888","#888","#333"]);

var textSize1 = d3.scaleLinear().domain([0,0.9,1]).range([6,8,12]);
var textSize2 = d3.scaleLinear().domain([0,0.9,1]).range([6,8,12]);
var textSize3 = d3.scaleLinear().domain([0,0.9,1]).range([6,8,12]);
var textSize4 = d3.scaleLinear().domain([0,0.9,1]).range([6,8,12]);
var textSize5 = d3.scaleLinear().domain([0,0.9,1]).range([6,8,12]);
var textSize6 = d3.scaleLinear().domain([0,0.9,1]).range([6,8,12]);
var textSize7 = d3.scaleLinear().domain([0,0.9,1]).range([6,8,12]);

var myheight1 = d3.scaleLinear().domain([0,pi/2]).range([0.75*simvizheight,20]);
var myheight2 = d3.scaleLinear().domain([0,pi/2]).range([0.75*simvizheight,30]);
var myheight3 = d3.scaleLinear().domain([0,pi/2]).range([0.75*simvizheight,40]);
var myheight4 = d3.scaleLinear().domain([0,pi/2]).range([0.75*simvizheight,10]);
var myheight5 = d3.scaleLinear().domain([0,pi/2]).range([0.75*simvizheight,20]);
var myheight6 = d3.scaleLinear().domain([0,pi/2]).range([0.75*simvizheight,20]);
var myheight7 = d3.scaleLinear().domain([0,pi/2]).range([0.75*simvizheight,20]);


// Build the "grounds"
d3.selectAll(".simSvg").append("rect").attr("x",0).attr("y",0.75*simvizheight)
  .attr("width",width).attr("height",simvizheight*0.25)
  .attr("fill","#ddd");
// and the "roads"
d3.selectAll(".simSvg").append("path").attr("class","simRoad").style("fill","#eee")
  .attr("d","M" +0.25*simvizwidth+","+simvizheight+" L"+0.75*simvizwidth+","+simvizheight+" L"+0.51*simvizwidth+","+0.75*simvizheight+" L"+0.49*simvizwidth+","+0.75*simvizheight+" L"+0.25*simvizwidth+","+simvizheight);
d3.selectAll(".simSvg").append("text").attr("class","predictionText").attr("id",function(d,i){return ("predictionText"+(i+1));})
  .attr("x",10).attr("y",simvizheight-10).style("font-size","14px").text("prediction: ");

d3.select("#predictionText1").attr("fill","#69b93c");
d3.select("#predictionText2").attr("fill","#58BFAC");
d3.select("#predictionText3").attr("fill","#4682B4");
d3.select("#predictionText4").attr("fill","#53575A");
d3.select("#predictionText5").attr("fill","#914D90");
d3.select("#predictionText6").attr("fill","#ED7664");
d3.select("#predictionText7").attr("fill","#FFC445");


var simvizg1 = simvizsvg1.append("g");//.attr("transform", "translate(0," + (height*0.0) + ")");
var simvizg2 = simvizsvg2.append("g");//.attr("transform", "translate(0," + (height*0.0) + ")");
var simvizg3 = simvizsvg3.append("g");//.attr("transform", "translate(0," + (height*0.0) + ")");
var simvizg4 = simvizsvg4.append("g");//.attr("transform", "translate(0," + (height*0.0) + ")");
var simvizg5 = simvizsvg5.append("g");//.attr("transform", "translate(0," + (height*0.0) + ")");
var simvizg6 = simvizsvg6.append("g");//.attr("transform", "translate(0," + (height*0.0) + ")");
var simvizg7 = simvizsvg7.append("g");//.attr("transform", "translate(0," + (height*0.0) + ")");

d3.json("./data/simulationDemo.json", function(error, jsondata) {

  // update function
  function updateSimViz(jdata) {
    var t = d3.transition()
        .duration(800)
        .ease(d3.easeLinear);

    // update scales
    //mycolors1.domain(d3.extent(jdata, function(d){return d.pop/d.dist;}));
    //var textDomains1 = [mycolors1.domain()[0], 0.99*mycolors1.domain()[1], mycolors1.domain()[1]];
    //textColors1.domain(textDomains1);
    //textSize1.domain(textDomains1);

    var domainMax1 = d3.max(jdata, function(d){return model1(d.pop,d.dist);});
    var textDomains1 = [0, 0.99*domainMax1, domainMax1];
    textColors1.domain(textDomains1);
    textSize1.domain(textDomains1);

    var domainMax2 = d3.max(jdata, function(d){return model2(d.pop,d.dist);});
    var textDomains2 = [0, 0.99*domainMax2, domainMax2];
    textColors2.domain(textDomains2);
    textSize2.domain(textDomains2);

    var domainMax3 = d3.max(jdata, function(d){return model3(d.pop,d.dist);});
    var textDomains3 = [0, 0.99*domainMax3, domainMax3];
    textColors3.domain(textDomains3);
    textSize3.domain(textDomains3);

    var domainMax4 = d3.max(jdata, function(d){return model4(d.pop,d.dist);});
    var textDomains4 = [0, 0.99*domainMax4, domainMax4];
    textColors4.domain(textDomains4);
    textSize4.domain(textDomains4);

    var domainMax5 = d3.max(jdata, function(d){return model5(d.pop,d.dist);});
    var textDomains5 = [0, 0.99*domainMax5, domainMax5];
    textColors5.domain(textDomains5);
    textSize5.domain(textDomains5);

    var domainMax6 = d3.max(jdata, function(d){return model6(d.pop,d.dist);});
    var textDomains6 = [0, 0.99*domainMax6, domainMax6];
    textColors6.domain(textDomains6);
    textSize6.domain(textDomains6);

    var domainMax7 = d3.max(jdata, function(d){return model7(d.pop,d.dist);});
    var textDomains7 = [0, 0.99*domainMax7, domainMax7];
    textColors7.domain(textDomains7);
    textSize7.domain(textDomains7);

    // BEWARE SOURCE CODE SNOOPS.
    // WHAT LIES BELOW IS IDIOMATIC D3 AF
    /*
    ─────────▄──────────────▄
    ────────▌▒█───────────▄▀▒▌
    ────────▌▒▒▀▄───────▄▀▒▒▒▐
    ───────▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐
    ─────▄▄▀▒▒▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐           WOW
    ───▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀██▀▒▌
    ──▐▒▒▒▄▄▄▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄▒▒▌
    ──▌▒▒▐▄█▀▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐          MUCH IDIOMATIC
    ─▐▒▒▒▒▒▒▒▒▒▒▒▌██▀▒▒▒▒▒▒▒▒▀▄▌
    ─▌▒▀▄██▄▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▌
    ─▌▀▐▄█▄█▌▄▒▀▒▒▒▒▒▒░░░░░░▒▒▒▐         VERY D3
    ▐▒▀▐▀▐▀▒▒▄▄▒▄▒▒▒▒▒░░░░░░▒▒▒▒▌
    ▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒░░░░░░▒▒▒▐
    ─▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒▒▒░░░░▒▒▒▒▌
    ─▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐
    ──▀▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▒▒▒▒▌
    ────▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀
    ───▐▀▒▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀
    ──▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▀
    */

    ////////////////////////////////////////////////////////////////////////////
    // JOIN new data with old elements. ////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    var circleLabels1 = simvizg1.selectAll(".circleLabels1").data(jdata, function(d){ return d.id});
    var circleLabels2 = simvizg2.selectAll(".circleLabels2").data(jdata, function(d){ return d.id});
    var circleLabels3 = simvizg3.selectAll(".circleLabels3").data(jdata, function(d){ return d.id});
    var circleLabels4 = simvizg4.selectAll(".circleLabels4").data(jdata, function(d){ return d.id});
    var circleLabels5 = simvizg5.selectAll(".circleLabels5").data(jdata, function(d){ return d.id});
    var circleLabels6 = simvizg6.selectAll(".circleLabels6").data(jdata, function(d){ return d.id});
    var circleLabels7 = simvizg7.selectAll(".circleLabels7").data(jdata, function(d){ return d.id});

    var circles1 = simvizg1.selectAll(".circles1").data(jdata, function(d){ return d.id});
    var circles2 = simvizg2.selectAll(".circles2").data(jdata, function(d){ return d.id});
    var circles3 = simvizg3.selectAll(".circles3").data(jdata, function(d){ return d.id});
    var circles4 = simvizg4.selectAll(".circles4").data(jdata, function(d){ return d.id});
    var circles5 = simvizg5.selectAll(".circles5").data(jdata, function(d){ return d.id});
    var circles6 = simvizg6.selectAll(".circles6").data(jdata, function(d){ return d.id});
    var circles7 = simvizg7.selectAll(".circles7").data(jdata, function(d){ return d.id});

    ////////////////////////////////////////////////////////////////////////////
    // EXIT old elements not present in new data. //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    circles1.exit()
        .attr("class","circles1 exit").transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*50,myheight1(3.1415/2),d.dist);})
        .style("fill-opacity", 1e-6).remove();
    circleLabels1.exit()
        .attr("class","circleLabels1 exit").transition(t)
        .attr("y", -60).attr("x", function(d, i) { return 360-d.angle*50; })
        .style("fill-opacity", 1e-6).remove();

    circles2.exit()
        .attr("class","circles2 exit").transition(t)
        .attr("d", function(d,i){return trianglr(360-d.angle*50,myheight2(3.1415/2),0);})
        .style("fill-opacity", 1e-6).remove();
    circleLabels2.exit()
        .attr("class","circleLabels2 exit").transition(t)
        .attr("y", -60).attr("x", function(d, i) { return 360-d.angle*50; })
        .style("fill-opacity", 1e-6).remove();

    circles3.exit()
        .attr("class","circles3 exit").transition(t)
        .attr("d", function(d,i){return trianglr(360-d.angle*50,myheight3(3.1415/2),0);})
        .style("fill-opacity", 1e-6).remove();
    circleLabels3.exit()
        .attr("class","circleLabels3 exit").transition(t)
        .attr("y", -60).attr("x", function(d, i) { return 360-d.angle*50; })
        .style("fill-opacity", 1e-6).remove();

    circles4.exit()
        .attr("class","circles4 exit").transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*50,myheight4(3.1415/2),0);})
        .style("fill-opacity", 1e-6).remove();
    circleLabels4.exit()
        .attr("class","circleLabels4 exit").transition(t)
        .attr("y", -60).attr("x", function(d, i) { return 360-d.angle*50; })
        .style("fill-opacity", 1e-6).remove();

    circles5.exit()
        .attr("class","circles5 exit").transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*50,myheight5(3.1415/2),0);})
        .style("fill-opacity", 1e-6).remove();
    circleLabels5.exit()
        .attr("class","circleLabels5 exit").transition(t)
        .attr("y", -60).attr("x", function(d, i) { return 360-d.angle*50; })
        .style("fill-opacity", 1e-6).remove();

    circles6.exit()
        .attr("class","circles6 exit").transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*50,myheight6(3.1415/2),0);})
        .style("fill-opacity", 1e-6).remove();
    circleLabels6.exit()
        .attr("class","circleLabels6 exit").transition(t)
        .attr("y", -60).attr("x", function(d, i) { return 360-d.angle*50; })
        .style("fill-opacity", 1e-6).remove();

    circles7.exit()
        .attr("class","circles7 exit").transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*50,myheight7(3.1415/2),0);})
        .style("fill-opacity", 1e-6).remove();
    circleLabels7.exit()
        .attr("class","circleLabels7 exit").transition(t)
        .attr("y", -60).attr("x", function(d, i) { return 360-d.angle*50; })
        .style("fill-opacity", 1e-6).remove();


    ////////////////////////////////////////////////////////////////////////////
    // UPDATE old elements present in new data. ////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    circles1.attr("class", "circles1 update")
        .style("fill-opacity", 1).transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*8,myheight1(apparentH1(d.pop,d.dist)),d.dist);});
    circleLabels1.attr("class", "circleLabels1 update")
        .style("fill-opacity", 1).transition(t)
        .style("font-size",function(d,i){
                                        var newFontSize = textSize1(d.pop/d.dist);
                                        if (newFontSize>10){d3.select("#predictionText1").html('prediction: '+d.name)}
                                        return (newFontSize+"px");
                                        })
          .style("fill",function(d,i){return (textColors1(model1(d.pop,d.dist)));})
          .attr("y", function(d, i) { return myheight1(apparentH1(d.pop,d.dist)) })
          .attr("x", function(d, i) { return 360-d.angle*8; });

    circles2.attr("class", "circles2 update")
        .style("fill-opacity", 1).transition(t)
        .attr("d", function(d,i){return trianglr(360-d.angle*8,myheight2(apparentH2(d.pop,d.dist)),d.dist);});
    circleLabels2.attr("class", "circleLabels2 update")
        .style("fill-opacity", 1).transition(t)
      .style("font-size",function(d,i){
                                      var newFontSize = textSize2(model2(d.pop,d.dist));
                                      if (newFontSize>10){d3.select("#predictionText2").html('prediction: '+d.name)}
                                      return (newFontSize+"px");
                                      })
        .style("fill",function(d,i){return (textColors2(model2(d.pop,d.dist)));})
        .attr("y", function(d, i) { return myheight2(apparentH2(d.pop,d.dist)) })
        .attr("x", function(d, i) { return 360-d.angle*8; });

    circles3.attr("class", "circles3 update")
        .style("fill-opacity", 1).transition(t)
        .attr("d", function(d,i){return trianglr(360-d.angle*8,myheight3(apparentH3(d.pop,d.dist)),d.dist);});
    circleLabels3.attr("class", "circleLabels3 update")
        .style("fill-opacity", 1).transition(t)
      .style("font-size",function(d,i){
                                      var newFontSize = textSize3(model3(d.pop,d.dist));
                                      if (newFontSize>10){d3.select("#predictionText3").html('prediction: '+d.name)}
                                      return (newFontSize+"px");
                                      })
        .style("fill",function(d,i){return (textColors3(model3(d.pop,d.dist)));})
        .attr("y", function(d, i) { return myheight3(apparentH3(d.pop,d.dist)) })
        .attr("x", function(d, i) { return 360-d.angle*8; });

    circles4.attr("class", "circles4 update")
        .style("fill-opacity", 1).transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*8,myheight4(apparentH4(d.pop,d.dist)),d.dist);});
    circleLabels4.attr("class", "circleLabels4 update")
        .style("fill-opacity", 1).transition(t)
      .style("font-size",function(d,i){
                                      var newFontSize = textSize4(model4(d.pop,d.dist));
                                      if (newFontSize>10){d3.select("#predictionText4").html('prediction: '+d.name)}
                                      return (newFontSize+"px");
                                      })
        .style("fill",function(d,i){return (textColors4(model4(d.pop,d.dist)));})
        .attr("y", function(d, i) { return myheight4(apparentH4(d.pop,d.dist)) })
        .attr("x", function(d, i) { return 360-d.angle*8; });

    circles5.attr("class", "circles5 update")
        .style("fill-opacity", 1).transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*8,myheight5(apparentH5(d.pop,d.dist)),d.dist);});
    circleLabels5.attr("class", "circleLabels5 update")
        .style("fill-opacity", 1).transition(t)
      .style("font-size",function(d,i){
                                      var newFontSize = textSize5(model5(d.pop,d.dist));
                                      if (newFontSize>10){d3.select("#predictionText5").html('prediction: '+d.name)}
                                      return (newFontSize+"px");
                                      })
        .style("fill",function(d,i){return (textColors5(model5(d.pop,d.dist)));})
        .attr("y", function(d, i) { return myheight5(apparentH5(d.pop,d.dist)) })
        .attr("x", function(d, i) { return 360-d.angle*8; });

    circles6.attr("class", "circles6 update")
        .style("fill-opacity", 1).transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*8,myheight6(apparentH6(d.pop,d.dist)),d.dist);});
    circleLabels6.attr("class", "circleLabels6 update")
        .style("fill-opacity", 1).transition(t)
      .style("font-size",function(d,i){
                                      var newFontSize = textSize6(model6(d.pop,d.dist));
                                      if (newFontSize>10){d3.select("#predictionText6").html('prediction: '+d.name)}
                                      return (newFontSize+"px");
                                      })
        .style("fill",function(d,i){return (textColors6(model6(d.pop,d.dist)));})
        .attr("y", function(d, i) { return myheight6(apparentH6(d.pop,d.dist)) })
        .attr("x", function(d, i) { return 360-d.angle*8; });

    circles7.attr("class", "circles7 update")
        .style("fill-opacity", 1).transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*8,myheight7(apparentH7(d.pop,d.dist)),d.dist);});
    circleLabels7.attr("class", "circleLabels7 update")
        .style("fill-opacity", 1).transition(t)
      .style("font-size",function(d,i){
                                      var newFontSize = textSize7(model7(d.pop,d.dist));
                                      if (newFontSize>10){d3.select("#predictionText7").html('prediction: '+d.name)}
                                      return (newFontSize+"px");
                                      })
        .style("fill",function(d,i){return (textColors7(model7(d.pop,d.dist)));})
        .attr("y", function(d, i) { return myheight7(apparentH7(d.pop,d.dist)) })
        .attr("x", function(d, i) { return 360-d.angle*8; });


    ////////////////////////////////////////////////////////////////////////////
    // ENTER new elements present in new data. /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    circleLabels1.enter().append("text")
        .attr("class", "circleLabels1 enter")
        .attr("y", 0).attr("x", function(d, i) { return 360-d.angle*200; })
        .style("font-size",function(d,i){return (textSize1(model1(d.pop,d.dist))+"px");})
        .style("fill",function(d,i){return (textColors1(model1(d.pop,d.dist)));})
        .style("fill-opacity", 1e-6).text(function(d) { return d.name; })
      .transition(t)
        .attr("x", function(d, i) { return 360-d.angle*8; }).style("fill-opacity", 1);
    circles1.enter().append("path")
        .attr("class", "circles1 enter").attr("d", function(d,i){return towerr(360-d.angle*200,0,9999999999);})
        .style("fill",function(d,i){return (mysimcolors1(d.pop));}).style("fill-opacity", 1e-6)
      .transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*8,myheight1(apparentH1(d.pop,d.dist)),d.dist);}).style("fill-opacity", 1);

    circleLabels2.enter().append("text")
        .attr("class", "circleLabels2 enter")
        .attr("y", 0).attr("x", function(d, i) { return 360-d.angle*200; })
        .style("font-size",function(d,i){return (textSize2(model2(d.pop,d.dist))+"px");})
        .style("fill",function(d,i){return (textColors2(model2(d.pop,d.dist)));})
        .style("fill-opacity", 1e-6).text(function(d) { return d.name; })
      .transition(t)
        .attr("x", function(d, i) { return 360-d.angle*8; }).style("fill-opacity", 1);
    circles2.enter().append("path")
        .attr("class", "circles2 enter").attr("d", function(d,i){return trianglr(360-d.angle*200,0,9999999999);})
        .style("fill",function(d,i){return (mysimcolors2(d.pop));}).style("fill-opacity", 1e-6)
      .transition(t)
        .attr("d", function(d,i){return trianglr(360-d.angle*8,myheight2(apparentH2(d.pop,d.dist)),d.dist);}).style("fill-opacity", 1);

    circleLabels3.enter().append("text")
        .attr("class", "circleLabels3 enter")
        .attr("y", 0).attr("x", function(d, i) { return 360-d.angle*200; })
        .style("font-size",function(d,i){return (textSize3(model3(d.pop,d.dist))+"px");})
        .style("fill",function(d,i){return (textColors3(model3(d.pop,d.dist)));})
        .style("fill-opacity", 1e-6).text(function(d) { return d.name; })
      .transition(t)
        .attr("x", function(d, i) { return 360-d.angle*8; }).style("fill-opacity", 1);
    circles3.enter().append("path")
        .attr("class", "circles3 enter").attr("d", function(d,i){return trianglr(360-d.angle*200,0,9999999999);})
        .style("fill",function(d,i){return (mysimcolors3(d.pop));}).style("fill-opacity", 1e-6)
      .transition(t)
        .attr("d", function(d,i){return trianglr(360-d.angle*8,myheight3(apparentH3(d.pop,d.dist)),d.dist);}).style("fill-opacity", 1);

    circleLabels4.enter().append("text")
        .attr("class", "circleLabels4 enter")
        .attr("y", 0).attr("x", function(d, i) { return 360-d.angle*200; })
        .style("font-size",function(d,i){return (textSize4(model4(d.pop,d.dist))+"px");})
        .style("fill",function(d,i){return (textColors4(model4(d.pop,d.dist)));})
        .style("fill-opacity", 1e-6).text(function(d) { return d.name; })
      .transition(t)
        .attr("x", function(d, i) { return 360-d.angle*8; }).style("fill-opacity", 1);
    circles4.enter().append("path")
        .attr("class", "circles4 enter").attr("d", function(d,i){return towerr(360-d.angle*200,0,9999999999);})
        .style("fill",function(d,i){return (mysimcolors4(d.pop));}).style("fill-opacity", 1e-6)
      .transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*8,myheight4(apparentH4(d.pop,d.dist)),d.dist);}).style("fill-opacity", 1);

    circleLabels5.enter().append("text")
        .attr("class", "circleLabels5 enter")
        .attr("y", 0).attr("x", function(d, i) { return 360-d.angle*200; })
        .style("font-size",function(d,i){return (textSize5(model5(d.pop,d.dist))+"px");})
        .style("fill",function(d,i){return (textColors5(model5(d.pop,d.dist)));})
        .style("fill-opacity", 1e-6).text(function(d) { return d.name; })
      .transition(t)
        .attr("x", function(d, i) { return 360-d.angle*8; }).style("fill-opacity", 1);
    circles5.enter().append("path")
        .attr("class", "circles5 enter").attr("d", function(d,i){return towerr(360-d.angle*200,0,9999999999);})
        .style("fill",function(d,i){return (mysimcolors5(d.pop));}).style("fill-opacity", 1e-6)
      .transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*8,myheight5(apparentH5(d.pop,d.dist)),d.dist);}).style("fill-opacity", 1);

    circleLabels6.enter().append("text")
        .attr("class", "circleLabels6 enter")
        .attr("y", 0).attr("x", function(d, i) { return 360-d.angle*200; })
        .style("font-size",function(d,i){return (textSize6(model6(d.pop,d.dist))+"px");})
        .style("fill",function(d,i){return (textColors6(model6(d.pop,d.dist)));})
        .style("fill-opacity", 1e-6).text(function(d) { return d.name; })
      .transition(t)
        .attr("x", function(d, i) { return 360-d.angle*8; }).style("fill-opacity", 1);
    circles6.enter().append("path")
        .attr("class", "circles6 enter").attr("d", function(d,i){return towerr(360-d.angle*200,0,9999999999);})
        .style("fill",function(d,i){return (mysimcolors6(d.pop));}).style("fill-opacity", 1e-6)
      .transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*8,myheight6(apparentH6(d.pop,d.dist)),d.dist);}).style("fill-opacity", 1);

    circleLabels7.enter().append("text")
        .attr("class", "circleLabels7 enter")
        .attr("y", 0).attr("x", function(d, i) { return 360-d.angle*200; })
        .style("font-size",function(d,i){return (textSize7(model7(d.pop,d.dist))+"px");})
        .style("fill",function(d,i){return (textColors7(model7(d.pop,d.dist)));})
        .style("fill-opacity", 1e-6).text(function(d) { return d.name; })
      .transition(t)
        .attr("x", function(d, i) { return 360-d.angle*8; }).style("fill-opacity", 1);
    circles7.enter().append("path")
        .attr("class", "circles7 enter").attr("d", function(d,i){return towerr(360-d.angle*200,0,9999999999);})
        .style("fill",function(d,i){return (mysimcolors7(d.pop));}).style("fill-opacity", 1e-6)
      .transition(t)
        .attr("d", function(d,i){return towerr(360-d.angle*8,myheight7(apparentH7(d.pop,d.dist)),d.dist);}).style("fill-opacity", 1);
  } //end update loop


  // The initial display.
  //updateSimViz(jsondata[0].cities);

  // Grab a random sample of letters from the alphabet, in alphabetical order.
  d3.interval(function() {
    // do this if it's in view
    if(GlobalVizView.simViz){
      indexCounter = (indexCounter+1)%(jsondata.length);
      console.log('sim stage: '+indexCounter);
      updateSimViz(jsondata[indexCounter].cities);
    }
  }, 800);


}); //end JSON dependency







function model1(p,d){ return (p/d);}
function model2(p,d){ return (Math.sqrt(p)/d);}
function model3(p,d){ return (Math.pow(p,1/3)/d);}
function model4(p,d){ return (p*p/d);}
function model5(p,d){ return (p*(d<805));}
function model6(p,d){ return (p*(d<161));}
function model7(p,d){ return (p*(d<80.5));}
function apparentH1(p,d){ return (Math.atan2(p/200,d));}
function apparentH2(p,d){ return (Math.atan2(Math.sqrt(p),d));}
function apparentH3(p,d){ return (Math.atan2(3*Math.pow(p,1/3),d));}
function apparentH4(p,d){ return (Math.atan2(p*p/2000000,d));}
function apparentH5(p,d){ return (Math.atan2(p/200*(d<805),d));}
function apparentH6(p,d){ return (Math.atan2(p/200*(d<161),d));}
function apparentH7(p,d){ return (Math.atan2(p/200*(d<80.5),d));}


function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

function towerr(x,myheight,dist){
  var myTallness = 0.75*simvizheight-myheight;
  var offset = Math.atan2(1,dist)/(3.14159/2)*0.25*simvizheight;
  var mywidth = 1+Math.atan2(1,dist/10)/(3.14159/2)*12;
  return ("M " + (x+mywidth) + " " + (myheight+offset) + " L " + (x-mywidth) + " " + (myheight+offset) + " L " + (x-mywidth) + " " + (0.75*simvizheight+offset) + "L " + (x+mywidth) + " " + (0.75*simvizheight+offset) + " Z");
}
function trianglr(x,myheight,dist){
  var myTallness = 0.75*simvizheight-myheight;
  var offset = Math.atan2(1,dist)/(3.14159/2)*0.25*simvizheight;
  return ("M " + x + " " + (myheight+offset) + " L " + (x-myTallness/2) + " " + (0.75*simvizheight+offset) + "L " + (x+myTallness/2) + " " + (0.75*simvizheight+offset) + " Z");
}
function pyramidr(x,myheight,dist){
  var myTallness = 0.75*simvizheight-myheight;
  var offset = Math.atan2(1,dist)/(3.14159/2)*0.25*simvizheight;
  return ("M " + x + " " + (myheight+offset) + " L " + (x-myTallness/1.5) + " " + (0.75*simvizheight+offset) + "L " + (x+myTallness/1.5) + " " + (0.75*simvizheight+offset) + " Z");
}
