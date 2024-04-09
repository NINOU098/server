//importer le model de votre table
import Evaluation from "../models/Evaluation.js";
 
//La liste des utilisateurs
 
export const listeDesEvaluation = async(req,res)=>{
     try {
        const evaluations = await Evaluation.findAll()
        res.status(200).json({data:evaluations})
        
    } catch (error) {
        res.status(500).json({message:'Erreur lors de la récupération des Evaluation'})
    }
}
//ajout un Evaluation
 
export const ajouterUneEvaluation = async (req,res) =>{
 
    //récuperation des données envoyés par la form (Evaluaion)
   const{id,note,commentaire,date_evaluation}= req.body
 
   //créer un objet Evaluation
   const nouvelleEvaluation = {id,note,commentaire,date_evaluation}
   try {
    const evaluation = await Evaluation.create(nouvelleEvaluation)
    res.status(201).json({data:evaluation, message:"Evaluation ajouté avec succés"})
    
   } catch (error) {
    res.status(500).json({message:"Erreue lors de l'ajout d'une evaluation"})
}
}
 
//information d'une evaluation

export const detailEvaluation = async(req,res)=>{
    //récupérer id d'une evaluation
    const{ id } =req.params
    if(!parseInt(id)) return res.status(404).json({message:"id est obligatoire"})
    try {
        const evaluation = await Evaluation.findByPk(id)
        if(!evaluation) return res.status(404).json({message:"cette evaluatiin n'existe pas"})
        res.status(200).json({data:evaluation})
    } catch (error) {
        res.status(500).json({message:"Erreue lors de la recherche de levaluatuion"})
    }
 
}

// Mettre a jour une evaluation
export const updateEvaluation = async (req, res) => {
    let { id } = req.params
    const { note } = req.body
    const updatedEvaluation = { note }

    if (!id) res.status(400).json({ message: 'id de levaluation est requis' })
    try {
        const evaluation = await Evaluation.update(updatedEvaluation, { where: { id } })
        res.status(200).json(evaluation)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

// Supprimer une Evaluation
export const supprimerEvaluation = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ error: true, message: "L'id de levaluation est requis" })
    try {
        const evaluation = await Evaluation.destroy({ where: { id } })
        res.status(200).json({ evaluation,message: `Levaluation ${id} a ete supprimee avec succes` })//maybe
    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}