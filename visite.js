//importer le model de votre table
import Visite from "../models/Visite.js";

//Ajouter une visite
export const ajouterVisite = async (req, res) => {
    // Récupérer les données envoyées par la requête (date,status)
    const { date,status } = req.body;
  
    // Créer un objet Visite
    const nouvelleVisite = { date,status };
  
    try {
      // Ajouter la visite à la base de données
      const visite = await Visite.create(nouvelleVisite);
  
      res.status(201).json({
        data: visite,
        message: "Visite ajoutée avec succès",
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout d'une visite",
      });
    }
  };
 
// Lister toutes les visites
export const listerVisite = async (req, res) => {
    try {
      // Récupérer toutes les visites de la base de données
      const visites = await Visite.findAll(); 
      res.status(200).json({data:visites});
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des visites"});
    }
  };

  export const detailDUneVisite  = async(req,res)=>{
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: 'id est obligatoire' })
 
    try {
      const visites  = await Visite.findByPk(id);
      if (!visites) {
        res.status(404).json({ message: "visite non trouver" });
      } else {
        res.status(200).json(visites);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

   
 export const updateVisite  = async(req,res)=>{
  const id = req.params.id;
  if (!id) return res.status(404).json({ message: 'id est obligatoire' })

  const {status,date } = req.body;
  const updatedVisite = {status,date } 

  try {
   const resultat = await Visite.update(updatedVisite , { where: { id } })
   //here
   res.status(200).json({ message: 'visite modifié', data:resultat })

} catch (error) {
   res.status(400).json({ error: true, message: error.message })
}
}

// Supprimer une visite
export const supprimerVisite = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ error: true, message: "L'id de la visite est requis" })
    try {
        const visite = await Visite.destroy({ where: { id } })
        res.status(200).json({ visite,message: `La visite ${id} a été supprimée avec succès` })
    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}





