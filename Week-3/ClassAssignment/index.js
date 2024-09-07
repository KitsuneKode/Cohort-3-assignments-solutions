const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .name("Todo CLI")
  .description("CLI to manage yout todos")
  .version("0.7.0");

program
  .command("add")
  .description("Add a new Todo")
  .argument("", "")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();
