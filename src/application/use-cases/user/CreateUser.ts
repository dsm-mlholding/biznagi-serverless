import { IResponse, ResponseService } from "serverless-request-manager";
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { v4 as uuid } from "uuid";

const responseService = new ResponseService();


@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {}

  async execute(userData: { name: string }): Promise<IResponse> {
    try {
      console.log("Executing CreateUserUseCase", { userData });

      const user: User = {
        id: uuid(),
        name: userData.name
      };

      const savedUser = await this._userRepository.save(user);
      console.log("User created successfully", { savedUser });

      return responseService.responseSuccess({
        data: savedUser
      });
    } catch (error) {
      console.error("Error creating user", { error });
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error al crear el usuario",
          error: error instanceof Error ? error.message : "Unknown error"
        })
      };
    }
  }
}
