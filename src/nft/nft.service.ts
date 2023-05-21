import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nft } from './entities/nft.entity';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { FindNftDto } from './dto/find-nft.dto';

@Injectable()
export class NftService {
	constructor(
		@InjectRepository(Nft) private nftRepository: Repository<Nft>
	) { }

	async create(createNftDto: CreateNftDto) {

		createNftDto.createTime = createNftDto.updateTime = new Date();
		return await this.nftRepository.save(createNftDto);
	}
	async createArray(createNftDto: CreateNftDto) {
		
			let nftID =createNftDto.nftId
			let list=[];
			let nftIDS=nftID.split(",");
			createNftDto.createTime = createNftDto.updateTime = new Date();
			for (let n = 0; n < nftIDS.length; n++) {
				let obj=new CreateNftDto();
				 obj.chainType=createNftDto.chainType;
				 obj.nftAddress=createNftDto.nftAddress;
				 obj.nftId=nftIDS[n];
				 obj.owner=createNftDto.owner;
				 obj.creator=createNftDto.creator;
				 obj.createTime=createNftDto.createTime;
				 obj.updateTime=createNftDto.updateTime;
				 obj.name=createNftDto.name;
				 obj.description=createNftDto.description;
				 obj.imgUrl=createNftDto.imgUrl;
				 obj.metadataUrl=createNftDto.metadataUrl;
				 obj.hash=createNftDto.hash;
			
				
				list.push(obj)
				 
			}
		let result=await this.nftRepository.save(list)


		return result;
	}
	  
	async findAll() {
		return await this.nftRepository.find();
	}

	async findOne(id: number) {
		return await this.nftRepository.findByIds([id]);
	}

	async findOneByaddress(findNftDto: FindNftDto) {

		return await this.nftRepository.find(findNftDto);
	}

	async findByParam(findNftDto: FindNftDto) {

		return await this.nftRepository.query("select * from nft where chainType=? and owner=? and creator!=? order by id desc", [findNftDto.chainType, findNftDto.owner, findNftDto.owner]);
	}



	async update(id: number, updateNftDto: UpdateNftDto) {
		updateNftDto.updateTime = new Date();
		return await this.nftRepository.update(id, updateNftDto);
	}

	async remove(id: number) {
		return await this.nftRepository.delete(id);
	}
}
