cd NodeJS/
rm -rf ./test-report.xml && CI=true ./node_modules/.bin/jest --testResultsProcessor ./node_modules/jest-junit-reporter --forceExit;
cd ..