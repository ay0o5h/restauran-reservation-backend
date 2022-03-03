import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Resturant } from "./Resturant";

@Entity()
export class Admin extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column({ default: null })
    otp: number;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    otpNewPassword: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // TODO: make relationship
    @OneToMany((type) => Resturant, (rest) => rest.admin)
    rest: Resturant[];

}


