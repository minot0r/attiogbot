const responses = {
    'error': 'Erreur lors de l\'éxecution de la commande 😲',
    argsError(args) { return `Cette commande nécessite ${args} arguments 😥` },
    commandDoesNotExist(nearestCommand) { return `Cette commande n'eziste pas, vouliez vous dire : ${nearestCommand} 🥰` }
}

module.exports = responses