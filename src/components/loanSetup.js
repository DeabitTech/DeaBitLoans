import React,{useState} from 'react';
import { makeStyles,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,Typography,Box,TextField,Button } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";



const useStyles = makeStyles((theme) => ({
    root: {
        width: '60%',
        marginLeft: '5%'

    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        margin: theme.spacing(1),
    }
}));













 const LoanSetup = (props) => {
    const classes = useStyles();
    const [disable,setDisable] = useState(true);
     const [importoDeposito,setImportoDeposito] = useState(0);
     const [importoBorrow,setImportoBorrow] = useState(0);
     const [importoRepay,setImportoRepay] = useState(0);

     const valueInputDeposit =(event) =>{

        event.target.value === null? setImportoDeposito("0.0"): setImportoDeposito(event.target.value);
     }

     const valueInputBorrow =(event) =>{

         event.target.value === null? setImportoBorrow("0.0"): setImportoBorrow(event.target.value);
     }
     const valueInputRepay =(event) =>{

         event.target.value === null? setImportoRepay("0.0"): setImportoRepay(event.target.value);
     }

    const deposit = () =>{
        props.depositOnLendingPool(importoDeposito);
        setDisable(false);
    }

    const makeBorrow = () =>{
        props.makeBorrowOnLendingPool(importoBorrow);
    }

    const makeRepayloan = () =>{
        props.makeRepayOnLendingPool(importoRepay);
    }
    const makeApprove = () =>{
        props.makeApprove(importoRepay);
        setDisable(false);
    }

    return (
        <Box className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Vuoi depositare per un prestito?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography variant="h6" color="textSecondary"> Inserisci l'importo che vuoi depositare a copertura del prestito</Typography>
                    </div>
                    
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                        <TextField onChange={valueInputDeposit} required id="standard-required" placeholder="Importo"  color="primary"/>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={ <CloudUploadIcon/>}
                        onClick={deposit}
                    >
                        Invia
                    </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"

                >
                    <Typography className={classes.heading} >Vuoi richiedere un prestito?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography variant="h6" color="textSecondary"> Inserisci l'importo che vuoi richiedere</Typography>
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <TextField onChange={valueInputBorrow} required id="standard-required1" placeholder="Importo"  color="primary"/>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={ <CloudUploadIcon/>}
                        onClick={makeBorrow}
                    >
                        Invia
                    </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    disabled={false}
                >
                    <Typography className={classes.heading} >Vuoi ripagare un prestito?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography variant="h6" color="textSecondary"> Inserisci l'importo che vuoi ripagare ed esegui la richiesta di approvazione, successivamente premi il tasto Invia</Typography>
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <TextField onChange={valueInputRepay} required id="standard-required2" placeholder="Importo"  color="primary"/>
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={ <CloudUploadIcon/>}
                    onClick={makeRepayloan}
                    disabled={disable}
                >
                    Invia
                </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={ <CloudUploadIcon/>}
                        onClick={makeApprove}
                    >
                        Invia richiesta di approvazione
                    </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </Box>
    );
}

export default LoanSetup;