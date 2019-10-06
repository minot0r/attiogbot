const responses = {
    'error': 'Erreur lors de l\'execution de la commande 😲',
    argsError(args) { return `Cette commande nécessite ${args} arguments 😥` }
}

module.exports = responses