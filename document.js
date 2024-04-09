//importer le model de votre table
import Document from "../models/Document.js";

//La liste des documents

export const listeDesDocuments = async(req,res)=>{
     try {
        const documents = await Document.findAll()
        res.status(200).json({data:documents})
        
    } catch (error) {
        res.status(500).json({message:'Erreur lors de la récupération des Documents'})
    }
}
//ajout un document


export const ajouterUnDocument  = async (req,res) =>{
    const { nomDocument,type,contenu} = req.body
    const nouveauDocument = { nomDocument,type,contenu}
 
    try {
     const result = await Document.create(nouveauDocument)
     res.status(201).json({ data: result, message: 'document ajouter avec succes' })
 } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
 
 
  export const detailDUnDocument  = async(req,res)=>{
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: 'id est obligatoire' })
 
    try {
      const documents  = await Document.findByPk(id);
      if (!documents) {
        res.status(404).json({ message: "Document not found" });
      } else {
        res.status(200).json(documents);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
 
 
  
 export const updateDocument  = async(req,res)=>{
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: 'id est obligatoire' })
 
    const {nomDocument,type,contenu } = req.body;
    const updatedDocument = {nomDocument,type,contenu } 
 
    try {
     const resultat = await Document.update(updatedDocument , { where: { id } })
     //here
     res.status(200).json({ message: 'document modifié', data:resultat })
 
 } catch (error) {
     res.status(400).json({ error: true, message: error.message })
 }
 }
 
 
   
 export const supprimerDocument = async(req,res)=>{
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: 'id est obligatoire' })
 
    try {
      const documents = await Document.findByPk(id);
      if (!documents) {
        res.status(404).json({ message: "document non trouvée" });
      } else {
        await documents.destroy();
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  }