import { v4 } from 'uuid';

import { document } from '../utils/dynamodbClient';

interface ICreateTodos {
  id?: string;
	title: string;
	deadline: Date;
}

export const handle = async (event) => {
  const { userid } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodos;

  await document.put({
    TableName: "desafioserverless",
    Item: {
      id: v4(),
      userid: userid,
      title,
      done: false,
      deadline: new Date(deadline)
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todos created!",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
}



