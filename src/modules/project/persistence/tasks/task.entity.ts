import { CommonEntity } from '@libs/common/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from '../projects/project.entity';
import { UserEntity } from '@user/persistence/users/user.entity';

@Entity('tasks')
export class TaskEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'project_id' })
  projectId: string;
  @Column()
  title: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ name: 'status', nullable: true })
  status: string;
  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate: Date;
  @Column({ name: 'assignee_id', nullable: true })
  assigneeId: string;
  @Column({ name: 'tags', type: 'text', array: true, nullable: true })
  tags: string[];
  @Column({ name: 'priority', nullable: true })
  priority: string;
  @ManyToOne(() => ProjectEntity, (project) => project.tasks, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;
  @ManyToOne(() => UserEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assignee_id' })
  assignee: UserEntity;
}
