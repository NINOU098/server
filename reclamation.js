//importer le model de votre table
import Reclamation from "../models/Reclamation.js";

//La liste des reclamations

export const listeDesReclamations = async(req,res)=>{
     try {
        const reclamations = await Reclamation.findAll()
        res.status(200).json({data:reclamations})
        
    } catch (error) {
        res.status(500).json({message:'Erreur lors de la récupération des reclamations'})
    }
}
export const ajouterUneReclamation = async (req,res) =>{
    const { type,description, date } = req.body;
    const nouvelleReclamation ={ type,description, date }
    try {
      const resultat= await Reclamation.create(nouvelleReclamation)
      res.status(201).json({data:resultat,message:"reclamation ajouté avec succé"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  /*const nouvelUtilisateur = {nom,prenom,adresse,naissance,telephone,username,email,password:hashedPassword}
   try {

    const resultat = await Utilisateur.create(nouvelUtilisateur)

    res.status(201).json({data:resultat, message:"Utilisateur ajouté avec succés"})
    
   } catch (error) {
    res.status(400).json({message:error.message})
   }*/


  export const detailDUneReclamation = async(req,res)=>{
    const id = req.params.id;

    try {
      const reclamation = await Reclamation.findByPk(id);
      if (!reclamation) {
        res.status(404).json({ message: "Reclamation not found" });
      } else {
        res.status(200).json(reclamation);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  
export const updateReclamation = async(req,res)=>{
    const id = req.params.id;
    const {type,description, date } = req.body;

    try {
      const reclamation = await Reclamation.findByPk(id);
      if (!reclamation) {
        res.status(404).json({ message: "Reclamation not found" });
      } else {


        
        reclamation.userId = userId;

        /*type,description,  date*/        


        /*type,description,  date*/        

        reclamation.type=type;
        reclamation.description = description;
        reclamation.date=date;
        await reclamation.save();
        res.status(200).json(reclamation);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}


   
export const supprimerReclamation = async(req,res)=>{
    const id = req.params.id;

    try {
      const reclamation = await Reclamation.findByPk(id);
      if (!reclamation) {
        res.status(404).json({ message: "Reclamation n'est pas trouvée" });
      } else {
        await reclamation.destroy();
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  }
  
