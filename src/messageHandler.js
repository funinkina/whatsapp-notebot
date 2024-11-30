const { sendText } = require('./sendText/sendTextHandler');

class MessageHandler {
    constructor(client) {
        this.client = client;
    }

    async processCommand(msg) {
        try {
            const command = msg.body.split('\n')[0];

            switch (command) {
                case "/sendtext":
                    return await sendText(this.client, msg.body);

                case "/reminder":
                    return this.handleReminder(msg.body);

                case "/broadcast":
                    return this.handleBroadcast(msg.body);

                default:
                    console.log(`Unhandled command: ${command}`);
                    return null;
            }
        } catch (error) {
            console.error("Error processing command:", error);
            return null;
        }
    }

    async handleReminder(body) {
        // Example of an additional command handler
        const lines = body.split('\n');
        const [_, time, message] = lines;

        console.log(`Setting reminder: ${time} - ${message}`);
        // Implement reminder logic (e.g., using setTimeout or a more sophisticated scheduling mechanism)
    }

    async handleBroadcast(body) {
        // Example of a broadcast message handler
        const lines = body.split('\n');
        const [_, contactGroup, message] = lines;

        console.log(`Preparing broadcast to group: ${contactGroup}`);
        // Implement logic to send message to multiple contacts or a group
    }

    // You can add more methods for different types of message processing
    async analyzeMessage(msg) {
        // Optional method for more advanced message analysis
        console.log('Analyzing message:', msg.body);
        // Implement any additional message processing logic
    }
}

module.exports = MessageHandler;