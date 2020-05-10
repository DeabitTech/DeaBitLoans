import {useState} from "react";
import lendAddrProvider from "../lendAddressProvider";
import DaiToken from "../DaiABI";
import Web3 from "web3";
let web3 = new Web3(window.web3.currentProvider);

export const IstanceDaiContract = () =>{
    const [DaiContract,setDaiContract] = useState();

    const getDaiContract = async () =>{
        const addrDAI = "0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108"; //ropsten address...
        const addrProvider = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728"; //ropsten address...
        const ProviderContract = new web3.eth.Contract(lendAddrProvider,addrProvider);
        const addrLendingPoolCore = await ProviderContract.methods.getLendingPoolCore().call().catch((e)=>console.log(`error ${e}`));
        setDaiContract(new web3.eth.Contract(DaiToken, addrDAI));
    }
    return [DaiContract,setDaiContract,getDaiContract]
}

export default IstanceDaiContract;