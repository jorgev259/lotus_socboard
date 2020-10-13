/* eslint no-prototype-builtins: "off" */

const events = {
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
  MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
}

module.exports = {
  async raw (client, sequelize, module, event) {
    // `event.t` is the raw event name
    if (!events.hasOwnProperty(event.t)) return

    const { d: data } = event
    const user = client.users.cache.get(data.user_id)
    const channel = client.channels.cache.get(data.channel_id) || await user.createDM()

    // if the message is already in the cache, don't re-emit the event
    if (channel.messages.cache.has(data.message_id)) return

    const message = await channel.messages.fetch(data.message_id)

    const emojiKey = data.emoji.id || data.emoji.name
    const reaction = message.reactions.cache.get(emojiKey)

    client.emit(events[event.t], reaction, user)
  }
}
