import { IResponse } from "serverless-request-manager";
import { IEvent } from "serverless-request-manager/dist/interfaces/IEvent";
import { container } from "../../infrastructure/container";
import HelloWorldUserUseCase from "../../application/use-cases/user/HelloWorld";
import CreateUserUseCase from "../../application/use-cases/user/CreateUser";
import GetUserUseCase from "../../application/use-cases/user/GetUser";
import GetAllUsersUseCase from "../../application/use-cases/user/GetAllUsers";
import UpdateUserUseCase from "../../application/use-cases/user/UpdateUser";
import DeleteUserUseCase from "../../application/use-cases/user/DeleteUser";

// Hello World endpoint (mantener el existente)
async function hello(event: IEvent): Promise<IResponse> {
  const helloWorldUseCase = container.resolve(HelloWorldUserUseCase);
  return await helloWorldUseCase.execute(event.queryParams?.name ? event.queryParams?.name : event.payload?.pathParameters?.name ? event.payload?.pathParameters?.name : 'público');
}

// CRUD endpoints
async function createUser(event: IEvent): Promise<IResponse> {
  const createUserUseCase = container.resolve(CreateUserUseCase);
  const userData = event.payload?.body ? JSON.parse(event.payload.body) : {};
  return await createUserUseCase.execute(userData);
}

async function getUser(event: IEvent): Promise<IResponse> {
  const getUserUseCase = container.resolve(GetUserUseCase);
  const id = event.payload?.pathParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "ID de usuario requerido" })
    };
  }
  return await getUserUseCase.execute(id);
}

async function getAllUsers(event: IEvent): Promise<IResponse> {
  const getAllUsersUseCase = container.resolve(GetAllUsersUseCase);
  return await getAllUsersUseCase.execute();
}

async function updateUser(event: IEvent): Promise<IResponse> {
  const updateUserUseCase = container.resolve(UpdateUserUseCase);
  const id = event.payload?.pathParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "ID de usuario requerido" })
    };
  }
  const updateData = event.payload?.body ? JSON.parse(event.payload.body) : {};
  return await updateUserUseCase.execute(id, updateData);
}

async function deleteUser(event: IEvent): Promise<IResponse> {
  const deleteUserUseCase = container.resolve(DeleteUserUseCase);
  const id = event.payload?.pathParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "ID de usuario requerido" })
    };
  }
  return await deleteUserUseCase.execute(id);
}

export const userUseCases = {
  get: {
    hello,
    '/users': getAllUsers,
    '/users/{id}': getUser
  },
  post: {
    '/users': createUser
  },
  put: {
    '/users/{id}': updateUser
  },
  delete: {
    '/users/{id}': deleteUser
  }
};
