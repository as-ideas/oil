# Blacklist Bell Performance Tests
## RESULTS
* Heroku, 1 Worker, 600_000 Request in 60s (= 10_000req/s)

## Running via maven

The "maven-gatlin-plugin" is bound to lifecycle phase "test". Simply run:

`mvn test`

To run a single simulation, type

`mvn test -Dgatling.simulationClass=<fully qualified simulation class name>` 

e.g.

`mvn test -Dgatling.simulationClass=BlacklistBellApiSimulation` 

## Running via IDE

 Select `src/test/scala/Engine.scala` and right-click. Select "Run 'Engine'"
 
## Further configuration

You can configure certain simulation properties via env properties:

`mvn test -DnumberOfRepetitions=ZXY -DpauseBetweenRequestsMs=XYZ`

* `numberOfRepetitions` Number of repeats for a simulated user. Defaults to `1` 
* `pauseBetweenRequestsMs` Pause between repetitions of an simulated user action in ms. Defaults to `0`

For infinite repetitions, put `numberOfRepetitions` to `0`


The app comes with default settings to run against our staging environment. 
To adjust these defaults, see `application.conf` in src/test/resources folder.

To perform simulations against production stage, add environment variable as follows:

`mvn test -DSTAGE=prod`
