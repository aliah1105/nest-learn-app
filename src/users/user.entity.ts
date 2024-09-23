import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('User inseted to the database');
  }
  @AfterUpdate()
  logUpdate() {
    console.log('User updated in the database');
  }
  @AfterRemove()
  logRemove() {
    console.log('User remove from the database');
  }
}
