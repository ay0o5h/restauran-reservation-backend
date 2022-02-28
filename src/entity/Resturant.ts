import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Admin } from "./Admin";
import { Tables } from "./Tables";

@Entity()
export class Resturant extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bgImage: string;
    @Column()
    floorMap: string;

    @Column()
    numOfTable: number;

    @Column()
    openDate: Date;

    @Column()
    closeDate: Date;

    @Column({ default: false })
    isOpen: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // TODO: make relationship
    @ManyToOne((type) => Admin, (admin) => admin.rest)
    admin: Admin;
    @OneToMany((type) => Tables, (table) => table.rest)
    table: Tables[];

}


