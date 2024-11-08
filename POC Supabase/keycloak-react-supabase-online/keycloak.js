import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:54321/auth/v1/callback',
  realm: 'myrealm',
  clientId: 'supabase',
});

export default keycloak;
