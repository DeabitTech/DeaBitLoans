import lendAddrProvider from "../lendAddressProvider";
import lendingPool from "../lendingPool";
import Web3 from "web3";
import {useState} from 'react'
let web3 = new Web3(window.web3.currentProvider);


export const IstanceLendingPoll =  ()=>{
    const [LendingPoolContract, setLendingPoolContract] = useState();
    const getLendingPool = async () =>{

        const addrProvider = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728"; //ropsten address...
        const ProviderContract = new web3.eth.Contract(lendAddrProvider,addrProvider);
        const addrLendingPool = await ProviderContract.methods.getLendingPool().call().catch((e)=>console.log(`error ${e}`));
        setLendingPoolContract( new web3.eth.Contract(lendingPool,addrLendingPool));
    }
    return [LendingPoolContract,setLendingPoolContract,getLendingPool]
}

export default IstanceLendingPoll;

