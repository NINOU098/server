//importer le model de votre table
import Reservation from "../models/Reservation.js";

//La liste des reservation

export const listeDesReservation = async(req,res)=>{
     try {
        const reservations = await Reservation.findAll()
        res.status(200).json({data:reservations})
        
    } catch (error) {
        res.status(500).json({message:'Erreur lors de la récupération des reservation'})
    }
}
//ajout un document


export const ajouterUneReservation  = async (req,res) =>{
    const { dateReservation,dureeReservation,prixTotal} = req.body
    const nouvelleReservation = { dateReservation,dureeReservation,prixTotal}
 
    try {
     const result = await Reservation.create(nouvelleReservation)
     res.status(201).json({ data: result, message: 'Reservation ajouter avec succes' })
 } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
 
 
  export const detailDUneReservation  = async(req,res)=>{
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: 'id est obligatoire' })
 
    try {
      const reservations  = await Reservation.findByPk(id);
      if (!reservations) {
        res.status(404).json({ message: "Reservation non trouver" });
      } else {
        res.status(200).json(reservations);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
 
 
  
 export const updateReservation  = async(req,res)=>{
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: 'id est obligatoire' })
 
    const {dateReservation,dureeReservation,prixTotal } = req.body;
    const updatedReservation = {dateReservation,dureeReservation,prixTotal } 
 
    try {
     const resultat = await Reservation.update(updatedReservation , { where: { id } })
     //here
     res.status(200).json({ message: 'reservation modifié', data:resultat })
 
 } catch (error) {
     res.status(400).json({ error: true, message: error.message })
 }
 }
 
 
   
 export const supprimerReservation = async(req,res)=>{
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: 'id est obligatoire' })
 
    try {
      const reservations = await Reservation.findByPk(id);
      if (!reservations) {
        res.status(404).json({ message: "reservation non trouvée" });
      } else {
        await reservations.destroy();
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  }