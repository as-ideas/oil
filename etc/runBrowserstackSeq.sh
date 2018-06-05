#/bin/bash

source etc/browserstackTest.sh

run_test chrome57
run_test ie9
run_test ff52
run_test safari91

# run_test iphone5 # fails weirdly, check later
# run_test android4
