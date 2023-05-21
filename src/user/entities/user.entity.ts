import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    uptickAddress: string;

    @Column({ nullable: true })
    photo: string;
    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;
   @UpdateDateColumn({ type: 'timestamp' })
    updateTime: Date;
    @Column({ nullable: true })
    isDelete: boolean;
}
