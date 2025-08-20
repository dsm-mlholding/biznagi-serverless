import { Context } from 'aws-lambda';
import { handler } from '../../interfaces/aws-lambda/handler';

describe('handler (EventBridge)', () => {
  it('should handle an EventBridge event and return a 200', async () => {
    const event = {
      source: 'EVENT_BRIDGE',
      detail: { operationName: 'hello', data:{name: 'LALO'} }
    };
    const result = await handler(event, {} as Context);
    expect(result.statusCode).toBe(200);
  });
});
