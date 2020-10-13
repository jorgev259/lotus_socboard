module.exports = {
  ready (client, sequelize) {
    client.guilds.cache.first().channels.cache.find(c => c.name === 'rules').messages.fetch({ limit: 5 })
  },
  async messageReactionAdd (client, sequelize, module, reaction, user) {
    const guild = client.guilds.cache.first()
    const item = await sequelize.models.module.findOne({ where: { module, guild: guild.id } })

    if (item.state === '1' && reaction.message.channel.name === 'rules') {
      if (reaction.emoji.name === 'futabayes') {
        const member = await guild.members.fetch(user.id)
        await member.roles.add(guild.roles.cache.find(r => r.name === 'Shipmates'))
      }
      reaction.remove()
    }
  }
}
