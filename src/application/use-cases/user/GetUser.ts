import { IResponse, ResponseService } from "serverless-request-manager";
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

const responseService = new ResponseService();

@injectable()
export default class GetUserUseCase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<IResponse> {
    try {
      console.log("Executing GetUserUseCase", { id });

      const user = await this._userRepository.findById(id);
      
      if (!user) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "Usuario no encontrado"
          })
        };
      }

      console.log("User found", { user });

      return responseService.responseSuccess({
        data: user
      });
    } catch (error) {
      console.error("Error getting user", { error });
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error al obtener el usuario",
          error: error instanceof Error ? error.message : "Unknown error"
        })
      };
    }
  }
}
