import passport from "passport";
import { Utilisateur } from '../models/index.js'
import passportJWT from "passport-jwt"   //On pouvait utiliser plein d'autres strategies (local, auth2 ....)

// import dotenv from 'dotenv'
// const tokenSecret=dotenv.config().parsed.TOKEN_SECRET

const { ExtractJwt, Strategy } = passportJWT

const jwtOptions = {
    secretOrKey: process.env.TOKEN_SECRET, 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const notreStrategy = new Strategy(jwtOptions, (payload, done) => {
    const utilisateur = Utilisateur.findOne({ where: { id: payload.id } })
    if (utilisateur) {
        done(null, utilisateur)
    } else {
        done(null, false)
    }
})

export default notreStrategy