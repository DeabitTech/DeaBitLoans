import {useState} from 'react'
import Web3 from "web3";

export const ConnectMetamask = () => {
    const [account,setAccount] = useState()
    const web3 = new Web3(window.web3.currentProvider);

    let AccString;
    const autorizeApp = async () =>{
        if (window.ethereum) {
            window.ethereum.autoRefreshOnNetworkChange = false;
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                let AccObj = await web3.eth.getAccounts();
                AccString = AccObj[0];
                setAccount(AccString);

            } catch (error) {console.log(`errore con il caricamento dell'istanza web3: ${error}`)}
        }
        // Legacy dapp browsers...
        else if (window.web3) {window.web3 = new Web3(web3.currentProvider);}
        // Non-dapp browsers...
        else {console.log('provider non trovato, scarica metamsk!');}
        return AccString;
    }

    return [account,setAccount,autorizeApp];
};

export default ConnectMetamask;