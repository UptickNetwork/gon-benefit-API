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
	
    @Column({ nullable: true, type: 'longtext'  })
    description: string;
	
    @Column({ nullable: true })
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
    status: number;      // status  0或者空是 未质押 1已质押 2已续期3已过期
	
	
	@Column({ nullable: true })
	price: string;
	
	@Column({ nullable: true })
	startTime: number;
	
	@Column({ nullable: true })
	endTime: number;
	
	@Column({ nullable: true })
	period: number;
	
    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;
	
   @UpdateDateColumn({ type: 'timestamp' })
    updateTime: Date;
	
    @Column({ nullable: true })
    isDelete: boolean;
	
	  
}
