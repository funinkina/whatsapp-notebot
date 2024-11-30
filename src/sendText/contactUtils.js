module.exports = {
    calculateLevenshteinDistance(a, b) {
        const matrix = Array.from({ length: a.length + 1 }, () =>
            Array.from({ length: b.length + 1 }, () => 0)
        );

        for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
        for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1, // Deletion
                    matrix[i][j - 1] + 1, // Insertion
                    matrix[i - 1][j - 1] + cost // Substitution
                );
            }
        }

        return matrix[a.length][b.length];
    },

    async getClosestContact(client, name) {
        try {
            const contacts = await client.getContacts();

            // Find the closest matching contact
            let closestContact = null;
            let closestDistance = Infinity;

            for (const contact of contacts) {
                if (contact.name) {
                    const distance = module.exports.calculateLevenshteinDistance(
                        name.toLowerCase(),
                        contact.name.toLowerCase()
                    );
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestContact = contact;
                    }
                }
            }

            // Return the contact if a close match is found
            if (closestDistance <= 3) { // Allow small typo tolerance
                return closestContact;
            }

            return null; // No close match found
        } catch (error) {
            console.error('Error fetching contacts:', error);
            throw error;
        }
    }
};