import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tables } from "./Tables";
import { User } from "./User";

@Entity()
export class Booking extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numOfPeople: number;

    @Column()
    resTime: Date;

    @Column({ default: false })
    isEnd: boolean;
    @Column({ default: null })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // TODO: make relationship

    @ManyToOne((type) => Tables, (table) => table.book)
    table: Tables;
    @ManyToOne((type) => User, (user) => user.book)
    user: User;

}


