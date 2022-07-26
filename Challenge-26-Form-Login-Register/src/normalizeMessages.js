const { schema, normalize } = require("normalizr");

function normalizeMessages(messages) {
    const authorSchema = new schema.Entity("author");
    const messageSchema = new schema.Entity(
        "messages",
        {
            author: authorSchema,
        },
        { idAttribute: "time" }
    );

    const fileSchema = new schema.Entity("file", {
        messages: [messageSchema],
    });

    const normalizedData = normalize(messages, fileSchema);
    return normalizedData;
}

module.exports = normalizeMessages;