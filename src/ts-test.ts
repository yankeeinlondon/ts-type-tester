#!/usr/bin/env node

import chalk from "chalk";
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";

import { type_validation } from "./type_validate";

const cli = commandLineArgs(
  [
    { name: "params", type: String, multiple: true, defaultOption: true },
    { name: "verbose", alias: "v", }
  ], 
  {
    stopAtFirstUnknown: true,
  });

  const sections = [
    {
      header: 'TS Type Tester',
      content: 'Test your {italic types} as part of your testing.',
    },
    {
      header: `Syntax`,
      content: `${chalk.bold("ts-type-tester")} folder [${chalk.dim("configFile")}]
      
      You must specify the root folder you want to test files in. While this program was intended to primarily be pointed at a test directory you can point it anywhere relative to the current directory.

      By default the ${chalk.dim("configFile")} parameter will be the ${chalk.blue("tsconfig.json")} in the project root but you can point it to another file if you prefer.
      `,
      description: ""
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'ignore',
          typeLabel: '{underline code,code,etc.}',
          description: 'Specify error codes you want to ignore fully'
        },
        {
          name: 'warn',
          typeLabel: '{underline code,code,etc.}',
          description: 'Specify error codes which should only be considered a warning rather than an error'
        },
        {
          name: 'watch',
          alias: "w",
          type: Boolean,
          description: `start as a {italic watcher} and update error status as it changes`
        },
        
      ]
    }
  ]
  if (Object.keys(cli).length === 0) {
    const usage = commandLineUsage(sections)
    console.log(usage)
    process.exit(0);
  } else {
    console.log(cli.params);
  }


await type_validation(cli.params[0] || "tests",cli.params[1])
