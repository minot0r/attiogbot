const responses = {
    'error': 'Erreur lors de l\'éxecution de la commande 😲',
    'commandError': 'Non, non, non ça ne marche pas comme ça 😅',
    argsError(args) { return `Cette commande nécessite ${args} arguments 😥` },
    commandDoesNotExist(nearestCommand) { return `Cette commande n'eziste pas, vouliez vous dire : ${nearestCommand} 🥰` }
}

module.exports = responses