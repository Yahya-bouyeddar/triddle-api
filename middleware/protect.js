import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; 

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

      req.user = user; 
      next(); 
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
