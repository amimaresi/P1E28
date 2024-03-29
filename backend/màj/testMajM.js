const majManuelle = require('./màj');

// Appeler la fonction majManuelle
async function executeMajManuelle() {
    try {
        // Appeler la fonction majManuelle
        await majManuelle();
        console.log('Mise à jour de la base de données effectuée avec succès');
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la mise à jour de la base de données :', error);
    }
}

// Appeler la fonction pour effectuer la mise à jour manuelle
executeMajManuelle();
