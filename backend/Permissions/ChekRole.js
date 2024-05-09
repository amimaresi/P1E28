function verifierRole(rolesAutorises) {
    return function(req, res, next) {
        const roleUtilisateur = req.headers.type; // Supposons que le rôle de l'utilisateur est envoyé dans les en-têtes de la demande

        // Vérifier si le rôle de l'utilisateur est autorisé à accéder à la fonctionnalité
        if (rolesAutorises.includes(roleUtilisateur)) {
            // L'utilisateur a le bon rôle, accorder l'accès
            next();
        } else {
            // L'utilisateur n'a pas le bon rôle, renvoyer une erreur d'accès interdit
            return res.status(403).json({ error: 'Accès interdit' });
        }
    };
}

module.exports = verifierRole
