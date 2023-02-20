import React from "react";
import Axios from 'axios';

import { Button } from 'react-bootstrap';
import swal from 'sweetalert'

import { Navigate } from "react-router-dom";

class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",

            usernameLogin: "",
            passwordLogin: "",

            currUser: "",
            currUserRole: "",
            loginStatus: false,
            redirect: false
        };
    }

    componentDidMount() {
        Axios.defaults.withCredentials = true;
        Axios.get("http://localhost:3001/login").then((response) => {

            if (response.data.loggedIn === true) {
                this.setState({ loginStatus: true })
                this.setState({ currUser: response.data.user[0].username })
                this.setState({ currUserRole: response.data.user[0].role })
            }
        })

        Axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
        })
    }

    register = () => {
        Axios.post('http://localhost:3001/register', { username: this.state.username, password: this.state.password }).then((response) => {
            console.log(response)
            this.setState({redirect: true});
            swal("Sukces!", "Rejestracja zakończona powodzeniem", "success" );
        })
    }

    login = () => {
        Axios.post("http://localhost:3001/login", { usernameLogin: this.state.usernameLogin, passwordLogin: this.state.passwordLogin }).then((response) => {
            if (!response.data.auth) {
                console.log(response.data.message)
                swal("Ups...!", response.data.message, "error");
                this.setState({ loggedIn: false })

            } else {
                console.log(response.data);
                localStorage.setItem("token", response.data.token)
                this.setState({ loggedIn: true })
                this.setState({redirect: true});
            }

        })
        
    }
    logout = () => {
        Axios.get("http://localhost:3001/logout")
    }
    userAuthenticated = () => {
        Axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
        })
    }
    render() {
        const {redirect} = this.state;

        if(redirect){
            return <Navigate to='/'/>;
        }
        return (
            <div className="App">
                {this.state.loginStatus && (
                    <div className="information2">
                        <p>Zalogowany jako, {this.state.currUser}</p>
                    </div>
                )}

                <br></br> <br></br>
                
                <div className="information">
                    <div className="login">
                        <br></br>
                        <h1> Login </h1>
                        <label > Nazwa użytkownika</label>
                        <input name="loginname" type="text"
                            onChange={(event) => {
                                this.setState({ usernameLogin: event.target.value });
                            }}
                        />
                        <br></br>
                        <label> Hasło </label>
                        <br></br>
                        <input type="password"
                            onChange={(event) => {
                                this.setState({ passwordLogin: event.target.value });
                            }}
                        />
                        <br></br> <br></br>
                        <Button variant="secondary" onClick={this.login.bind(this)}> Zaloguj się </Button>
                        <br></br><br></br>
                        <p>Nie masz konta? Zarejestruj się poniżej!</p>
                    </div>
                </div>
                <br></br> <br></br> <br></br> <br></br>
                <div className="information">
                    <div className="registration">
                        <br></br>
                        <h1> Rejestracja </h1>
                        <label> Nazwa użytkownika</label>
                        <input type="text" placeholder="Nazwa użytkownika..."
                            onChange={(event) => {
                                this.setState({ username: event.target.value });
                            }}
                        />
                        <br></br>
                        <label> Hasło </label>
                        <br></br>
                        <input type="password" placeholder="Hasło..."
                            onChange={(event) => {
                                this.setState({ password: event.target.value });
                            }}
                        />
                        <br></br><br></br>
                        <Button variant="secondary" onClick={this.register.bind(this)}> Zarejestruj się </Button>
                        <br></br><br></br>
                    </div>
                </div>
                <br>
                </br>

                <br></br>
            </div>
        );
    }
}

export default Login;