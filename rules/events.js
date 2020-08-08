module.exports = {
  ready (client, db) {
    client.guilds.cache.first().channels.cache.find(c => c.name === 'rules').messages.fetch({ limit: 5 })
  },
  async messageReactionAdd (client, db, module, reaction, user) {
    const guild = client.guilds.cache.first()
    const { state } = db.prepare('SELECT state FROM modules WHERE module=? AND guild=?').get(module, guild.id)

    if (state === '1' && reaction.message.channel.name === 'rules') {
      if (reaction.emoji.name === 'futabayes') {
        const member = await guild.members.fetch(user.id)
        await member.roles.add(guild.roles.cache.find(r => r.name === 'Shipmates'))
      }
      reaction.remove()
    }
  }
}
