
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
/////////////////////////////////
import passport from 'passport';
import dotenv from 'dotenv';
import notreStrategy from './authentification/strategies.js';
////////////////////////////////
import database from './connexion.js'

import utilisateursRoutes from './routes/utilisateurRoutes.js'
import reclamationsRoutes from './routes/reclamationRoutes.js'

import proprieteRoutes from './routes/proprieteRoutes.js'
import documentRoutes from './routes/documentRoutes.js'
import aideRoutes from './routes/aideRoutes.js'

import favorisRoutes from './routes/favorisRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import visitesRoutes from './routes/visiteRoutes.js'

import evaluationsRoutes from './routes/evaluationRoutes.js'
import roleRoutes from './routes/roleRoutes.js'

database.sync()


// const PORT = dotenv.config().parsed.PORT
const PORT = process.env.PORT

// console.log('ENV',dotenv.config().parsed)

const app = express()

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/utilisateurs',utilisateursRoutes)
app.use('/proprietes',proprieteRoutes)
app.use('/reclamations',reclamationsRoutes)
app.use('/aides',aideRoutes)
app.use('/favoris',favorisRoutes)
app.use('/reservations',reservationRoutes)
app.use('/evaluations',evaluationsRoutes)
app.use('/visites',visitesRoutes)
app.use('/roles',roleRoutes)
app.use('/documents',documentRoutes)

///////////////////////////

app.use(passport.initialize())

passport.use(notreStrategy)
////////////////////////////////

app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))





