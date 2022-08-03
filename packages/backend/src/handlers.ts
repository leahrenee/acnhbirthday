import {api} from "./api"

export const birthdayHandler = async (payload: AWSLambda.APIGatewayEvent) => {
  console.log(JSON.stringify(payload));
  const birthday = payload.queryStringParameters['birthday'];
  const birthmonth = payload.queryStringParameters['birthmonth'];
  return api.getVillagerByBirthday(parseInt(birthday), parseInt(birthmonth));
};
