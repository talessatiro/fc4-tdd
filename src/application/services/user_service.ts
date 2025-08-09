import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user_repository";
import { CreateUserDTO } from "../dtos/create_user_dto";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(user: CreateUserDTO): Promise<User> {
    const userDomain = new User(uuidv4(), user.name);
    await this.userRepository.save(userDomain);

    return userDomain;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
