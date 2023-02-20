import React from "react";
import Axios from 'axios';
import { ListGroup, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";

class DeleteRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            recipe: "",
            ingredients: "",
            price: 0,
            image: null,
            currUser: "",
            currUserRole: "",
            loginStatus: false,
            redirect: true
        };

    }

    logout = () => {
        Axios.get("http://localhost:3001/logout")
    }
    componentDidMount() {
        swal("Sukces!", "Pomyślnie usunięto przepis!", "success")
        var currentURL = window.location.href;
        console.log(currentURL)
        var currentID = currentURL.split("?id=")[1]
        console.log(currentID)

        Axios.post("http://localhost:3001/deleteRecipe", { id: currentID }).then((response) => {
            console.log(response)
            
        })

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

    displayInfo = () => {
        console.log("INFORMACJE: " + this.state.name + this.state.recipe + this.state.ingredients + this.state.price)
    }

    render() {
        const {redirect} = this.state;

        if(redirect){
            return <Navigate to='/getRecipeList'/>;
        }
        return (
            <div className="App">
             
                <div className="information">
                  
                </div>
                
            </div>
        );
    }


}

export default DeleteRecipe;