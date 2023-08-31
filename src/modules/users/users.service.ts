import { Paginator } from '@/src/common/utils/paginator';
import { comparePassword, encryptPassword } from '@/src/common/utils/password';
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

    filterHandler.applyFilters(query, filterDto);

    query.leftJoinAndSelect('user.profile', 'profile');
    query.leftJoinAndSelect('user.department', 'department');

    const paginator = new Paginator<User>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    console.log(id);
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    const validPass = await comparePassword(
      updateUserDto.confirmPassword,
      user.password,
    );
    if (!validPass)
      throw new HttpException(
        'Old Password and Confirm Password do not match',
        HttpStatus.BAD_REQUEST,
      );

    const profile = await this.profileService.findOne(updateUserDto.profileId);

    user.username = updateUserDto.username;
    user.profile = profile;
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
    user.deletedAt = new Date();
    return this.userRepository.save(user);
  }
}
