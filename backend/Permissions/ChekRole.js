const jwt = require('jsonwebtoken');

function verifierRole(rolesAutorises) {
    return function(req, res, next) {
        // Récupérer le token JWT à partir du cookie
        const token = req.cookies.token;
        
        // Vérifier si le token existe
        if (!token) {
            return res.status(401).json({ error: 'Token JWT manquant' });
        }
        
        try {
            // Vérifier et décoder le token JWT
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decodedToken);
            
            // Récupérer le rôle de l'utilisateur à partir des informations du token
            const roleUtilisateur = decodedToken.type;
        
            // Vérifier si le rôle de l'utilisateur est autorisé à accéder à la fonctionnalité
            if (rolesAutorises.includes(roleUtilisateur)) {
                // L'utilisateur a le bon rôle, accorder l'accès
                next();
            } else {
                // L'utilisateur n'a pas le bon rôle, renvoyer une erreur d'accès interdit
                return res.status(403).json({ error: 'Accès interdit' });
            }
        } catch (error) {
            // Une erreur s'est produite lors de la vérification ou du décodage du token JWT
            return res.status(401).json({ error: 'Token JWT invalide' });
        }
    };
}

module.exports = verifierRole;
