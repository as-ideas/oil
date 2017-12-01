import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class HerokuPerformanceSimulation extends Simulation {


  val httpConf = http
    .baseURL("https://oil.asideas.de") // Here is the root for all relative URLs
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8") // Here are the common headers
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  val myScenario = scenario("Download OIL.min.js")
    .exec(http("request_1").get("/release/oil.1.0.8.min.js"))

  // 30_000 Request in 60s (= 500req/s) with 10x dynos
  setUp(myScenario.inject(rampUsers(15000) over (60 seconds)).protocols(httpConf))
//  setUp(myScenario.inject(rampUsers(30) over (30 seconds)).protocols(httpConf))
}
