import { IResponse } from "serverless-request-manager";
import { IEvent } from "serverless-request-manager/dist/interfaces/IEvent";
import { container } from "../../infrastructure/container";
import HelloWorldUseCase  from "../../application/use-cases/public/HelloWorld";

async function hello(event: IEvent): Promise<IResponse> {
  const helloWorldUseCase = container.resolve(HelloWorldUseCase);
  return await helloWorldUseCase.execute(event.payload?.detail?.data?.name || 'público');
}

export const eventUseCases = {
    'hello': hello
};