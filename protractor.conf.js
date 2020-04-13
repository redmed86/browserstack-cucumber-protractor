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
    var printSessionId = function (jobName) {
      browser.getSession().then(function (session) {
        console.log("SessionID=" + session.getId() + " job-name=" + jobName);
      });
    };
    printSessionId("Protractor-Cucumber Demo Test Suite");
  },
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
