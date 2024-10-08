import dotenv from "dotenv"; 
import program from "../utils/commander.js";

const {mode} = program.opts(); 
//Aca me llega "desarrollo" o "produccion" segun lo que colocamos en la consola al ejecutar el proceso. 

dotenv.config({
    path: mode === "desarrollo"?"./.env.desarrollo": "./.env.produccion"
}); 

let configObject = {
    puerto: process.env.PUERTO,
    mongo_url: process.env.MONGO_URL
}

export default configObject;