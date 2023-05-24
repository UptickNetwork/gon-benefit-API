export class CreateMetauriDto {    
	id: number;
	chainType: string;

	name: string;

	nftAddress: string;

	nftId: string;

	description: string;

	imgUrl: string;

	metadataUrl: string;
	createTime: Date;

	updateTime: Date;

	isDelete: boolean;
}
