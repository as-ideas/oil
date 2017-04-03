properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
  [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/as-ideas/oil'],
]

node {

  def buildNumber = env.BUILD_NUMBER
  def workspace = env.WORKSPACE
  def buildUrl = env.BUILD_URL

  // PRINT ENVIRONMENT TO JOB
  echo "workspace directory is $workspace"
  echo "build URL is $buildUrl"
  echo "build Number is $buildNumber"
  echo "PATH is $env.PATH"

  try {
    stage('Clean workspace') {
      deleteDir()
    }

    stage('Checkout') {
      checkout scm
    }

    stage('Build') {
      sh "npm install"
      sh "npm run build"
    }

    stage('Test') {
      sh "npm run test && npm run e2e"
      junit 'target/test-reports/TEST*.xml'
    }

    stage('Publish NPM snapshot') {
      def currentVersion = sh(returnStdout: true, script: "npm version | grep \"{\" | tr -s ':'  | cut -d \"'\" -f 4").trim()
      def newVersion = "${currentVersion}-${buildNumber}"
      sh "npm version ${newVersion} --no-git-tag-version && npm publish --tag next"
    }

  } catch (e) {
    rocketSend channel: 'jenkins', message: 'Fehler'
    throw e
  }

}
