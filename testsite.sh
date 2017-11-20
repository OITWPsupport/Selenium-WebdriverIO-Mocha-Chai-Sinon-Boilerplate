#!/bin/sh
cd ~/Documents/searchtest
export TESTSITE=$1
export PAGE=$2
npm run-script test_var
#npm run-script migration
