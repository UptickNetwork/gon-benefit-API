import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Metauri{

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
    imgUrl: string;
   
    @Column({ nullable: true })
    metadataUrl: string;
	
    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;
	
   @UpdateDateColumn({ type: 'timestamp' })
    updateTime: Date;
	
    @Column({ nullable: true })
    isDelete: boolean;
	
	  
}
