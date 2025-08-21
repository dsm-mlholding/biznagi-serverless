import { IResponse, ResponseService } from "serverless-request-manager";
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

const responseService = new ResponseService();

@injectable()
export default class DeleteUserUseCase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<IResponse> {
    try {
      console.log("Executing DeleteUserUseCase", { id });

      // Verificar que el usuario existe
      const existingUser = await this._userRepository.findById(id);
      if (!existingUser) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "Usuario no encontrado"
          })
        };
      }

      const deleteResult = await this._userRepository.delete(id);
      
      console.log("User deleted successfully", { deleteResult });

      return responseService.responseSuccess({
        data: deleteResult
      });
    } catch (error) {
      console.error("Error deleting user", { error });
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error al eliminar el usuario",
          error: error instanceof Error ? error.message : "Unknown error"
        })
      };
    }
  }
}
