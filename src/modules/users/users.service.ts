import { Paginator } from '@/src/common/utils/paginator';
import { encryptPassword } from '@/src/common/utils/password';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentService } from '../department/department.service';
import { ProfileService } from '../profile/profile.service';
import { CreateUserDto } from './dtos/create.dto';
import { GetUsersFilterDto } from './dtos/get-users.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { User } from './entities/user.entity';
import { UserFiltersHandler } from './filters/users-filters.handler';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private profileService: ProfileService,
    private departmentService: DepartmentService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const profile = await this.profileService.findOne(createUserDto.profileId);
    const department = await this.departmentService.findOne(
      createUserDto.departmentId,
    );

    const user = new User();
    user.username = createUserDto.username;
    user.password = await encryptPassword(createUserDto.password);
    user.profile = profile;
    user.department = department;
    user.name = createUserDto.name;
    user.isPublished = createUserDto.isPublished;
    user.isDraft = createUserDto.isDraft;

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
  }

  async findAll(filterDto: GetUsersFilterDto) {
    const { limit, offset } = filterDto;

    const query = this.userRepository.createQueryBuilder('user');
    const filterHandler = new UserFiltersHandler();

    query.orderBy('user.partidaId', 'DESC');

    filterHandler.applyFilters(query, filterDto);

    query.leftJoinAndSelect('user.profile', 'profile');
    query.leftJoinAndSelect('user.department', 'department');

    const paginator = new Paginator<User>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (user.isPublished && updateUserDto.isDraft) {
      throw new HttpException(
        'This user is already processed and cannot be edited',
        HttpStatus.BAD_REQUEST,
      );
    }

    const profile = await this.profileService.findOne(updateUserDto.profileId);

    user.username = updateUserDto.username;
    user.profile = profile;
    user.name = updateUserDto.name;
    user.isPublished = updateUserDto.isPublished;
    user.isDraft = updateUserDto.isDraft;

    if (updateUserDto.newPassword)
      user.password = await encryptPassword(updateUserDto.newPassword);

    const department = await this.departmentService.findOne(
      updateUserDto.departmentId,
    );

    user.department = department;

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return await this.userRepository.remove(user);
  }
}
