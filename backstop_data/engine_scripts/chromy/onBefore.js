module.exports = function (chromy, scenario) {
    require("./loadCookies")(chromy, scenario);

    chromy.ignoreCertificateErrors();
};
