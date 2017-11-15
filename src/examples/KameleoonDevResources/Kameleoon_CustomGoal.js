// Custom Goal - Bestimmte URL + bestimmtes Element auf der Seite
if (window.location.href.indexOf('TeilDerURL') !== -1) {
    Kameleoon.API.runWhenConditionTrue(function() {
        return !!document.querySelector('CSS-Selector');
    }, function() {
        Kameleoon.API.processConversion(XXYOURGOALID);

    }, 100);
}


// Custom Goal - bestimmtes Element geklickt
Kameleoon.API.runWhenConditionTrue(function() {
    return !!document.querySelector('CSS-Selector');
}, function() {
    document.getElementById('CSS-Selector').addEventListener('mousedown', function() {
		Kameleoon.API.processConversion(XXYOURGOALID);

    });
}, 100);


// Custom Goal - Klasse geklickt "foreach"
[].forEach.call(document.querySelectorAll("CSS-SelectorDerKlasse"), function(element) {
   element.addEventListener("mousedown", function() {
		Kameleoon.API.processConversion(XXYOURGOALID);

   });
 });

// Custom Goal - jQuery
Kameleoon.API.runWhenConditionTrue( function() {
    return typeof jQuery != "undefined" && jQuery("body").length > 0;
 } , function () {
    jQuery("body").on("mousedown", "CSS-Selector" , function () {
        Kameleoon.API.processConversion(XXYOURGOALID);
    });  
    
} , 100);


// Custom Goal mit AOV übergeben
// 1. via DataLayer
// 2. Parsing from the content via document.querySelector('CSS-Selector'); BUT you have to remove the €-sign due to only numbers are allowed; Punkt oder Komma


Kameleoon.API.runWhenElementPresent('CSS-SelectorVonKontrollElement', function() {
    document.querySelector('#CSS-SelectorDesButtons').addEventListener('click', function() {
        var totalPrice = parseInt(document.querySelector('CSS-SelectorDesPreisElements').innerText);
            Kameleoon.API.processConversion(60624, totalPrice);	
   });  
    
} , 100);


// Element im sichtbaren Bereich
function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}


Kameleoon.API.runWhenConditionTrue(function(){
    return !!document.querySelector('#IDdesElements') && isScrolledIntoView(document.querySelector('#IDdesElements'));
} , function(){
    
 Kameleoon.API.processConversion(GoalIDeinfügen);

    
} , 100);



// Scroll-Tiefe

window.addEventListener("scroll", function() {
      var kScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      var B = document.body, H = document.documentElement;
      var height = Math.max( B.scrollHeight, B.offsetHeight,H.clientHeight, H.scrollHeight, H.offsetHeight );
      var target = Math.floor( height / 8 ) - B.offsetHeight;
        
        if( kScroll > target && window.kTrigger == null ) {
                        window.kTrigger = true;
            document.dispatchEvent(new Event("scroll_1_3rd"));
        }
    });
	
	
	document.addEventListener('scroll_1_3rd', function() {
		Kameleoon.API.processConversion(GoalIDeinfügen);
		});
