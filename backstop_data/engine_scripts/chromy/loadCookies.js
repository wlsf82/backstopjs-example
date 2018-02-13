const fs = require("fs");

module.exports = function (chromy, scenario) {
    let cookies = [];
    const cookiePath = scenario.cookiePath;

    if (fs.existsSync(cookiePath)) {
        cookies = JSON.parse(fs.readFileSync(cookiePath));
    }

    cookies = cookies.map(cookie => {
        cookie.url = "https://" + cookie.domain;
        delete cookie.domain;
        return cookie;
    });

    chromy.setCookie(cookies);
    console.log("Cookie state restored with:", JSON.stringify(cookies, null, 2)); // eslint-disable-line no-console
};
