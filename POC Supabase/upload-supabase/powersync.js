const PowerSync = require('powersync');

// Connexion à la base de données Supabase
const powerSync = new PowerSync({
    postgres: {
        connectionString: 'https://supabase-poc1.dev.chr-group.tech'
    },
    table: 'files',
});

// Ecoute des changements dans la table
powerSync.on('change', (data) => {
    console.log('Changement détecté :', data);
});

// Lancemenet de l'écoute PowerSync
powerSync.start();