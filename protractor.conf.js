var request = require("request");
var Agent = require("socks5-https-client/lib/Agent");

exports.config = {
  seleniumAddress: "http://hub-cloud.browserstack.com/wd/hub",

  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),

  specs: ["features/*.feature"],
  cucumberOpts: {
    require: "features/steps/*_steps.js",
    format: "pretty",
  },
  commonCapabilities: {
    "browserstack.user": "derekross2",
    "browserstack.key": "xQSPtYh8qs29CBNRJ559",
    name: "Bstack-[Protractor-Cucumber] Test",
    build: "Bstack-[Protractor-Cucumber] Build",
  },

  multiCapabilities: [
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      browser_version: "80.0 beta",
      resolution: "1024x768",
    },
    // {
    //   os: "Windows",
    //   os_version: "10",
    //   browserName: "Chrome",
    //   // "browserstack.local": true,
    //   browser_version: "80.0 beta",
    //   resolution: "1024x768",
    // },
  ],

  onPrepare: function () {
    var caps = browser.getCapabilities();
    console.log(caps);
  },

  onComplete: function () {
    var updateStatus = function (jobName) {
      browser.getSession().then(function (session) {
        sessionId = session.getId();
        console.log(sessionId);
        var request = require("request");
        request({
          agentClass: Agent,
          agentOptions: {
            socksHost: "localhost", // Defaults to 'localhost'.
            socksPort: 8080, // Defaults to 1080.
          },
          uri: `https://<basic_auth>@api.browserstack.com/automate/sessions/${sessionId}.json`,
          method: "PUT",
          form: {
            status: "passed",
            reason: "",
          },
        });
      });
    };

    updateStatus();
  },
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
