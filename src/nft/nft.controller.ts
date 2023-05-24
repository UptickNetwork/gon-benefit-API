  import { Controller, Get, Post, Body, Param,Query, Delete } from '@nestjs/common'
import { NftService } from './nft.service';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { FindNftDto } from './dto/find-nft.dto';
import { Nft } from './entities/nft.entity';
import { IrisBase } from "../client/baseClient";

@Controller('api/nft')
export class NftController {

	constructor(private readonly nftService: NftService) {
	}


	@Post('edit')
	async update(@Body() updateNftDto: UpdateNftDto) {
		console.log("assss")
		let nft = new Nft()
		let list = []
		let findNftDto = new FindNftDto();
		findNftDto.nftAddress = updateNftDto.nftAddress
		findNftDto.nftId = updateNftDto.nftId
		list = await this.nftService.findOneByaddress(findNftDto);
		if (list && list.length > 0) {
			nft = list[0]
			await this.nftService.update(nft.id, updateNftDto);
			list = await this.nftService.findOneByaddress(findNftDto);
			if (list && list.length > 0) {
				nft = list[0]
			}
		}

		let code = 1;

		if (nft && nft.id > 0) {
			code = 0
		}
		let jsonResult = {
			"code": code,
			"obj": nft
		}
		return jsonResult

	}
	@Get('updateUser')
	async updateUser(@Query('owner') owner: string) {
		
		let denoms = null;
		let createNftDtoList = []
		// let owner = "uptick1km87h5lvgklw3hdecdx3nld6y8wrthaf4xl3j5";

		let list = []
		let listOldDemonToken = []
		let findNftDto = new FindNftDto();
		findNftDto.owner = owner
		list = await this.nftService.findOneByaddress(findNftDto);
		if(list!=null&&list.length>0){
			for(let i=0;i<list.length;i++){
				let nft=list[i]
				let OldDemonToken=nft.nftAddress+","+nft.nftId
				listOldDemonToken.push(OldDemonToken)
			}
		}
		// console.log(listOldDemonToken)

		

		// let list= await this.nftService.createArray(createNftDto);
		
		if(owner.startsWith("iaa")){
			this.updateIrisData(listOldDemonToken,owner)
		}else if(owner.startsWith("uptick")){
			this.updateUptickData(listOldDemonToken,owner)
		}
	
		
		
		return denoms
	}
	async updateUptickData(listOldDemonToken:Array<string>,owner:string){
		
		var child_process = require("child_process");
		
		var curl = 'curl http://52.74.190.214:1317/uptick/collection/nfts?owner='+owner
		console.log(curl)
		var service = this.nftService;
		var child = child_process.exec(curl, function(err, stdout, stderr) {
		
			return stdout;
		})
		child.stdout.on('data', function(data) {
			let uptickDenom = JSON.parse(data.toString());
		
		let denoms = null;
			denoms = uptickDenom.owner.id_collections
			let listNewDemonToken=[]
			for (const denom of denoms) {
		
				for (const token of denom.token_ids) {
					var newDemonToken=denom.denom_id+","+token;
					 listNewDemonToken.push(newDemonToken)
					if(listOldDemonToken.includes(newDemonToken)){
						console.log("已存在"+newDemonToken);
						continue
					}
					let createNftDto = new CreateNftDto()
					createNftDto.chainType = "uptick_7000-1"
					createNftDto.owner = owner
					createNftDto.nftAddress = denom.denom_id
					createNftDto.nftId = token
					var curltoken = 'curl http://52.74.190.214:1317/uptick/collection/nfts/' + denom.denom_id + '/' + token
		
					var tokens = child_process.exec(curltoken, function(err0, stdout, tokenerr) {
		
						return stdout
					});
					tokens.stdout.on('data', function(data0) {
						// console.log(data0)
						let uptickToken = JSON.parse(data0.toString());
						createNftDto.name = uptickToken.nft.name
						createNftDto.metadataUrl = uptickToken.nft.uri
						if (createNftDto.metadataUrl.startsWith("https://ipfs.upticknft.com/ipfs/")) {
							var metadata = child_process.exec("curl " + uptickToken.nft.uri, function(err0, metaJson, tokenerr) {
								return metaJson
							});
							metadata.stdout.on('data', function(data1) {
								let metaJson = JSON.parse(data1.toString());
								createNftDto.name = metaJson.name
								createNftDto.imgUrl = metaJson.image
								createNftDto.description = metaJson.description
								createNftDto.creator = metaJson.minter
		
								service.create(createNftDto)
								console.log(createNftDto)
							});
		
						} else {
							service.create(createNftDto)
							
						}
		
					})
				}
		
			}
			
			// 比较新旧的list 去掉多余的
			for(let i=0;i<listOldDemonToken.length;i++){
				let removeinfo=listOldDemonToken[i];
				if(!listNewDemonToken.includes(removeinfo)){
					// 旧的token 不在新的token 内,就删除
					let removeinfos=removeinfo.split(",")
					let nftRemove=new Nft()
					nftRemove.owner=owner;
					nftRemove.nftAddress=removeinfos[0]
					nftRemove.nftId=removeinfos[1]
					service.removeNft(nftRemove)
					
				}
			}
		
		});
		
		
		return "更新update数据1"
	}

