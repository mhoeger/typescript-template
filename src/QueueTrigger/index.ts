const queueFunction = async function (context: any, myQueueItem: string) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
};

export default queueFunction;