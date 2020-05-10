import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,Typography,IconButton,Menu,MenuItem} from '@material-ui/core/';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ConnectMetamask from "./connectMetamask";
import Tooltip from "@material-ui/core/Tooltip";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));





const SimplyBar = () => {
     const classes = useStyles();
     const [auth, setAuth] = useState(true);
     const [anchorEl, setAnchorEl] = useState(null);
     const open = Boolean(anchorEl);
     const [acc,setAcc,autorizeApp] = ConnectMetamask();
     const [accountLogged,setAccLogged] =useState()


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleConnect = async () =>{
        setAccLogged(await autorizeApp());
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <img style={{width:140}} src="https://deabit.net/wp-content/uploads/2020/03/logoDeaBit-e1585610189252.png"/>
                    <Typography variant="h6" className={classes.title}>
                        Loans Industry
                    </Typography>
                    <Typography variant="subtitle1" >
                        {accountLogged}
                    </Typography>

                    { (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Tooltip title="Connetti a Metamask" interactive>
                                <AccountCircle />
                                </Tooltip>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleConnect}
                            >
                                <MenuItem onClick={handleConnect}>Connetti a Metamask</MenuItem>

                            </Menu>

                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default SimplyBar;