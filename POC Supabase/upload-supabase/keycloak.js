import Keycloak from 'keycloak-js';

// Configuration Keycloak côté client
const keycloak = new Keycloak({
  url: 'http://localhost:8080/',
  realm: 'myrealm',
  clientId: 'my-app-client',
});

// Initialisation de Keycloak et récupération du token JWT
keycloak.init({
  onLoad: 'login-required', // L'utilisateur doit se connecter dès que l'application est chargée
}).then(authenticated => {
  if (authenticated) {
    console.log('Utilisateur authentifié');
    const token = keycloak.token;  // Token d'accès à envoyer au backend
    console.log('Token JWT:', token);

    // Envoyer le token JWT dans chaque requête vers le backend
    // Par exemple, pour une requête POST vers le backend avec le token
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token, // Envoyer le token dans les headers
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* Données à envoyer au backend */ })
    }).then(response => response.json())
      .then(data => {
        console.log('Réponse du serveur:', data);
      })
      .catch(err => console.error('Erreur:', err));
  } else {
    console.log('Échec de l\'authentification');
  }
}).catch(err => {
  console.error('Erreur Keycloak:', err);
});