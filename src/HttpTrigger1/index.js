function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function other(logger) {
    logger();
    await sleep(1200);
    logger();
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let invocationId = 21;
    let logger = () => { console.log(invocationId) }
    other(logger);
    invocationId = 2100;
    context.log(invocationId + "hello");
    context.log(process.pid); 

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};

