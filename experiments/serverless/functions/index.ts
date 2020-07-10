import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {getResponse} from "../helpers";

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event);
    return getResponse(200, {message: "H~e"})
};
