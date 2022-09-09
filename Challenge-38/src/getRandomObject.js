let result = {};
process.on("message", (cant) => {
    for (let i = 0; i < cant; i++) {
        let random = Math.ceil(Math.random() * 1000);
        if (result.hasOwnProperty(random)) {
            result[random] = result[random] + 1;
        } else {
            result[random] = 1;
        }
    }
    process.send(result);
});
