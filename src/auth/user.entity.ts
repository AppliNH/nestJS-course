import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { Task } from "src/tasks/task.entity";

@Entity()
@Unique(["username"]) // Means that the username must be unique in db. Else, .save(), will throw an error.
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Task, task => task.user, {eager: true}) // When eager is set to true, we can access this property (tasks) immediatly for the retrieved user.
    tasks: Task[]; // One user can have many tasks => OneToMany



    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}