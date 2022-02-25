import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Booking extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numOfPeople: number;

    @Column()
    resTime: Date;

    @Column()
    expTime: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // TODO: make relationship

}


