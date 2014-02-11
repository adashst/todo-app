# Installation

## Node.js
Setup the development environment by installing Node.js:

See [nodejs.org](http://nodejs.org/).

## Grunt
Install the Grunt Command Line Interface to setup the task runner:

```sh
npm install -g grunt-cli
```

## Bower
Install the bower package manager for managing 3rd party libraries:

```sh
npm install -g bower
```

## Node modules
Install the project build tools (grunt tasks and dependencies) as node modules:

```sh
npm install
```

## Bower components
Install the 3rd party libraries (jQuery, Bootstrap, etc.) as bower components:

```sh
bower install
```

# Usage

## Tests

### Unit Tests
Perform continuous unit tests (rerun on file changes until quit):

```sh
grunt karma:unit
```

### Code coverage
Create a code coverage report in the `coverage` directory:

```sh
grunt karma:coverage
```

### End-to-End Tests
Execute the end-to-end tests via command-line:

#### Install selenium

Run the Selenium installation script, located in the local node_modules/ directory

This script downloads the files required to run Selenium itself and 
build a start script and a directory with them.

```sh
./node_modules/protractor/bin/webdriver-manager update
```

#### Start selenium

Start the standalone version of Selenium with the Chrome driver by executing the start script
```sh
./node_modules/protractor/bin/webdriver-manager start
```

#### Protractor 
launch Protractor to actually run the tests.

```sh
protractor public/test/e2e/protractor.conf.js
```
