const fetchData = require('./fetchData'); // Importez votre fonction fetchData

// Appeler fetchData avec des valeurs spécifiques
const cherch = "Fatima Benbouzid-Si Tayeb"; // Par exemple, spécifiez le nom du chercheur
const req = { query: { cherch } };
const res = { 
    status: function(code) {
        console.log('Status code:', code);
        return this;
    },
    send: function(message) {
        console.log('Response:', message);
    }
};

// Appel de la fonction fetchData avec les objets req et res simulés
fetchData(req, res);
