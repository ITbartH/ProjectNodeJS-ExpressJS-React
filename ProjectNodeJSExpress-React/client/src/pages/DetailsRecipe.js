import React from "react";
import Axios from 'axios';
import { ListGroup, Button } from "react-bootstrap";

class DetailsRecipe extends React.Component {
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
            loginStatus: false
            
        };

    }


    logout = () => {
        Axios.get("http://localhost:3001/logout")
    }
    componentDidMount() {
        var currentURL = window.location.href;
        console.log(currentURL)
        var currentID = currentURL.split("?id=")[1]
        console.log(currentID)
        Axios.defaults.withCredentials = true;
        Axios.post("http://localhost:3001/getRecipe", { id: currentID }).then((response) => {
            console.log(response.data)
            var dane = response.data;
            this.setState({ id: dane[0].id })
            this.setState({ name: dane[0].recipe_name })
            this.setState({ recipe: dane[0].recipe_recipe })
            this.setState({ ingredients: dane[0].recipe_ingredients })
            this.setState({ price: dane[0].recipe_price })
            this.setState({ image: dane[0].recipe_image })

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
        console.log("INFORMACJE: " + this.state.id + this.state.name + this.state.recipe + this.state.ingredients + this.state.price)

        return (
            <div className="App">
               {this.state.loginStatus && (
                    <div className="information2">
                        <Button href="/register" onClick={this.logout.bind(this)} variant="dark"><p>Zalogowany jako, {this.state.currUser}</p></Button>
                    </div>
                )}
                <br></br> <br></br>
                <div className="information">
                    <br></br>
                    <img id="imageDetails" alt="img" src={`data:image/jpeg;base64,${this.state.image}`}></img>
                    <br></br>
                    <label id="priceText">Nazwa potrawy:</label>
                    <p>{this.state.name}</p>

                    <div class="break"></div>
                    <br></br>
                    <label id="priceText">Pełny przepis:</label>
                    <p className="recipeText">{this.state.recipe}</p>
                    <div class="break"></div>
                    <br></br>
                    <label id="priceText">Składniki:</label>
                    <ListGroup>
                    {this.state.ingredients.split(",").map((ing, j) => {
                            return (
                                <ListGroup.Item key={j}>{ing}</ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                    <br></br>
                    <div class="break"></div>
                    <br></br>
                    <label id="priceText">Koszt(zł):</label>
                    <p>{this.state.price}</p>
                    <br></br>
                </div>
                <br></br>
            </div>
        );
    }


}

export default DetailsRecipe;