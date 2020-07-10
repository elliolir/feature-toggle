import {APIGatewayProxyResult} from "aws-lambda"

const getResponse = (statusCode: number, body: unknown): APIGatewayProxyResult => ({
    statusCode,
    body: JSON.stringify(
        body,
        null,
        2
    )
})

export { getResponse }
