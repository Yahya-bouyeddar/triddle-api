import prisma from '../prismaClient.js';

export const addQuestion = async (req, res) => {
  const { formId } = req.params; 
  const { label, type, options } = req.body; 

  try {
    const question = await prisma.question.create({
      data: {
        label,
        type,
        options: options || null, 
        formId,
      },
    });

    res.status(201).json(question); 
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur lors de l'ajout de la question." });
  }
};
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
