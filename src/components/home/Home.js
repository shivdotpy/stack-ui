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
import Grow from '@material-ui/core/Grow';
import Chip from '@material-ui/core/Chip'

import Snackbar from '@material-ui/core/Snackbar';

// Icons
import MenuIcon from '@material-ui/icons/Menu';

// AXIOS
import axios from 'axios';
import Card from '@material-ui/core/Card'
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leftDrawer: false,
            loginModal: false,
            signupModal: false,
            login: {
                email: 'shiv@gmail.com',
                password: 'Hello@123'
            },
            message: '',
            snackbar: false,
            user: {
                token: '',
                name: ''
            },
            questions: []

        };
    }

    componentWillMount() {
        this.getAccessToken();
        this.getQuestions();
    }


    getAccessToken = () => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        if (token) {
            let userObj = {...this.state.user};
            userObj.token = token;
            userObj.name = name;
            this.setState({user: userObj})
        }
    };

    toggleDrawer = (open) => () => {
        this.setState({
            leftDrawer: open
        });
    };

    toggleLoginModal = (open) => () => {
        this.setState({
            loginModal: open
        });
        // this.setState({
        //     login: {
        //         email: '',
        //         password: ''
        //     }
        // })
    };

    toggleSignupModal = (open) => () => {
        this.setState({
            signupModal: open
        })
    };

    changeLogin = (event) => {
        const loginObj = {...this.state.login};
        loginObj[[event.target.name]] = event.target.value;
        this.setState({login: loginObj})
    };

    submitLogin = () => {

        const body = {
            email: this.state.login.email,
            password: this.state.login.password
        };

        axios.post('http://localhost:3000/api/user/login', body)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.name);

                this.getAccessToken();

                this.setState({message: response.data.message}, () => {
                    this.setState({
                        snackbar: true, login: {
                            email: '',
                            password: ''
                        }, loginModal: false
                    });
                    setTimeout(() => {
                        this.setState({snackbar: false});
                    }, 2000)
                })
            })
            .catch((error) => {
                this.setState({message: error.response.data.message}, () => {
                    this.setState({snackbar: true});
                    setTimeout(() => {
                        this.setState({snackbar: false});
                    }, 2000)
                })
            })
    };

    getQuestions = () => {
        axios.get('http://localhost:3000/api/question/1')
            .then(response => {
                console.log(response.data)

                let questionsObj = [...this.state.questions];
                const mergedQuestions = questionsObj.concat(response.data.data);

                this.setState({questions: mergedQuestions})

            })
            .catch(error => {
                console.log(error.response)
            })
    };

    // SLICING
    sliceTitle = (str) => {
        return str.slice(0, 50)
    };

    sliceDescription = (str) => {
        return str.slice(0,350)
    }

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
                        {
                            this.state.user.token ?
                                <Button color="inherit">{this.state.user.name}</Button>
                                :
                                <div>
                                    <Button color="inherit" onClick={this.toggleLoginModal(true)}>Login</Button>
                                    <Button color="inherit" onClick={this.toggleSignupModal(true)}>Signup</Button>
                                </div>
                        }

                    </Toolbar>
                </AppBar>

                <Grid container>
                    {this.state.questions.map((question, index) => {
                        return <Grow
                            in={true}
                            style={{transformOrigin: '0 0 0'}}
                            {...(true ? {timeout: 3000} : {})}
                         key={index}>

                            <Grid item xs={12} sm={6} md={4} lg={3} style={{padding: '10px'}}>
                                <Card style={{height: '100%'}}>
                                    <CardContent>
                                        <Typography component="h2">
                                            <strong>{this.sliceTitle(question.title)} ...</strong>
                                        </Typography>
                                        <Typography component="p">
                                            {this.sliceDescription(question.description)} ...
                                        </Typography>
                                        {
                                            question.tags.map((tag => {
                                                return  <Chip
                                                    label={tag.name}
                                                    onClick={() => {}}
                                                    color="secondary"
                                                    style={{fontSize: '10px', padding: 0}}
                                                />
                                            }))
                                        }

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grow>
                    })}
                </Grid>


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
                                    name="email"
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
                                    name="password"
                                    fullWidth
                                    onChange={this.changeLogin}
                                    value={this.state.login.password}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.submitLogin} color="primary">
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

                {/*SNACKBAR*/}
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={this.state.snackbar}
                    variant="warning"
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                />

            </div>

        )
    }
}
