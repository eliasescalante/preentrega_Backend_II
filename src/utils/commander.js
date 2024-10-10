import { Command } from "commander";
const program = new Command();

program
    .option(" -p <port> ", "puerto en el que se inicia el servidor",  27017)
    .option("--mode <mode>", "modo de trabajo", "desarrollo")
program.parse();

export default program;
