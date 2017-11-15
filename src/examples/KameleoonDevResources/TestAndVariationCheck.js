var kam = Kameleoon.API.currentVisit.activeExperiments;

for (var i = 0; i < Kameleoon.API.currentVisit.activeExperiments.length; i++) { 
    if (kam[i].id == 52462 && kam[i].variationId == 'reference') {
        console.log("true");
    } else {
        console.log("not found");
    }
}