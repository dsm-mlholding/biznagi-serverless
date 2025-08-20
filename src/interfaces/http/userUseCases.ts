import { IResponse } from "serverless-request-manager";
import { IEvent } from "serverless-request-manager/dist/interfaces/IEvent";
import { container } from "../../infrastructure/container";
import HelloWorldUserUseCase from "../../application/use-cases/user/HelloWorld";

async function hello(event: IEvent): Promise<IResponse> {
  const helloWorldUseCase = container.resolve(HelloWorldUserUseCase);
  return await helloWorldUseCase.execute(event.queryParams?.name ? event.queryParams?.name : event.payload?.pathParameters?.name ? event.payload?.pathParameters?.name : 'público');
}

export const userUseCases = {
  get: {
    hello
  }
};
