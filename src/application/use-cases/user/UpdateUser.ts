import { IResponse, ResponseService } from "serverless-request-manager";
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

const responseService = new ResponseService();

@injectable()
export default class UpdateUserUseCase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {}

  async execute(id: string, updateData: { name?: string }): Promise<IResponse> {
    try {
      console.log("Executing UpdateUserUseCase", { id, updateData });

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

      const updateResult = await this._userRepository.update(id, updateData);
      
      if (!updateResult.updated) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "No se pudo actualizar el usuario"
          })
        };
      }

      // Obtener el usuario actualizado
      const updatedUser = await this._userRepository.findById(id);
      
      console.log("User updated successfully", { updateResult, updatedUser });

      return responseService.responseSuccess({
        data: updatedUser
      });
    } catch (error) {
      console.error("Error updating user", { error });
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error al actualizar el usuario",
          error: error instanceof Error ? error.message : "Unknown error"
        })
      };
    }
  }
}
