export class UpdateNftDto {
    
    chainType: string;
    
    name: string;
   
    nftAddress: string;
    
    nftId: string;
    
    description: string;
    
    creator: string;
   
    owner: string;
   
    imgUrl: string;
   status: number;      // status  0或者空是 未质押 1已质押 2已续期3已过期
   hash: string;
   price: string;
   startTime: number;
   endTime: number;
   period: number;
   
    metadataUrl: string;
	    createTime: Date;
	    updateTime: Date;
    isDelete: boolean;
  }
  