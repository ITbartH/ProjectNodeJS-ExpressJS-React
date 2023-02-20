import React from "react";
import Axios from 'axios';
import {Button } from 'react-bootstrap';

class indexMain extends React.Component {
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
                <h1> Strona główna </h1>
                <br></br><br></br>
                <div className="informationMain">
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat mi sit amet quam hendrerit, id
                            malesuada nunc molestie. Ut lacus ante, ullamcorper in dolor non, tempus sagittis nisl. Curabitur
                            pellentesque ullamcorper mauris, et posuere ante fringilla sit amet. Vivamus feugiat enim ac risus
                            imperdiet, in rutrum mauris tincidunt. Aenean pharetra vel elit vel venenatis. Sed ut gravida leo.
                            Phasellus lobortis commodo sem vel placerat.</p>

                        <p>Donec eleifend finibus imperdiet. Ut ac arcu risus. Praesent accumsan feugiat nunc in lacinia. Proin
                            malesuada nec eros non bibendum. Donec tempor magna eros, id interdum arcu varius eu. Nullam et
                            consequat felis. Morbi nec cursus felis, eu bibendum lacus. Mauris viverra faucibus dolor nec facilisis.
                            Duis viverra nisl bibendum ante efficitur, at placerat quam mollis. Donec quis urna non leo consectetur
                            euismod eu non velit. Integer mollis augue ac nibh tempor, at vulputate ligula ornare. Aliquam quis odio
                            metus. Donec augue odio, pharetra ut lacus nec, hendrerit accumsan turpis. </p>
                            <p>Donec tempor magna eros, id interdum arcu varius eu. Nullam et
                            consequat felis. Morbi nec cursus felis, eu bibendum lacus.</p>
                    </div>
                     <div>
                        <p>Vestibulum tincidunt dolor non tellus blandit, non sollicitudin mauris iaculis. Ut dapibus ornare leo,
                            sit amet tempor nibh eleifend vel. Ut eget nisl et ante interdum ultrices. Donec at dolor eget quam
                            ullamcorper gravida vel ut mi. Etiam pulvinar eleifend felis, at feugiat diam iaculis ac. Aliquam
                            aliquet dolor eget nunc accumsan, eu auctor massa congue. Vivamus ipsum tellus, molestie id finibus
                            quis, posuere ut ex. Pellentesque sed ante vehicula, venenatis nunc ut, varius ligula.</p>

                        <p>Curabitur sollicitudin enim a magna lobortis, sit amet laoreet ante placerat. Sed id urna tincidunt,
                            aliquam nisi vel, sodales nibh. Ut molestie gravida justo vitae luctus. Donec facilisis, velit et
                            faucibus varius, risus arcu porttitor eros, vel placerat sem turpis ut dui. Cras ut orci eu risus
                            porttitor lacinia. Duis bibendum velit vitae mattis condimentum. Cras nunc felis, luctus sed finibus eu,
                            suscipit a odio. Aliquam porta augue in nisl luctus, non pharetra dui fermentum. Donec ut gravida nibh.</p>
                    </div>
                    <div>
                        <p>Sed cursus enim ut augue efficitur, ac semper urna ornare. Nulla eget est in augue rhoncus venenatis.
                            Aliquam sollicitudin nisi at erat lacinia iaculis. In bibendum ipsum nulla, ut viverra lacus venenatis
                            vel. Donec pretium nibh in nisi tincidunt condimentum. Duis orci nisl, feugiat vitae enim vel, cursus
                            finibus ipsum. Mauris non magna nec ex faucibus ultricies. Proin ac mauris et velit tristique viverra
                            interdum sed lectus. Donec bibendum mi sit amet ipsum vulputate, ut mattis libero malesuada. Praesent
                            nec eros vitae urna placerat viverra. Etiam dictum tristique turpis sit amet porta.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat mi sit amet quam hendrerit, id
                            malesuada nunc molestie. Ut lacus ante, ullamcorper in dolor non, tempus sagittis nisl. Curabitur
                            pellentesque ullamcorper mauris, et posuere ante fringilla sit amet. Vivamus feugiat enim ac risus
                            imperdiet, in rutrum mauris tincidunt.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default indexMain;