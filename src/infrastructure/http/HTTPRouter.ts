import { HttpRouter } from "aws-events-adapter";
import { userUseCases } from "../../interfaces/http/userUseCases";

export const httpRouter: HttpRouter = {
  get: {
    '/hello': {
      handler: userUseCases.get.hello,
    },
    '/hello/{name}': {
      handler: userUseCases.get.hello,
    },
    '/users': {
      handler: userUseCases.get['/users'],
    },
    '/users/{id}': {
      handler: userUseCases.get['/users/{id}'],
    }
  },
  post: {
    '/users': {
      handler: userUseCases.post['/users'],
    }
  },
  put: {
    '/users/{id}': {
      handler: userUseCases.put['/users/{id}'],
    }
  },
  delete: {
    '/users/{id}': {
      handler: userUseCases.delete['/users/{id}'],
    }
  }
};

