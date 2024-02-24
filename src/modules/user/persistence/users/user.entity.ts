import { CommonEntity } from '@libs/common/common.entity';
import { Entity, Column, Index } from 'typeorm';
@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @Column()
  name: string;
  @Index()
  @Column({ unique: true })
  email: string;
  @Index()
  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;
  @Column({ nullable: true })
  gender: string;
  @Column()
  password: string;
  @Column({ name: 'is_active', default: true })
  isActive: boolean;
  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;
  @Column({ name: 'job_title', nullable: true })
  jobTitle: string;
}
