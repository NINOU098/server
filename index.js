import Utilisateur from "./Utilisateur.js";
import Role from "./Role.js";
import Document from "./Document.js";
import Evaluation from "./Evaluation.js";
import Favoris from "./Favoris.js";
import Visite from "./Visite.js";
import Reclamation from "./Reclamation.js";
import Reservation from "./Reservation.js";
import Aide from "./Aide.js";
import Propriete from "./Propriete.js";


//  relation
//utilisateur


    Utilisateur.hasMany(Document)
    Document.belongsTo(Utilisateur)
  
 
  
  
    Utilisateur.hasMany(Reservation)
    Reservation.belongsTo(Utilisateur)

    Utilisateur.hasMany(Reclamation)
    Reclamation.belongsTo(Utilisateur)

    Utilisateur.hasMany(Favoris)
    Favoris.belongsTo(Utilisateur)
  
  
  
    Utilisateur.hasMany(Visite)
    Visite.belongsTo(Utilisateur)
  
    Utilisateur.hasMany(Evaluation)
    Evaluation.belongsTo(Utilisateur)

    // a confirmer
    Utilisateur.belongsToMany(Role,{through:'Utilisateur_Role'})
    Role.belongsToMany(Utilisateur,{through:'Utilisateur_Role'})


//proprite
    Propriete.hasMany(Document)
    Document.belongsTo(Propriete)

    Propriete.hasMany(Reservation)
    Reservation.belongsTo(Propriete)

    Propriete.hasMany(Evaluation)
    Evaluation.belongsTo(Propriete)

    Propriete.hasMany(Favoris)
    Favoris.belongsTo(Propriete)

    Propriete.hasMany(Visite)
    Visite.belongsTo(Propriete)
  
 
  //aide

    Utilisateur.hasMany(Aide)
    Aide.belongsTo(Utilisateur)

  

export {Utilisateur, Favoris, Role, Reclamation,Reservation,Propriete,Evaluation, Document, Visite, Aide}