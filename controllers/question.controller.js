import prisma from '../prismaClient.js';

// ✅ Ajouter une question dans un formulaire
export const addQuestion = async (req, res) => {
  const { formId } = req.params; // 1️⃣ Récupérer l'ID du formulaire dans l'URL
  const { label, type, options } = req.body; // 2️⃣ Récupérer les données envoyées depuis le frontend

  try {
    const question = await prisma.question.create({
      data: {
        label,
        type,
        options: options || null, // 3️⃣ options est facultatif
        formId,
      },
    });

    res.status(201).json(question); // 4️⃣ On renvoie la question créée
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur lors de l'ajout de la question." });
  }
};
// ✅ Obtenir toutes les questions d’un formulaire
export const getQuestionsByForm = async (req, res) => {
  const { formId } = req.params;

  try {
    const questions = await prisma.question.findMany({
      where: { formId },
    });

    res.status(200).json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des questions." });
  }
};
