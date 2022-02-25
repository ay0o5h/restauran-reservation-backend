import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

}


