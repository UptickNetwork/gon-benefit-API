export class CreateNftDto {    
	id: number;
	chainType: string;
	name: string;

	nftAddress: string;

	nftId: string;

	description: string;

	creator: string;

	owner: string;

	imgUrl: string;

	metadataUrl: string;
	
	hash: string;
	
	createTime: Date;
	
	updateTime: Date;
	
	isDelete: boolean;
}
