

import prisma from '../prismaClient.js';

export const submitResponse = async (req, res) => {
  const { formId } = req.params; 
  const { respondentName, answers } = req.body; 

  try {
    const response = await prisma.response.create({
      data: {
        formId,
        respondentName,
        answers: JSON.stringify(answers), 
      },
    });

    await prisma.form.update({
      where: { id: formId },
      data: { visits: { increment: 1 } },
    });

    res.status(201).json(response); 
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
      orderBy: { createdAt: 'desc' }, 
    });
  

    res.status(200).json(responses);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des réponses." });
  }
};

