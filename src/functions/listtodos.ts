import { document } from '../utils/dynamodbClient';

export const handle = async (event) => {
  const { userid } = event.pathParameters;

  const response = await document.query({
    TableName: 'desafioserverless',
    KeyConditionExpression: 'userid = :userid',
    ExpressionAttributeValues: {
      ':userid': String(userid)
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      response
    })
  }
}