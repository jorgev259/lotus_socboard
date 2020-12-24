module.exports = {
  async messageReactionAdd (client, sequelize, module, reaction, user) {
    if (reaction.partial) await reaction.fetch()

    console.log(reaction)
    const guild = client.guilds.cache.first()
    const item = await sequelize.models.module.findOne({ where: { module, guild: guild.id } })
    if (item.value && reaction.message.channel.name === 'rules') {
      if (reaction.emoji.name === 'futabayes') {
        const member = await guild.members.fetch(user.id)
        await member.roles.add(guild.roles.cache.find(r => r.name === 'Shipmates'))
      }
      reaction.remove()
    }
  }
}
