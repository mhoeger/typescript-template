import { AzureFunction, HttpRequest, Context } from "@azure/functions"
import { intersection } from "lodash"

const run: AzureFunction = async function (context: Context, req: HttpRequest) {
    context.log(`JavaScript HTTP triggered function '${context.executionContext.functionName}' processed a request.`);
    const helloArray = intersection(["hello", "world!"], ["hello", "there", "world!", ":)"]);
    return {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify(helloArray)
    };
};

export { run };