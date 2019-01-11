import { AzureFunction, Context } from "@azure/functions"

const queueFunction: AzureFunction = async function (context: Context, myQueueItem: string) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
};

export default queueFunction;