module.exports = function(casper, scenario) {
    // console.log("SCENARIO> " + scenario.label);
    require("./clickAndHoverHelper")(casper, scenario);
    // add more helpers here...
};
