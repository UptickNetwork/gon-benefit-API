// import * as uptick from '@uptsmart/stargate';
import * as uptick from '@uptsmart/proto-types';
/** Iris KeyDAO */
export class UptickKeyDAO implements uptick.KeyDAO {

  keyMap: { [key: string]: uptick.types.Wallet } = {};
  
  write(name: string, key: uptick.types.Wallet) {
    this.keyMap[name] = key;
  }
  
  read(name: string): uptick.types.Wallet {
    return this.keyMap[name];
  }

  delete(name: string) {
    delete this.keyMap[name];
  }

}

export class UptickBase {

  static Types = uptick.types;
  static baseTx: uptick.types.BaseTx = {
    from: "",
    password: "",
    mode: uptick.types.BroadcastMode.Commit,
  };

  // static getClient(): Client {
  static getClient(node:string,chainId:string,gas:string,demon:string,amount:string){

    //节点配置参数
    let config = {
      node:     node,
      network: uptick.types.Network.Testnet,
      chainId: chainId,
      gas: gas,
      fee: { denom: demon, amount: amount },
    };

    //创建客户端对象
    const client = uptick
      .newClient(config)
      .withKeyDAO(new UptickKeyDAO())
      .withRpcConfig({ timeout: 10000 });
      return client;

  }


}
