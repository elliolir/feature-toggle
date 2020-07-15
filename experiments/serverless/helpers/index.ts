import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context} from "aws-lambda"

const getResponse = (statusCode: number, body: unknown): APIGatewayProxyResult => ({
    statusCode,
    body: JSON.stringify(
        body,
        null,
        2
    )
})


const enhanceLambda = (middleware: Function) => (lambda: APIGatewayProxyHandler) => (event:APIGatewayProxyEvent, context:Context) => middleware(event, context)(lambda);


export { getResponse, enhanceLambda }
