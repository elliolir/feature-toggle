import {APIGatewayProxyResult} from "aws-lambda"

const getResponse = (statusCode: number, body: any): APIGatewayProxyResult => ({
    statusCode,
    body: JSON.stringify(
        body,
        null,
        2
    )
})

export { getResponse }