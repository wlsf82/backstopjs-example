module.exports = function (chromy, scenario) {
    // console.log("SCENARIO > " + scenario.label);
    require("./clickAndHoverHelper")(chromy, scenario);
    // add more ready handlers here...
    // chromy
    //   .wait("#theLemur")
    //   .click("#theLemur")
    //   .wait(".header-logo-invertocat");
};
