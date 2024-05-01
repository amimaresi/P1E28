//npm i xml2js
const parseString = require('xml2js').parseStringPromise;

const getOrcidFromName = async (name) => {
    try {
        const url = `https://pub.orcid.org/v3.0/search?q=${name}`;
        const response = await fetch(url);
        const xmlData = await response.text();
        const jsonData = await parseString(xmlData);
        const orcid = jsonData['search:search']['search:result'][0]['common:orcid-identifier'][0]['common:path'][0];
        
        return orcid;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'ORCID :", error);
        throw error;
    }
};

module.exports = getOrcidFromName;
