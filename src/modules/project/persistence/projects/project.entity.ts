import { CommonEntity } from '@libs/common/common.entity';
import {
  Column,
  Entity,
  OneToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';

@Entity('projects')
export class ProjectEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ name: 'is_active', default: false })
  isActive: boolean;
  @OneToMany(() => TaskEntity, (task) => task.project, {
    onDelete: 'CASCADE',
  })
  tasks: TaskEntity[];
}
