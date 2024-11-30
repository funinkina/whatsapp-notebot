const { getClosestContact } = require('./contactUtils');

module.exports = {
    sendText(client, body) {
        const lines = body.split('\n');
        const [_, contactName, message, timeString] = lines;
        const delayMinutes = parseInt(timeString.split(' ')[0], 10);
        const delayMs = delayMinutes * 60 * 1000;

        console.log(`Looking up contact closest to "${contactName}"`);

        return getClosestContact(client, contactName).then((contact) => {
            if (contact) {
                console.log(`Scheduling reminder: Contact=${contact.name}, Message="${message}", Delay=${delayMinutes} minutes`);
                setTimeout(() => {
                    // Use the module's sendMessage method instead of this.sendMessage
                    module.exports.sendMessage(client, contact.id._serialized, message);
                }, delayMs);
            } else {
                console.error(`No contact found matching "${contactName}"`);
            }
        }).catch((error) => {
            console.error('Error finding contact:', error);
        });
    },

    async sendMessage(client, chatId, message) {
        try {
            await client.sendMessage(chatId, message);
            console.log(`Message sent to ${chatId}: "${message}"`);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
};