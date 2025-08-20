import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../../interfaces/aws-lambda/handler';

describe('handleApiGateway', () => {
  it('should call the correct handler for operationId publicHello', async () => {
    const event ={
      resource: '/hello/{name}',
      path: '/bridge/hello/Eduardo',
      httpMethod: 'GET',
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        Host: 'dev.usmxbridgeapp.link',
        'Postman-Token': '51365acc-9f98-49d7-848c-572357cd61a8',
        'User-Agent': 'PostmanRuntime/7.43.4',
        'X-Amzn-Trace-Id': 'Root=1-6894af01-1717d6034d7280285af30f3e',
        'X-Forwarded-For': '187.188.76.63',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https'
      },
      multiValueHeaders: {
        Accept: [Array],
        'Accept-Encoding': [Array],
        'Cache-Control': [Array],
        Host: [Array],
        'Postman-Token': [Array],
        'User-Agent': [Array],
        'X-Amzn-Trace-Id': [Array],
        'X-Forwarded-For': [Array],
        'X-Forwarded-Port': [Array],
        'X-Forwarded-Proto': [Array]
      },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: { name: 'Eduardo' },
      stageVariables: null,
      requestContext: {
        resourceId: 'pmjnii',
        resourcePath: '/hello/{name}',
        operationName: 'publicHelloGetName',
        httpMethod: 'GET',
        extendedRequestId: 'O8BITFyQoAMEAJQ=',
        requestTime: '07/Aug/2025:13:49:53 +0000',
        path: '/bridge/hello/Eduardo',
        accountId: '398808282173',
        protocol: 'HTTP/1.1',
        stage: 'v1',
        domainPrefix: 'dev',
        requestTimeEpoch: 1754574593539,
        requestId: '616c8097-61cf-49f9-be3a-232c43496428',
        identity: [Object],
        domainName: 'dev.usmxbridgeapp.link',
        deploymentId: '94tmls',
        apiId: 'p4um5bwkkc'
      },
      body: null,
      isBase64Encoded: false
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event, {} as Context);
    expect(result.statusCode).toBe(200);

  });
});
