import { HttpRouter } from "aws-events-adapter";
import { userUseCases } from "../../interfaces/http/userUseCases";

export const httpRouter: HttpRouter = {
  get: {
    '/hello': {
      handler: userUseCases.get.hello,
    },
    '/hello/{name}': {
      handler: userUseCases.get.hello,
    }
  }
};

