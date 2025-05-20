import prisma from '../prismaClient.js';


export const createForm = async (req, res) => {
  const { title } = req.body;

  try {
    const form = await prisma.form.create({
      data: {
        title,
        createdById: req.user.id, 
        publicUrl: Math.random().toString(36).substring(2, 12),
      },
    });

    res.status(201).json(form);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur lors de la création du formulaire." });
  }
};



export const getAllForms = async (req, res) => {
  try {
    const forms = await prisma.form.findMany({ where: {
        createdById: req.user.id,
        
          
       
      },
      include : {_count:{select:{responses : true}}}

    });
    res.status(200).json(forms);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des formulaires." });
  }
};

export const getFormByPublicUrl = async (req, res) => {
  const { link } = req.params;

  try {
    const form = await prisma.form.findUnique({
      where: { publicUrl:link },
    });

    if (!form) {
      return res.status(404).json({ message: "Formulaire non trouvé." });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Erreur lors de la récupération par lien public", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};


export const getFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await prisma.form.findUnique({
      where: { id },
    });

    if (!form) {
      return res.status(404).json({ message: "Formulaire non trouvé." });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Erreur lors de la récupération par id", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const getFormAnalytics = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await prisma.form.findUnique({ where: { id } });

    if (!form) {
      return res.status(404).json({ message: "Formulaire non trouvé." });
    }

    const visits = form.visits;
    const submissions = await prisma.response.count({ where: { formId: id } });
    const completionRate = visits > 0 ? Math.round((submissions / visits) * 100) + '%' : '0%';

    res.json({ visits, submissions, completionRate });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur lors de l’analyse du formulaire." });
  }
};
