"use strict";

module.exports = ({
  commandProcessor,
  root
}) => {
  const variable = commandProcessor.createCategory(root, 'variable', 'Retrieve and monitor variables on your device');
  const timeOption = {
    'time': {
      boolean: true,
      description: 'Show the time when the variable was received'
    }
  };
  commandProcessor.createCommand(variable, 'list', 'Show variables provided by your device(s)', {
    handler: args => {
      const VariableCommand = require('../cmd/variable');

      return new VariableCommand(args).listVariables();
    }
  });
  commandProcessor.createCommand(variable, 'get', 'Retrieve a value from your device', {
    params: '[device] [variableName]',
    options: Object.assign({}, timeOption, {
      'product': {
        description: 'Target a device within the given Product ID or Slug'
      }
    }),
    handler: args => {
      const VariableCommand = require('../cmd/variable');

      return new VariableCommand(args).getValue(args);
    },
    examples: {
      '$0 $command basement temperature': 'Read the `temperature` variable from the device `basement`',
      '$0 $command 0123456789abcdef01234567 temperature --product 12345': 'Read the `temperature` variable from the device with id `0123456789abcdef01234567` within product `12345`',
      '$0 $command all temperature': 'Read the `temperature` variable from all my devices'
    }
  });
  commandProcessor.createCommand(variable, 'monitor', 'Connect and display messages from a device', {
    params: '[device] [variableName]',
    options: Object.assign({}, timeOption, {
      'delay': {
        number: true,
        description: 'Interval in milliseconds between variable fetches',
        nargs: 1
      }
    }),
    handler: args => {
      const VariableCommand = require('../cmd/variable');

      return new VariableCommand(args).monitorVariables(args);
    },
    examples: {
      '$0 $command up temp --delay 2000': 'Read the temp variable from the device up every 2 seconds'
    }
  });
  return variable;
};