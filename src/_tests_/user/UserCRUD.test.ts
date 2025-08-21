import { container } from "../../infrastructure/container";
import CreateUserUseCase from "../../application/use-cases/user/CreateUser";
import GetUserUseCase from "../../application/use-cases/user/GetUser";
import GetAllUsersUseCase from "../../application/use-cases/user/GetAllUsers";
import UpdateUserUseCase from "../../application/use-cases/user/UpdateUser";
import DeleteUserUseCase from "../../application/use-cases/user/DeleteUser";

// Mock del repositorio para las pruebas
const mockUserRepository = {
  save: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getList: jest.fn()
};

// Mock del container para las pruebas
jest.mock("../../infrastructure/container", () => ({
  container: {
    resolve: jest.fn()
  }
}));

describe("User CRUD Use Cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (container.resolve as jest.Mock).mockImplementation((token: string) => {
      switch (token) {
        case "CreateUserUseCase":
          return new CreateUserUseCase(mockUserRepository as any);
        case "GetUserUseCase":
          return new GetUserUseCase(mockUserRepository as any);
        case "GetAllUsersUseCase":
          return new GetAllUsersUseCase(mockUserRepository as any);
        case "UpdateUserUseCase":
          return new UpdateUserUseCase(mockUserRepository as any);
        case "DeleteUserUseCase":
          return new DeleteUserUseCase(mockUserRepository as any);
        default:
          return null;
      }
    });
  });

  describe("CreateUserUseCase", () => {
    it("should create a user successfully", async () => {
      const userData = { name: "Test User" };
      const createdUser = { id: "test-id", name: "Test User" };
      
      mockUserRepository.save.mockResolvedValue(createdUser);

      const useCase = container.resolve("CreateUserUseCase") as CreateUserUseCase;
      const result = await useCase.execute(userData);

      expect(mockUserRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result.statusCode).toBe(200);
      expect(result.data).toEqual(createdUser);
    });

    it("should handle errors when creating user", async () => {
      const userData = { name: "Test User" };
      const error = new Error("Database error");
      
      mockUserRepository.save.mockRejectedValue(error);

      const useCase = container.resolve("CreateUserUseCase") as CreateUserUseCase;
      const result = await useCase.execute(userData);

      expect(result.statusCode).toBe(500);
      expect(result.body).toContain("Error al crear el usuario");
    });
  });

  describe("GetUserUseCase", () => {
    it("should get a user by id successfully", async () => {
      const userId = "test-id";
      const user = { id: userId, name: "Test User" };
      
      mockUserRepository.findById.mockResolvedValue(user);

      const useCase = container.resolve("GetUserUseCase") as GetUserUseCase;
      const result = await useCase.execute(userId);

      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(result.statusCode).toBe(200);
      expect(result.data).toEqual(user);
    });

    it("should return 404 when user not found", async () => {
      const userId = "non-existent-id";
      
      mockUserRepository.findById.mockResolvedValue(null);

      const useCase = container.resolve("GetUserUseCase") as GetUserUseCase;
      const result = await useCase.execute(userId);

      expect(result.statusCode).toBe(404);
      expect(result.body).toContain("Usuario no encontrado");
    });
  });

  describe("GetAllUsersUseCase", () => {
    it("should get all users successfully", async () => {
      const users = [
        { id: "1", name: "User 1" },
        { id: "2", name: "User 2" }
      ];
      
      mockUserRepository.findAll.mockResolvedValue(users);

      const useCase = container.resolve("GetAllUsersUseCase") as GetAllUsersUseCase;
      const result = await useCase.execute();

      expect(mockUserRepository.findAll).toHaveBeenCalled();
      expect(result.statusCode).toBe(200);
      expect(result.data).toEqual(users);
    });
  });

  describe("UpdateUserUseCase", () => {
    it("should update a user successfully", async () => {
      const userId = "test-id";
      const updateData = { name: "Updated Name" };
      const existingUser = { id: userId, name: "Old Name" };
      const updatedUser = { id: userId, name: "Updated Name" };
      
      mockUserRepository.findById
        .mockResolvedValueOnce(existingUser) // Para verificar que existe
        .mockResolvedValueOnce(updatedUser); // Para obtener el usuario actualizado
      mockUserRepository.update.mockResolvedValue({ id: userId, updateParams: updateData, updated: true });

      const useCase = container.resolve("UpdateUserUseCase") as UpdateUserUseCase;
      const result = await useCase.execute(userId, updateData);

      expect(mockUserRepository.update).toHaveBeenCalledWith(userId, updateData);
      expect(result.statusCode).toBe(200);
      expect(result.data).toEqual(updatedUser);
    });

    it("should return 404 when updating non-existent user", async () => {
      const userId = "non-existent-id";
      const updateData = { name: "Updated Name" };
      
      mockUserRepository.findById.mockResolvedValue(null);

      const useCase = container.resolve("UpdateUserUseCase") as UpdateUserUseCase;
      const result = await useCase.execute(userId, updateData);

      expect(result.statusCode).toBe(404);
      expect(result.body).toContain("Usuario no encontrado");
    });
  });

  describe("DeleteUserUseCase", () => {
    it("should delete a user successfully", async () => {
      const userId = "test-id";
      const existingUser = { id: userId, name: "Test User" };
      const deleteResult = { id: userId };
      
      mockUserRepository.findById.mockResolvedValue(existingUser);
      mockUserRepository.delete.mockResolvedValue(deleteResult);

      const useCase = container.resolve("DeleteUserUseCase") as DeleteUserUseCase;
      const result = await useCase.execute(userId);

      expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
      expect(result.statusCode).toBe(200);
      expect(result.data).toEqual(deleteResult);
    });

    it("should return 404 when deleting non-existent user", async () => {
      const userId = "non-existent-id";
      
      mockUserRepository.findById.mockResolvedValue(null);

      const useCase = container.resolve("DeleteUserUseCase") as DeleteUserUseCase;
      const result = await useCase.execute(userId);

      expect(result.statusCode).toBe(404);
      expect(result.body).toContain("Usuario no encontrado");
    });
  });
});
