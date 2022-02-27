import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Booking } from "./Booking";
import { Resturant } from "./Resturant";

@Entity()
export class Tables extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    x: number;

    @Column()
    y: number;

    @Column()
    isBooked: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // TODO: make relationship
    @ManyToOne((type) => Resturant, (rest) => rest.table)
    rest: Resturant;
    @OneToMany((type) => Booking, (book) => book.table)
    book: Booking[];

}


