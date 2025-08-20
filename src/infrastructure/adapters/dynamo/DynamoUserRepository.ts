import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { User_Model } from '../../../domain/models/db/dynamo/UserModel';
import { DynamoRepository } from './base/DynamoRepository';

export class DynamoUserRepository extends DynamoRepository<User> implements IUserRepository {
  
  constructor() {
    super(User_Model);
  }

  protected mapToEntity(item: any): User {
    return new User(item.id, item.name);
  }
}
