import { container } from "tsyringe";
import HelloWorldUserUseCase from "../../../application/use-cases/user/HelloWorld";
import CreateUserUseCase from "../../../application/use-cases/user/CreateUser";
import GetUserUseCase from "../../../application/use-cases/user/GetUser";
import GetAllUsersUseCase from "../../../application/use-cases/user/GetAllUsers";
import UpdateUserUseCase from "../../../application/use-cases/user/UpdateUser";
import DeleteUserUseCase from "../../../application/use-cases/user/DeleteUser";

// Registrar todos los casos de uso de User
container.register("HelloWorldUserUseCase", {
  useClass: HelloWorldUserUseCase
});

container.register("CreateUserUseCase", {
  useClass: CreateUserUseCase
});

container.register("GetUserUseCase", {
  useClass: GetUserUseCase
});

container.register("GetAllUsersUseCase", {
  useClass: GetAllUsersUseCase
});

container.register("UpdateUserUseCase", {
  useClass: UpdateUserUseCase
});

container.register("DeleteUserUseCase", {
  useClass: DeleteUserUseCase
});
