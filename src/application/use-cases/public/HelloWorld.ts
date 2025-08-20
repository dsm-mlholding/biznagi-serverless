import { injectable } from "tsyringe";
import { HelloWorldUseCase } from "../common/HelloWorld";

@injectable()
export default class HelloWorldUserUseCase extends HelloWorldUseCase {
  protected formatMessage(name: string, id: string): string {
    return `Hola ${name} (${id}). Te has registrado correctamente como usuario.`;
  }
}
