const Projet = require("../schema/Projet");


const projetParAnne = async (req, res) => {
    try {
        const { dateDebut, dateFin } = req.body;

        // if (dateDebut.localeCompare(dateFin) === 1) {
        //     throw new Error("La date de début ne peut pas être superieur à la date de fin.");
        // }
        const projets = await Projet.find({
            DateDebut: {
                $gte: Number(dateDebut), // Utilisation de $gte pour inclure également dateDebut
                $lte: Number(dateFin)    // Utilisation de $lte pour inclure également dateFin
            }
        }).sort({ DateDebut: 1 });

        // Créer un tableau d'années entre dateDebut et dateFin
        const yearsInRange = Array.from({ length: Number(dateFin) - Number(dateDebut) + 1 }, (_, index) => Number(dateDebut) + index);

        // Compter le nombre d'encadrements par année
        const projetsCountByYear = projets.reduce((acc, projet) => {
            const year = projet.DateDebut;
            acc[year] = acc[year] ? acc[year] + 1 : 1;
            return acc;
        }, {});

        // Créer un tableau avec le nombre d'encadrements par année
        const projetsParAnnee = yearsInRange.map(year => ({
            year,
            count: projetsCountByYear[year] || 0 // Utiliser 0 si aucune valeur trouvée pour cette année
        }));

        res.json({ 
            projetsParAnnee
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });
    }
};

module.exports = { projetParAnne }
