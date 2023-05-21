import { Controller, Get, Post, Body, Patch, Param,Query, Delete } from '@nestjs/common';
import { NftService } from './nft.service';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { FindNftDto } from './dto/find-nft.dto';
import { Nft } from './entities/nft.entity';
import { IrisBase } from "../client/baseClient";
import { UptickBase } from "../client/uptickClient";

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}
  
  @Post('edit')
  async update(@Body() updateNftDto: UpdateNftDto) {
	  console.log("assss")
  	  let nft=new Nft()
  	  let list=[]
  	    let findNftDto=new FindNftDto();
  	    findNftDto.nftAddress=updateNftDto.nftAddress
  	    findNftDto.nftId=updateNftDto.nftId
  	    list= await this.nftService.findOneByaddress(findNftDto);
		if(list&&list.length>0){
			nft=list[0]
			await this.nftService.update(nft.id,updateNftDto);
			 list= await this.nftService.findOneByaddress(findNftDto);
			  		if(list&&list.length>0){
			  			nft=list[0]
			  		}
		}
  	
  	    let code=1;
  	    
  	    if(nft&&nft.id>0){
  	    		 code=0
  	    }
  	     let jsonResult={
  	       	"code":code,
  	       	"obj":nft
  	       }
  	  return jsonResult
  	  
  }
  @Post('updateUser')
    async updateUser(){
  	  let client : any;
  	 let irisParam = {
  	      node :      "http://34.80.93.133:26657/",
  	      chainID:    "gon-irishub-1",	
  	      gas:        "5138174",
  	      amount:     "100000",
  	      denom:      "uiris"
  	      // node :      "https://rpc.nyancat.rainbow.one/",
  	      // chainID:    "nyancat-9",	
  	      // gas:        "5138174",
  	      // amount:     "100000",
  	      // denom:      "unyan"
  	      
  	  }
  	 let uptickParam = {
  	      node :      "http://52.220.252.160:26657/",
  	      chainID:    "uptick_7000-2",	
  	      gas:        "5138174",
  	      amount:     "100000",
  	      denom:      "auptick"
  	      
  	  }
  	  client = await UptickBase.getClient(
  	  
  	      uptickParam.node,
  	      uptickParam.chainID,
  	      uptickParam.gas,
  	      uptickParam.denom,
  	      uptickParam.amount
  	    
  	  ); 
	   // client = await IrisBase.getClient(
  	  
  	 //      irisParam.node,
  	 //      irisParam.chainID,
  	 //      irisParam.gas,
  	 //      irisParam.denom,
  	 //      irisParam.amount
  	    
  	 //  );
  	 console.log("获得余额:");
  	 await client.bank.queryBalance("uptick1pwmvxnqkjy4cj4q86adlzmdwjdlj7pr5man96q", uptickParam.denom)
  	 .then(res => {
  	   console.log(JSON.stringify(res));
  	 })
  	 .catch(error => {
  	   console.log(error);
  	 });
	  // let denoms=null;
	  // await client.nft.queryOwner("uptick1pwmvxnqkjy4cj4q86adlzmdwjdlj7pr5man96q")
	  // .then(res => {
	 	// 	  let denoms=JSON.stringify(res)
	  //   console.log(denoms);
	 		
	  // })
	  // .catch(error => {
	  //   console.log(error);
	  // });
	 return 1;
  // 	  console.log("获得余额:");
  // 	  await client.bank.queryBalance("iaa1wxl44399uppwd5uc6rrgz07plzs9atv8fxt7qr",'uiris')
  // 	  .then(res => {
  // 	    console.log(JSON.stringify(res));
  // 	  })
  // 	  .catch(error => {
  // 	    console.log(error);
  // 	  });
	  
	  
	 //  let denoms=null;
	 //  await client.nft.queryOwner("iaa1wxl44399uppwd5uc6rrgz07plzs9atv8fxt7qr")
	 //  .then(res => {
		//   let denoms=JSON.stringify(res)
	 //    console.log(denoms);
		
	 //  })
	 //  .catch(error => {
	 //    console.log(error);
	 //  });
  // 	  return denoms
    }
  // 跨链后调用接口
  @Post('cross')
  async cross(@Body() updateNftDto: UpdateNftDto) {
  	  console.log("assss")
  	  let nft=new Nft()
  	  let list=[]
  	    let findNftDto=new FindNftDto();
  	    findNftDto.nftAddress=updateNftDto.nftAddress
  	    findNftDto.nftId=updateNftDto.nftId
  	    list= await this.nftService.findOneByaddress(findNftDto);
  		if(list&&list.length>0){
  			nft=list[0]
  			await this.nftService.update(nft.id,updateNftDto);
  			 list= await this.nftService.findOneByaddress(findNftDto);
  			  		if(list&&list.length>0){
  			  			nft=list[0]
  			  		}
  		}
  	
  	    let code=1;
  	    
  	    if(nft&&nft.id>0){
  	    		 code=0
  	    }
  	     let jsonResult={
  	       	"code":code,
  	       	"obj":nft
  	       }
  	  return jsonResult
  	  
  }
  @Post()
  async create(@Body() createNftDto: CreateNftDto) {
	  
		let list= await this.nftService.createArray(createNftDto);
		let jsonResult={
			"code":1,
			"list":list
		}
		if(list&&list.length>0){
			jsonResult.code=0	
		}

    return jsonResult
  }



  @Post('nftInfo')
  async nftInfo(@Body()findNftDto: FindNftDto) {
	  let obj=null;
	  let list=await this.nftService.findOneByaddress(findNftDto);
	  if(list&&list.length>0){
		  obj=list[0]
	  }
	  let jsonResult={
	  	"code":0,
	  	"obj":obj
	  }
    return jsonResult
  }
  @Post('searchPage')
  async searchPage(@Query("type") type:number,@Body() findNftDto: FindNftDto) {
   let list=null
	 if(type==0){
		list=await this.nftService.findOneByaddress(findNftDto);
	} else if(type==1){
		findNftDto.creator=findNftDto.owner
		list=await this.nftService.findOneByaddress(findNftDto);
	}else if(type==2){
		list=await this.nftService.findByParam(findNftDto);
	}
	
	let jsonResult={
		"code":0,
		"list":list
	}
    return jsonResult
  }

  @Get()
  async findAll() {
    return await this.nftService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.nftService.findOne(+id);
  }



  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.nftService.remove(+id);
  }
  
}
