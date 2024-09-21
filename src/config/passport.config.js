//importo los modulos para Passport para manejar jwt y autenticacion
import passport from "passport";
import jwt from "passport-jwt";

//defino las variables para la estrategia jwt y el extractor
const JWTStategy = jwt.Strategy; 
const ExtractJwt = jwt.ExtractJwt; 
// Función para inicializar Passport
const initializePassport = () => {
    passport.use("current", new JWTStategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: "coderhouse",
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error); 
        }
    }))
}

//creo el cookie extractor: 
const cookieExtractor = (req) => {
    let token = null; 
    if( req && req.cookies ) {
        token = req.cookies["cookieToken"]; 
    }
    return token; 
}

export default initializePassport; 