import { User } from "../entities/User";
import { IRepository } from "./IRepository";

export interface IUserRepository extends IRepository<User> {
  // You can add specific methods for User repository here
  // For example: findByName(name: string): Promise<User | null>;
}
