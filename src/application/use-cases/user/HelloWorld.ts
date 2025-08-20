import { HelloWorldUseCase } from "../common/HelloWorld";
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

@injectable()
export default class HelloWorldUserUseCase extends HelloWorldUseCase {
  constructor(
    @inject("IUserRepository") _userRepository: IUserRepository
  ) {
    super(_userRepository);
  }

  protected formatMessage(name: string, id: string): string {
    return `Hola ${name} (${id}). Te has registrado correctamente como usuario.`;
  }
}
