#!/usr/bin/env node
"use strict";

global.verboseLevel = 1;

const hasValidNodeInstall = require('./lib/has-supported-node');

const CLI = require('./app/cli');

if (hasValidNodeInstall()) {
  new CLI().run(process.argv);
}