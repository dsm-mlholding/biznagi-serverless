import { IResponse, ResponseService } from "serverless-request-manager";
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

const responseService = new ResponseService();

@injectable()
export default class GetAllUsersUseCase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {}

  async execute(): Promise<IResponse> {
    try {
      console.log("Executing GetAllUsersUseCase");

      const users = await this._userRepository.findAll();
      
      console.log("Users found", { count: users.length });

      return responseService.responseSuccess({
        data: users
      });
    } catch (error) {
      console.error("Error getting all users", { error });
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error al obtener los usuarios",
          error: error instanceof Error ? error.message : "Unknown error"
        })
      };
    }
  }
}
