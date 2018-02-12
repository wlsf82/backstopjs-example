module.exports = function (chromy, scenario, vp) {
  console.log('SCENARIO > ' + scenario.label);
  require('./clickAndHoverHelper')(chromy, scenario);
  // add more ready handlers here...
  // chromy
  //   .wait("#theLemur")
  //   .click("#theLemur")
  //   .wait(".header-logo-invertocat");
};
