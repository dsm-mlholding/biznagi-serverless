import { IResponse, ResponseService } from "serverless-request-manager";
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { v4 as uuid } from "uuid";
import { User } from "../../../domain/entities/User";

const responseService = new ResponseService();

@injectable()
export class HelloWorldUseCase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {}

  protected formatMessage(name: string, id: string): string {
    return `Hola ${name} (${id})`;
  }

  async execute(name: string): Promise<IResponse> {
    console.log("Executing HelloWorldUseCase");

    console.log("Saving user: ", {name});

    const user:User = {
      id: uuid(),
      name: name
    };
    const repoName = await this._userRepository.save(user);
    console.log("User saved: ", {repoName});

    console.log("Formatting message: ", {name, repoName});
    const message = this.formatMessage(name, user.id);
    console.log("Message: ", {message});

    const response = responseService.responseSuccess({
      data: message
    });

    console.log("Response: ", {response});
    return response;
  }
}
