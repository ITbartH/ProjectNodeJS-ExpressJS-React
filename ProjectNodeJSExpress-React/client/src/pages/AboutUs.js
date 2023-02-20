import React from "react";
import Axios from 'axios';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currUser: "",
            currUserRole: "",
            loginStatus: false
        };

    }
    logout = () => {
        Axios.get("http://localhost:3001/logout")
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
    render() {

        return (
            <div className="App">
                {this.state.loginStatus && (
                    <div className="information2">
                        <Button href="/register" onClick={this.logout.bind(this)} variant="dark"><p>Zalogowany jako, {this.state.currUser}</p></Button>
                    </div>
                )}
                <br></br><br></br>
                <h1> O nas </h1>
                <br></br><br></br>
                <div className="aboutusMain">

                    <div className="about-section">
                        <h1>Poznaj nasz zespół</h1>
                        <hr></hr><br></br>
                        <p>Nasz zespół złożony jest z samych najlepszych kucharzy z całego świata.</p>
                        <p>Nie czekaj, tylko spróbuj tych przepysznych przepisów a życie stanie się piękniejsze!</p>
                    </div>
                    <br></br>

                    <h2>Nasi kucharze</h2>
                    <br></br>
                    <div className="xd">
                        <div className="column">
                            <Card style={{ width: '18rem', margin: 'auto'}}>
                                <Card.Img variant="top" src="/img/gordon.jpg" />
                                <Card.Body>
                                    <Card.Title>Gordon Ramsay</Card.Title>
                                    <Card.Text>
                                        Ramsay to najbardziej rozpoznawalny kucharz/restaurator na świecie.
                                    </Card.Text>
                                    <Button variant="primary">Dalej</Button>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="column">
                            <Card style={{ width: '18rem', margin: 'auto'}}>
                                <Card.Img variant="top" src="/img/james.jpg" />
                                <Card.Body>
                                    <Card.Title>Jamie Oliver</Card.Title>
                                    <Card.Text>
                                        W swoich programach skupia się przede wszystkim na tym, że można jeść zdrowo.
                                    </Card.Text>
                                    <Button variant="primary">Dalej</Button>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="column">
                            <Card style={{ width: '18rem', margin: 'auto'}}>
                                <Card.Img variant="top" src="/img/anthony.jpg" />
                                <Card.Body>
                                    <Card.Title>Anthony Bourdain</Card.Title>
                                    <Card.Text>
                                        Obecnie Anthony jeździ po świecie, a tubylcy oprowadzają go po swojskich miejscach.
                                    </Card.Text>
                                    <Button variant="primary">Dalej</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <br></br><hr></hr>
                </div>
                <br></br><br></br>
            </div>
        );
    }
}

export default AboutUs;