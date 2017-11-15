// Testrahmen mit "Condition = true"


Kameleoon.API.runWhenConditionTrue(function() {
        return !!document.querySelector('CSS-Selector');
    }, function() {
		
		// z.B. Änderungen auf Seite 1 des Test oder Änderungen an erstem Element
		  }, 100);



Kameleoon.API.runWhenConditionTrue(function() {
        return !!document.querySelector('CSS-Selector');
    }, function() {
		
		// z.B. Änderungen auf Seite 2 des Test oder Änderungen an zweitem Element
		  }, 100);



// Testrahmen mit "Element present"

Kameleoon.API.runWhenElementPresent('CSS-SelectorVonKontrollElement', function() {
		// z.B. Änderungen auf Seite 1 des Test oder Änderungen an erstem Element
     
} , 100);


Kameleoon.API.runWhenElementPresent('CSS-SelectorVonKontrollElement', function() {
		// z.B. Änderungen auf Seite 2 des Test oder Änderungen an zweitem Element
     
} , 100);

