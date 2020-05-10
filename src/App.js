import React, {useEffect, useState} from 'react';
import SimplyBar from './components/simplyBar'
import {Button,Typography,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Web3 from 'web3';
import ConnectMetamask from "./components/connectMetamask";
import IstanceDaiContract from "./components/istanceDaiContract";
import LoanSetup from "./components/loanSetup";
import IstanceLendingPoll from "./components/istanceLendingPoolContract";
import IstanceLendingPoolCoreContract from "./components/istanceLendingPoolCore";

const useStyles = makeStyles((theme) => ({
    root: {
            margin: theme.spacing(3),
            width: '30ch',
            display: 'block'
        }
}));

const App = () => {
    const classes = useStyles();
    const [LendingPoolContract, setLendingPoolContract,getLendingPool] =IstanceLendingPoll();
    const [DaiContract,setDaiContract,getDaiContract] = IstanceDaiContract();
    const [LendingPoolCoreContract,setLendingPoolCoreContract,getLendingPoolCoreContract] = IstanceLendingPoolCoreContract();
    const [Saldo,setSaldo] = useState();
    const [account,setAccount,autorizeApp] = ConnectMetamask();
    const [AccountLogged,setAccLogged] = useState();
    const addrDAI = "0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108"; //ropsten address...
    const web3 = new Web3(window.web3.currentProvider);

    useEffect(() =>{
        const getAccount = async ()=>{
            let accObj = await web3.eth.getAccounts();
            setAccLogged(accObj[0]);
        }
        getAccount();
        getLendingPool();
        getDaiContract();
        getLendingPoolCoreContract()
    },[])


    const getBalance = async ()=>{
        let saldoEth =  web3.utils.fromWei(await web3.eth.getBalance(AccountLogged),'ether');
        setSaldo(saldoEth);
    }

    const depositOnLendingPool = async (importo) =>{
        let importoNum = web3.utils.toWei(importo,"ether");
        let addrMockETH = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
        await LendingPoolContract.methods.deposit(addrMockETH,importoNum,"0")
            .send({from:AccountLogged,value:importoNum}).catch((e)=>console.log(e));
    }
    const makeBorrowOnLendingPool = async (importo) =>{
        let tassoInteresse = 2; // 2 = tasso variabile || 1 = tasso fisso
        let amountPrestito = web3.utils.toWei(importo,"ether");
        await LendingPoolContract.methods.borrow(addrDAI,amountPrestito,tassoInteresse,"0")
            .send({from:AccountLogged}).catch((e)=>console.log(e));

    }
    const setRepayOnLendingPool = async (importo) =>{
        let importoDaRestituire = web3.utils.toWei(importo,"ether");
        await LendingPoolContract.methods.repay(addrDAI,importoDaRestituire,AccountLogged)
            .send({from:AccountLogged}).catch((e)=>console.log(e));
    }


    const makeApprove = async (importo) =>{
        let amountDaApprovare = web3.utils.toWei(importo,"ether");
        await DaiContract.methods.approve(LendingPoolCoreContract,amountDaApprovare)
            .send({from:AccountLogged}).catch((e)=>console.log(e));
    }

    return (
    <div>
        <SimplyBar/>
        <Typography align="center" variant="h5" style={{marginTop:20}}>Benvenuto nella Loans Dapp test di DeaBit!</Typography>
        <form className={classes.root} noValidate autoComplete="off" >

                <Button variant="contained" color="secondary" onClick={getBalance}>Verifica il tuo saldo</Button>
            <br/>
                <TextField id="outlined-basic" label={Saldo} variant="outlined" disabled={true} style={{width:205}} />

        </form >
        <LoanSetup depositOnLendingPool={depositOnLendingPool}
                   makeBorrowOnLendingPool={makeBorrowOnLendingPool}
                   makeRepayOnLendingPool={setRepayOnLendingPool}
                   makeApprove={makeApprove} />

    </div>
  );
}

export default App;
