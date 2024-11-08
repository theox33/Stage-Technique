import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { RequestWithUser } from '../types/express-request.interface';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    
    // Vérifie la présence de l'en-tête Authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing or malformed');
    }
    
    console.log('AuthHeader:', authHeader);

    // Récupère le token en enlevant "Bearer " et en supprimant les espaces
    const token = authHeader.split(' ')[1]?.replace(/\s+/g, '');
    
    console.log('Token:', token);
    

      // Charge la clé publique depuis les variables d'environnement
      const publicKey = '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzf0z9rt8vIvZEIX5LUX25XyxOw5VMBCGWCabfENQjObVzp4CmGTEQnbE6ObNExf0/vq0QzolHrak70xUDDKwcxfa7jbwAJZwpqjfeJHgkQmaVsfH0lUtLOrvn5HCZa8PlPLiX0CDzMhK1mLnjlM7Hiux6toIWNw0TBFq2026K+ETzuPTfAlXPONYIx6mqUkG1Fc++2Y1Xb3ZeFqXmfAcHKBq4vCwgPyKXDD+kVIrWJzHou7dVDw6KDk5fBhnxkWfKTETdZtAHDWf1gqc3VF3MTlqR/NGVbUE8HVqjCona2Rqf1I6lNEiRfcLfSA7J/mbCkRcqKhh4r4nwuCj2JUDBQIDAQAB\n-----END PUBLIC KEY-----';

      // Décode et vérifie le token JWT
      const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      
      // Ajoute les informations décodées (sous forme d'objet) à `req.user`
      req.user = decoded;

      console.log('Decoded:', decoded);

      // Passe au middleware ou contrôleur suivant
      next();

  }
}
