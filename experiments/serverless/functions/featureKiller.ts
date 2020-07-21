import {APIGatewayProxyResult} from "aws-lambda";
import {getResponse} from "../helpers";

const lambda = async (error: unknown): Promise<APIGatewayProxyResult> => {
  console.log(error);
  //throw new CustomError("error while handling test feature", {pay: "load", test: "data", num: 123});
  return getResponse(200, {message: "Feature is on!"});
};

export const handler = lambda;
