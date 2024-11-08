const { initKeycloak } = require('./keycloak');

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const multer = require('multer'); // Pour gérer l'upload de fichiers

const app = express();
const upload = multer({ dest: 'uploads/' });

// Configuration Supabase
const supabase = createClient('https://supabase-poc1.dev.chr-group.tech', 'eyJhbGciOiJIUzI1NiI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInN1cnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE3MjcyMTUyMDAsCiAgImV4cCI6IDE4ODQ5ODE2MDAKfQ.Xve7DinRKbJHsOH5_GaHcWHBZ_kPbdpIm3Tvq4d4DeQ');

// Middleware pour vérifier l'authentification avec Keycloak
const checkAuth = (req, res, next) => {
  // Utiliser le token JWT généré par Keycloak
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    // Vérifier la validité du token
    initKeycloak().then(() => {
      const isAuthenticated = token === keycloak.token; // Comparer avec le token Keycloak
      if (isAuthenticated) {
        return next(); // Utilisateur authentifié, passer à la route suivante
      }
      return res.status(403).json({ error: 'Non autorisé' });
    }).catch(err => {
      console.error('Erreur lors de la vérification du token:', err);
      return res.status(500).json({ error: 'Erreur d\'authentification' });
    });
  } else {
    return res.status(401).json({ error: 'Token manquant ou invalide' });
  }
};

// Servir des fichiers statiques dans le dossier public
app.use(express.static('public'));

// Route pour la racine '/'
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API d\'upload de fichiers !');
});

// Route protégée pour uploader un fichier
app.post('/upload', checkAuth, upload.single('file'), async (req, res) => {
  const file = req.file;

  try {
    // Upload du fichier dans le bucket Supabase
    const { data, error } = await supabase.storage
      .from('uploads')  // Remplace par le nom de ton bucket
      .upload(`public/${file.originalname}`, file.path);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Enregistrer les métadonnées dans la table 'files'
    const { data: fileData, error: dbError } = await supabase
      .from('files')
      .insert([{
        filename: file.originalname,
        filepath: `public/${file.originalname}`,
        size: file.size,
        mimetype: file.mimetype
      }]);

    if (dbError) {
      return res.status(500).json({ error: dbError.message });
    }

    res.status(200).json({ message: "Fichier uploadé avec succès", data: fileData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lancer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
