# Visual regression testing with BackstopJS
## Basics:
Go to this URL, download and install the  latest LTS version of NodeJS compatible with your operating system: https://nodejs.org

Run the below commands to check the NodeJS and NPM versions:
```
$ node -v
v8.9.4
$ npm -v
5.6.0
```

### Project bootstrap:
Run the below commands to create an example project to work on:
```
$ mkdir backstopjs-example
$ cd backstopjs-example
$ git init
$ npm init
$ npm i backstopjs -D
```

#### Create a git ignore file:
`$ touch .gitignore`

#### Update the .gitignore file with the following content:
```
node_modules
backstop_data/bitmaps_test/
backstop_data/html_report/
```

#### Run the following command to create the basic backstopjs structure:
`$ npx backstopjs init`

The above command creates the following files and directories:
```
backstop_data/engine_scripts/cookies.json
backstop_data/engine_scripts/onBefore.js
backstop_data/engine_scripts/onReady.js

backstop_data/engine_scripts/casper/clickAndHoverHelper.js
backstop_data/engine_scripts/casper/loadCookies.js
backstop_data/engine_scripts/casper/onBefore.js
backstop_data/engine_scripts/casper/onReady.js
backstop_data/engine_scripts/casper/waitForHelperHelper.js

backstop_data/engine_scripts/chromy/clickAndHoverHelper.js
backstop_data/engine_scripts/chromy/loadCookies.js
backstop_data/engine_scripts/chromy/onBefore.js
backstop_data/engine_scripts/chromy/onReady.js

backstop.json
```

#### Update package.json with the following scripts:
```
"scripts": {
    "test:visual": "rm -rf backstop_data/bitmaps_test && backstop test",
    "test:visual:approve": "backstop approve"
},
```

### Run the tests for the first time:
`$ npm run test:visual`

Note: tests will fail since there are no bitmap references to compare.

### Approve bitmap references and re-run tests:
`$ npm run test:visual:approve && npm run test:visual`

Note: tests should pass!

Let's create our first commit!
```
$ git add .
$ git commit -m 'add basic structure to run visual regression tests with backstopjs'
```

Note: with this configuration tests will be executed in Chrome.

## Going forward:
### Setting Chrome flags to simulate and let browser uses a fake media stream device:
On `backstop.json` file, below the `engine` configuration, add the following:
```
"engineOptions": {
    "chromeFlags": [
        "--use-fake-ui-for-media-stream",
        "--use-fake-device-for-media-stream"
    ]
},
```

Note: any other flag can be set the same way.

Note 2: change `backstop.json` file back to its origial state after experimenting with this.

### Emulating a mobile device:
On `backstop_data/engine_scripts/chromy/onBefore.js`:

#### Add the following to emulate an Android mobile device:
```
module.exports = function (chromy, scenario, vp) {
    if(vp.label === "phone") {
        chromy.emulate("Nexus6P");  
    }
};
```

#### Or add the following to emulate an iPhone device:
```
module.exports = function (chromy, scenario, vp) {
    if(vp.label === "phone") {
        chromy.emulate("iPhone6");
    }
};
```

Note: this will set things such as the `userAgent`.

Note 2: it's also possible to set a custom device. See how to do it here: https://github.com/garris/BackstopJS#using-chromy-static-functions

Note 3: change `backstop_data/engine_scripts/chromy/onBefore.js` file back to its origial state after experimenting with this.

### Interacting with the application before tests start running to create the desired application state:
Edit the file `backstop_data/engine_scripts/chromy/onReady.js` with the following code:
```
module.exports = function (chromy, scenario, vp) {
    console.log('SCENARIO > ' + scenario.label);
    require('./clickAndHoverHelper')(chromy, scenario);
    // add more ready handlers here...
    chromy
        .wait("#theLemur")
        .click("#theLemur")
        .wait(".header-logo-invertocat");
};
```

By default backstop will set the following configuration on `backstop.json` file:

`"onReadyScript": "chromy/onReady.js",`

So, by editing such file with chromy's command, we set a specific application state before the bitmap comparison of every test is run.

Note: `onReadyScript`, as well as `onBeforeScript`, can also be set to specific test scenarios, to generate a specific scenario state.
Detailed information about this can be found here: https://github.com/garris/BackstopJS#running-custom-scripts

Note 2: change `backstop_data/engine_scripts/chromy/onReady.js` file back to its origial state after experimenting with this.

### Testing specific components:
Add the following new scenario to the `backstop.json` file:
```
{
    "label": "BackstopJS logo",
    "url": "https://garris.github.io/BackstopJS/",
    "selectors": ["#theLemur"],
    "readySelector": "#theLemur",
    "misMatchThreshold" : 0.1,
    "requireSameDimensions": true
}
```

#### Run the test suite with the new test:
`$ npm run test:visual`

Note: the new test should fail since there is no bitmap reference to compare.

#### Approve the bitmap reference and re-run the tests:
`$ npm run test:visual:approve && npm run test:visual`

Note: tests should pass again!

Note 2: the new test compares only the specified component, in this case, the element with `id` equal to `theLemur`.

Commit this new changes to have your project updated with the new test scenario.
```
$ git add .
$ git commit -m 'update project with test for specific component'
```

### Removing a selector from the comparison:

Sometimes, due to dynamic content we may want to not consider a specific selector when during the visual comparison. Another reason for not considering a specific selector can be because it is interfering in the tests of another specific component.

Update the newest test scenario on `backstop.json` file with the following code right below the `"readySelector": "#theLemur",` line:

`"removeSelectors": [".BackstopJS3"],`

#### Run tests again:
`$ npm run test:visual`

Note: the updated test should fail because the bitmap reference has part of the element that is being removed from the test, so that it needs to be updated.

#### Approve the bitmap reference and re-run the tests:
`$ npm run test:visual:approve && npm run test:visual`

Note: tests should pass again!

Commit this last changes to have your project updated not considering the removed selector in the test of the specific component.
```
$ git add .
$ git commit -m 'update project with test for specific component'
```
___
Read the complete documentation of BackstopJS here: https://github.com/garris/BackstopJS
