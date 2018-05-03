function experimentVariant() {
  var activeExperiment = Kameleoon.API.currentVisit.activeExperiments[0];
  if (activeExperiment) {
    return activeExperiment.variationName;
  }
}

// Custom Goal Opt-In
if (Kameleoon) {
  var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
  var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
  var eventer = window[eventMethod];

  function receiveCPCMessage(event) {
    function eventDataContains(str) {
      return JSON.stringify(event.data).indexOf(str) !== -1;
    }

    if (event && event.data && eventDataContains('oil_as_selected_')) {
      if (eventDataContains('minimum')) {
        Kameleoon.API.processConversion(73158)
      } else if (eventDataContains('functional')) {
        Kameleoon.API.processConversion(73159)
      } else if (eventDataContains('full')) {
        Kameleoon.API.processConversion(73160)
      }
    }
  }

  eventer(messageEvent, receiveCPCMessage, false);

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
        Kameleoon.API.processConversion(70830);
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
        Kameleoon.API.processConversion(70829);
      });
    }

    // CPC Link
    var myElements = document.getElementsByClassName('as-js-advanced-settings--link');
    for (var i = 0; i < myElements.length; i++) {
      myElements[i].addEventListener('mousedown', function () {
        Kameleoon.API.processConversion(70828);
      });
    }
  }, 200);

  // No Cookies shown
  Kameleoon.API.runWhenConditionTrue(function () {
    var result = !!document.querySelector('.oil-nocookies');
    return result;
  }, function () {
    Kameleoon.API.processConversion(70827);
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
        Kameleoon.API.processConversion(70826);
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
