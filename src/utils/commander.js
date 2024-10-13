//para definir y gestionar opciones de línea de comandos puerto y modo de trabajo
import { Command } from "commander";
const program = new Command();

program
    .option(" -p <port> ", "puerto en el que se inicia el servidor",  8080)
    .option("--mode <mode>", "modo de trabajo", "produccion")
program.parse();

export default program;