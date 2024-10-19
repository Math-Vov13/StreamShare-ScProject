import { Request, Response, NextFunction } from "express";

// Middleware pour logger les requêtes
const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method; // Méthode HTTP (GET, POST, etc.)
  const url = req.url;       // URL demandée
  const body = req.body;     // Corps de la requête (pour les POST/PUT)
  const headers = req.headers; // En-têtes de la requête

  // Log de la requête
  console.log(`[${new Date().toISOString()}] ${method} ${url} ${headers.host}`);
//   console.log('Headers:', headers);
//   console.log('Body:', body);

  // Appel de la fonction 'next()' pour passer à la prochaine étape (route)
  next();
};

export default logRequest;
