import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;

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
