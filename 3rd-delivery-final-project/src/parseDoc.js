module.exports = (doc) => ({ id: doc.id, ...doc.data() });