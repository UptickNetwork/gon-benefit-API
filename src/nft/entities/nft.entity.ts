import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Nft{

    @PrimaryGeneratedColumn()
    id: number;
	
    @Column({ nullable: true })
    chainType: string;
	
    @Column({ nullable: true })
    name: string;
	
	@Column({ nullable: true })
	nftAddress: string;
	
	@Column({ nullable: true })
	nftId: string;
	
    @Column({ nullable: true })
    description: string;
	
    @Column()
    creator: string;
	
    @Column({ nullable: true })
    owner: string;
	
    @Column({ nullable: true })
    imgUrl: string;
   
    @Column({ nullable: true })
    metadataUrl: string;
	
    @Column({ nullable: true })
    hash: string;
	
    @Column({ nullable: true })
    status: number;
	
    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;
	
   @UpdateDateColumn({ type: 'timestamp' })
    updateTime: Date;
	
    @Column({ nullable: true })
    isDelete: boolean;
	
	  
}
