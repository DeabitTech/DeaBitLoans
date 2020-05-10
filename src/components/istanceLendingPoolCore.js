import {useState} from "react";
import lendAddrProvider from "../lendAddressProvider";
import Web3 from "web3";
let web3 = new Web3(window.web3.currentProvider);


export const IstanceLendingPoolCoreContract = () =>{
    const [LendingPoolCoreContract,setLendingPoolCoreContract] = useState();
    const getLendingPoolCoreContract = async () =>{
        const addrProvider = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728"; //ropsten address...
        const ProviderContract = new web3.eth.Contract(lendAddrProvider,addrProvider);
        const addrLendingPoolCore = await ProviderContract.methods.getLendingPoolCore().call().catch((e)=>console.log(`error ${e}`));
        setLendingPoolCoreContract(addrLendingPoolCore);
    }
    return [LendingPoolCoreContract,setLendingPoolCoreContract,getLendingPoolCoreContract]
}

export default IstanceLendingPoolCoreContract;