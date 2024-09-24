import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity()
@Unique(["name"]) // Ensures role names are unique across all entries
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string; // Example: 'admin', 'user', 'editor'

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => User, user => user.role) // Assuming each user has one role
  users: User;
}
