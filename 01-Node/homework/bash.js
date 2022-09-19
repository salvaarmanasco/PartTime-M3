// console.log(process);
// // Object.keys(process);

// const commands = require("./commands/index.js");

// process.stdout.write("prompt > ");
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on("data", function (data) {
//   var cmd = data.toString().trim(); // remueve la nueva línea
//   if (cmd === "date") {
//     commands.date();
//   }
//   if (cmd === "pwd") {
//     commands.pwd();
//   }
//   if (cmd === "ls") {
//     commands.ls();
//   }
//   if (cmd === "echo") {
//     commands.echo();
//   }
//   process.stdout.write("\nprompt > ");
// });

// const cmd = "date";

// commands[cmd](); // la función dentro de la propiedad pwd

const commands = require("./commands");

function write(data) {
  process.stdout.write(data);
}

function done() {
  process.stdout.write("\nprompt > ");
}

process.stdout.write("prompt > ");

process.stdin.on("data", function (data) {
  var [cmd, ...args] = data.toString().trim().split(" ");
  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](args, write, done);
  } else {
    process.stdout.write(`Command ${cmd} not found 🤦‍♂️`);
    process.stdout.write("\nprompt > ");
  }
});
