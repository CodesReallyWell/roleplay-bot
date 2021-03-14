const { Role } = require('discord.js')
const firstMessage = require('./message')

const removeReactions = (message, emoji, emojiCustom) => {
    try{
        message.reactions.resolve(emojiCustom.id).remove()
    }catch{
        message.reactions.resolve(emoji).remove()
    }

}


module.exports = client => {
    const channelID = '817140900358520883'

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojis = {
        Minecraft: 'Minecraft',
        Valheim: 'Valheim',
        WoW: 'WoW',
        Twitch: 'Twitch'
    }

    const reactions = []

    let emojiText = 'Add a reaction to claim a role\n\n'
    for (const key in emojis){
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n`
    }

    firstMessage(client, channelID, emojiText, reactions)

    const handleReaction = (reaction, user, add) => {
        // check if user is bot
        if (user.id === '816788014822588436'){
            return
        }

        const emoji = reaction._emoji.name
        const { guild } = reaction.message


        if(emojis[emoji] === undefined){
            removeReactions(reaction.message, emoji, getEmoji(emoji))
        }



        const roleName = emojis[emoji]
        if (!roleName){
            return
        }

        const role = guild.roles.cache.find((roles) => roles.name === roleName)
        const member = guild.members.cache.find((member) => member.id === user.id)

        if (add) {
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        // check reaction is in that channel id
        if (reaction.message.channel.id === channelID){
            handleReaction(reaction, user, true)
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelID){
            handleReaction(reaction, user, false)
        }
    })
}