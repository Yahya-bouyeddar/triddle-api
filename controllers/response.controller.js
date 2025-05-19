import Response from '../models/Response.js';

// Enregistrer une réponse pour un formulaire donné
import prisma from '../prismaClient.js';

export const submitResponse = async (req, res) => {
  const { formId } = req.params; // On récupère l'ID du formulaire dans l'URL
  const { respondentName, answers } = req.body; // On récupère les données envoyées par l'utilisateur

  try {
    const response = await prisma.response.create({
      data: {
        formId,
        respondentName,
        answers: JSON.stringify(answers), // On transforme l'objet en texte JSON
      },
    });

    // On incrémente les visites (facultatif)
    await prisma.form.update({
      where: { id: formId },
      data: { visits: { increment: 1 } },
    });

    res.status(201).json(response); // On retourne la réponse enregistrée
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur lors de l'enregistrement de la réponse." });
  }
};


export const getResponsesByForm = async (req, res) => {
  const { formId } = req.params;

  try {
    const responses = await prisma.response.findMany({
      where: { formId },
      orderBy: { createdAt: 'desc' }, // facultatif : du plus récent au plus ancien
    });
  

    res.status(200).json(responses);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des réponses." });
  }
};

