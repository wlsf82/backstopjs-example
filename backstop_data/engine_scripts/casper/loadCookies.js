const fs = require("fs");

module.exports = function (casper, scenario) {
    let cookies = [];
    const cookiePath = scenario.cookiePath;

    if (fs.exists(cookiePath)) {
        cookies = JSON.parse(fs.read(cookiePath));
    }

    casper.page.cookies = cookies;
    casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36");
};
