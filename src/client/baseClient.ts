import * as iris from '@irisnet/irishub-sdk';
/** Iris KeyDAO */
export class IrisKeyDAO implements iris.KeyDAO {

  keyMap: { [key: string]: iris.types.Wallet } = {};
  
  write(name: string, key: iris.types.Wallet) {
    this.keyMap[name] = key;
  }
  
  read(name: string): iris.types.Wallet {
    return this.keyMap[name];
  }

  delete(name: string) {
    delete this.keyMap[name];
  }

}

export class IrisBase {

  static Types = iris.types;
  static baseTx: iris.types.BaseTx = {
    from: "",
    password: "",
    mode: iris.types.BroadcastMode.Commit,
  };

  // static getClient(): Client {
  static getClient(node:string,chainId:string,gas:string,demon:string,amount:string){

    //节点配置参数
    let config = {
      node:     node,
      network: iris.types.Network.Testnet,
      chainId: chainId,
      gas: gas,
      fee: { denom: demon, amount: amount },
    };

    //创建客户端对象
    const client = iris
      .newClient(config)
      .withKeyDAO(new IrisKeyDAO())
      .withRpcConfig({ timeout: 10000 });
      return client;

  }


}
