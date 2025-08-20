import { handler } from "../../interfaces/aws-lambda/handler";
import { Context } from "aws-lambda";

describe("handleSQS", () => {
  it("should handle an SQS event and return a 200", async () => {
    const sqsEvent = {
      Records: [
        {
          messageId: "1",
          receiptHandle: "abc",
          body: JSON.stringify({ operationName: "hello", data: { name: "LALO" } }),
          attributes: {},
          messageAttributes: {},
          md5OfBody: "",
          eventSource: "aws:sqs",
          eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:HelloQueue",
          awsRegion: "us-east-1"
        }
      ]
    } as any; // Puedes usar 'as SQSEvent' si tienes el tipo importado

    const result = await handler(sqsEvent, {} as Context);
    expect(result.statusCode).toBe(200);
    // Puedes agregar más asserts según la respuesta esperada
  });
});