// import {
//     SigningStargateClient,
//     coins
// } from '@uptsmart/stargate'
// //import { SigningStargateClient } from '@/uptick/cosmjs/packages/stargate';
// import {
//     CosmWasmClient
// } from "@cosmjs/cosmwasm-stargate";

// import { getRanHex } from "@/utils/helper";

// import Web3 from 'web3'
// const web3Obj = new Web3();

// const md5 = require('md5');
// const chainId = "uptick_117-1";
// const url = "https://rpc.uptick.network";
// const rest = "https://rest.uptick.network"



// export async function queryTokenFromUptick() {
//     let accountInfo = await getAccountInfo()
//     console.log("wxl ---  accountInfo", accountInfo)
//     if (accountInfo) {
//         let client = await signingStargateClient();
//         let allBal = await client.getAllBalances(accountInfo.bech32Address);
//         console.log("xxl allBal : ", allBal);
//         return allBal;
//     } else {
//         return ''
//     }
// }

// export async function getMyBalance(address) {
//     let client = await wasmClient();
//     let balance = await client.getBalance(address, "auptick");

//     let amt = web3Obj.utils.fromWei(balance["amount"], "ether");
//     balance["format"] = parseFloat(amt).toFixed(2);
//     let mount = balance.format;

//     localStorage.setItem("key_balance", mount);
//     return balance;
// }
// async function wasmClient() {
//     let client = await CosmWasmClient.connect(url);
//     return client;
// }
