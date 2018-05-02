function experimentVariant() {
  var activeExperiment = Kameleoon.API.currentVisit.activeExperiments[0];
  if (activeExperiment) {
    return activeExperiment.variationName;
  }
}

// Custom Goal Opt-In
if (Kameleoon) {

  // Normal SOI-Button
  Kameleoon.API.runWhenConditionTrue(function () {
    var result = !!document.querySelector('.as-js-optin');
    return result;
  }, function () {

    // OIL is shown!
    utag.link({
      event_category: "AB Test",
      event_action: "Opt in Layer",
      event_label: "Layer load",
      ab_testing_var: experimentVariant()
    });


    // SOI button
    var myElements = document.getElementsByClassName('as-js-optin');
    for (var i = 0; i < myElements.length; i++) {
      myElements[i].addEventListener('mousedown', function () {
        Kameleoon.API.processConversion(71765);
        utag.link({
          event_category: "AB Test",
          event_action: "Opt in Layer",
          event_label: "Ok Button click",
          ab_testing_var: experimentVariant()
        });
      });
    }

    // DSE Link
    var myElements = document.getElementsByClassName('as-oil__intro-txt--link');
    for (var i = 0; i < myElements.length; i++) {
      myElements[i].addEventListener('mousedown', function () {
        Kameleoon.API.processConversion(71766);
      });
    }

    // CPC Link
    var myElements = document.getElementsByClassName('as-js-advanced-settings--link');
    for (var i = 0; i < myElements.length; i++) {
      myElements[i].addEventListener('mousedown', function () {
        Kameleoon.API.processConversion(71767);
      });
    }
  }, 200);

  // No Cookies shown
  Kameleoon.API.runWhenConditionTrue(function () {
    var result = !!document.querySelector('.oil-nocookies');
    return result;
  }, function () {
    Kameleoon.API.processConversion(72318);
  }, 200);


  // Thank you is shown
  Kameleoon.API.runWhenConditionTrue(function () {
    var result = !!document.querySelector('#as-oil-thank-you');
    return result;
  }, function () {
    var myElements = document.getElementsByClassName('as-close-ty-button');
    for (var i = 0; i < myElements.length; i++) {
      myElements[i].addEventListener('mousedown', function () {
        utag.link({
          event_category: "AB Test",
          event_action: "Opt in Layer",
          event_label: "Close Button click",
          ab_testing_var: experimentVariant()
        });
      });
    }
  }, 200);

  // CPC is shown
  Kameleoon.API.runWhenConditionTrue(function () {
    var result = !!document.querySelector('.as-oil-l-cpc');
    return result;
  }, function () {
    // CPC shown
    utag.link({
      event_category: "AB Test",
      event_action: "Opt in Layer",
      event_label: "CPC Layer load",
      ab_testing_var: experimentVariant()
    });

    // SOI-Button in CPC gets it's own Event!
    var myElements = document.getElementsByClassName('as-js-optin');
    for (var i = 0; i < myElements.length; i++) {
      myElements[i].addEventListener('mousedown', function () {
        Kameleoon.API.processConversion(71768);
        utag.link({
          event_category: "AB Test",
          event_action: "Opt in Layer",
          event_label: "CPC Layer Button click",
          ab_testing_var: experimentVariant()
        });
      });
    }
  }, 200);
}
