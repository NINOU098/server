import { Router } from "express";

import { ajouterVisite, listerVisite, supprimerVisite,updateVisite,detailDUneVisite } from "../controllers/visite.js";

import passport from 'passport'

import { verifierToken, isAdmin , isProprietaire, isUtilisateur, isVisiteur } from '../authentification/autorisations.js'
import visiteRules from '../validation/validationVisite.js'
const router = Router()

router
.get("/",passport.authenticate('jwt', { session: false }), listerVisite )
.get("/:id",passport.authenticate('jwt', { session: false }),detailDUneVisite)
.post("/",visiteRules, passport.authenticate('jwt', { session: false }),ajouterVisite )
.put("/:id",passport.authenticate('jwt', { session: false }),updateVisite)
.delete('/:id',  passport.authenticate('jwt', { session: false }), supprimerVisite) 



export default router  