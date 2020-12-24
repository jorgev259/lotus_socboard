module.exports = {
  guildMemberAdd (client, sequelize, model, member) {
    member.roles.add(member.guild.roles.cache.find(r => r.name === 'Shipmates'))
  }
}
