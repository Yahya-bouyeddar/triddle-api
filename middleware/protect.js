import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Vérifier s’il y a un token dans l’en-tête
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // on récupère le token (après "Bearer")

      // 2️⃣ Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Récupérer l'utilisateur depuis la base (sans mot de passe)
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: 'Utilisateur introuvable.' });
      }

      req.user = user; // on ajoute les infos du user dans la requête
      next(); // on continue vers la route protégée
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ message: 'Token invalide.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé, aucun token fourni.' });
  }
};

export default protect;
