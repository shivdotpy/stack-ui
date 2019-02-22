import React, {Component} from 'react'

// Material Items
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';

// Icons
import MenuIcon from '@material-ui/icons/Menu';


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leftDrawer: false,
            loginModal: false,
            signupModal: false,
            login: {
                email: '',
                password: ''
            }
        }
    }


    toggleDrawer = (open) => () => {
        this.setState({
            leftDrawer: open
        });
    };

    toggleLoginModal = (open) => () => {
        this.setState({
            loginModal: open
        })
    };

    toggleSignupModal = (open) => () => {
        this.setState({
            signupModal: open
        })
    };

    changeLogin = () => {

    };

    submitLogin = () => {

    };

    render() {
        return (
            <div>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu"
                                    onClick={this.toggleDrawer(!this.state.leftDrawer)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={{flexGrow: 1}} align={'center'}>
                            <span> <i className="fas fa-chess-queen"> </i> Overflow </span>
                        </Typography>
                        <Button color="inherit" onClick={this.toggleLoginModal(true)}>Login</Button>
                        <Button color="inherit" onClick={this.toggleSignupModal(true)}>Signup</Button>
                    </Toolbar>
                </AppBar>

                {/* DRAWER */}
                <Drawer open={this.state.leftDrawer} onClose={this.toggleDrawer(!this.state.leftDrawer)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                    </div>
                </Drawer>

                {/* LOGIN MODAL */}
                <Dialog
                    open={this.state.loginModal}
                    onClose={this.toggleLoginModal(!this.state.loginModal)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login User</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    onChange={this.changeLogin}
                                    value={this.state.login.email}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="dense"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    onChange={this.changeLogin}
                                    value={this.state.login.password}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary">
                            Login
                        </Button>
                        <Button variant="contained" onClick={() => {
                            this.setState({loginModal: false})
                        }} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* SIGNUP MODAL */}
                <Dialog
                    open={this.state.signupModal}
                    onClose={this.toggleSignupModal(!this.state.signupModal)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Signup User</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Your Name"
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="dense"
                                    label="Mobile"
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="dense"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="dense"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary">
                            Signup
                        </Button>
                        <Button variant="contained" onClick={() => {
                            this.setState({signupModal: false})
                        }} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        )
    }
}