	async updateIrisData(listOldDemonToken:Array<string>,owner:string){
	
	let client: any;
	let irisParam = {
		node: "http://34.80.93.133:26657/",
		chainID: "gon-irishub-1",
		gas: "5138174",
		amount: "100000",
		denom: "uiris"
	
	}

	
	client = await IrisBase.getClient(
	
		irisParam.node,
		irisParam.chainID,
		irisParam.gas,
		irisParam.denom,
		irisParam.amount
	
	);
var child_process = require("child_process");
		var service = this.nftService;
		
	let denoms=null;
  client.nft.queryOwner(owner)
		 .then(function(res){ 
		  console.log(JSON.stringify(res))
		  if(res!=null&&res.owner.idCollectionsList!=null&&res.owner.idCollectionsList.length>0){
			   denoms=res.owner.idCollectionsList;
			owner=res.owner.address;
			let listNewDemonToken=[]
			for(const denom of denoms){
			
			 for(const token of denom.tokenIdsList){
				 var newDemonToken=denom.denomId+","+token;
				 listNewDemonToken.push(newDemonToken)
				 if(listOldDemonToken.includes(newDemonToken)){
				 	console.log("已存在"+newDemonToken);
				 	continue
				 }
				 
				 let createNftDto=new CreateNftDto()
				 createNftDto.chainType='gon-irishub-1'
				 createNftDto.owner=owner
				 createNftDto.nftAddress=denom.denomId 
			 	createNftDto.nftId=token
			 	client.nft.queryNFT(denom.denomId,token)
			 	.then(function(restoken){
					console.log(denom.denomId)
					console.log(restoken)
			 		createNftDto.name=restoken.nft.name
			 		createNftDto.metadataUrl=restoken.nft.uri
					
					if (createNftDto.metadataUrl.startsWith("https://ipfs.upticknft.com/ipfs/")) {
						var metadata = child_process.exec("curl " + restoken.nft.uri, function(err0, metaJson, tokenerr) {
							
							return metaJson
						});
						metadata.stdout.on('data', function(data1) {
							console.log("metasssssssss")
							console.log(data1)
							let metaJson = JSON.parse(data1.toString());
							createNftDto.name = metaJson.name
							createNftDto.imgUrl = metaJson.image
							createNftDto.description = metaJson.description
							createNftDto.creator = metaJson.minter
							
							service.create(createNftDto)
							// console.log(createNftDto)
						});
							
					}else{
						service.create(createNftDto)
					}
					
			 		
			 		return createNftDto
			 	})
				
			
			
			
			 }
			 // createNftDtoList.push(createNftDto)
			 
			
			}
			
			// 比较新旧的list 去掉多余的
			for(let i=0;i<listOldDemonToken.length;i++){
				let removeinfo=listOldDemonToken[i];
				console.log("removeinfo=== "+removeinfo)
				if(!listNewDemonToken.includes(removeinfo)){
					console.log("remove99999999== ")
					// 旧的token 不在新的token 内,就删除
					let removeinfos=removeinfo.split(",")
					
					let nftRemove=new Nft()
					nftRemove.owner=owner;
					nftRemove.nftAddress=removeinfos[0]
					nftRemove.nftId=removeinfos[1]
					service.removeNft(nftRemove)
					
				}
			}
		  }


		 })
		 .catch(error => {
		   console.log(error);
		 });

	

	
}
	// 跨链后调用接口
	@Post('cross')
	async cross(@Body() updateNftDto: UpdateNftDto) {
		
		let nft = new Nft()
		let list = []
		let findNftDto = new FindNftDto();
		findNftDto.nftAddress = updateNftDto.nftAddress
		findNftDto.nftId = updateNftDto.nftId
		list = await this.nftService.findOneByaddress(findNftDto);
		if (list && list.length > 0) {
			nft = list[0]
			await this.nftService.update(nft.id, updateNftDto);
			list = await this.nftService.findOneByaddress(findNftDto);
			if (list && list.length > 0) {
				nft = list[0]
			}
		}

		let code = 1;

		if (nft && nft.id > 0) {
			code = 0
		}
		let jsonResult = {
			"code": code,
			"obj": nft
		}
		return jsonResult

	}
	@Post()
	async create(@Body() createNftDto: CreateNftDto) {

		let list = await this.nftService.createArray(createNftDto);
		let jsonResult = {
			"code": 1,
			"list": list
		}
		if (list && list.length > 0) {
			jsonResult.code = 0
		}

		return jsonResult
	}



	@Post('nftInfo')
	async nftInfo(@Body() findNftDto: FindNftDto) {
		let obj = null;
		let list = await this.nftService.findOneByaddress(findNftDto);
		if (list && list.length > 0) {
			obj = list[0]
		}
		let jsonResult = {
			"code": 0,
			"obj": obj
		}
		return jsonResult
	}
	@Post('searchPage')
	async searchPage(@Query("type") type: number, @Body() findNftDto: FindNftDto) {
		let list = null
		if (type == 0) {
			list = await this.nftService.findOneByaddress(findNftDto);
		} else if (type == 1) {
			findNftDto.creator = findNftDto.owner
			list = await this.nftService.findOneByaddress(findNftDto);
		} else if (type == 2) {
			list = await this.nftService.findByParam(findNftDto);
		}

		let jsonResult = {
			"code": 0,
			"list": list
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
