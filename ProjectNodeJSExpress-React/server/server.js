const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() });

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "projektpsi",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "recipesystem",
});


app.get('/logout', (req, res) => {
    req.session.destroy();
})
app.post('/getRecipe', (req, res) => {
    const id = req.body.id;
    
    db.query('SELECT * FROM recipes WHERE id = ?',
    [id],
    (err,result) => {
        if (err) {
            res.send({err: err});
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send("Not found!");
        }
    });
});


app.post("/addRecipe", upload.single('recipeFile'), (req, res) => {
    const name = req.body.recipeName;
    const recipe = req.body.recipeRecipe;
    const ingredients = req.body.recipeIngredients;
    const price = req.body.recipePrice;
    const selectedFile = req.file.buffer.toString('base64')

    db.query(
        'INSERT INTO recipes (recipe_name, recipe_recipe, recipe_ingredients, recipe_price, recipe_image) VALUES (?,?,?,?,?)',
        [name, recipe, ingredients, price, selectedFile],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    );

    
})

app.post('/editRecipe', (req, res) => { 
    const name = req.body.recipeName;
    const recipe = req.body.recipeRecipe;
    const ingredients = req.body.recipeIngredients;
    const price = req.body.recipePrice;
    const id = req.body.id;
    console.log(req.body.recipeName + req.body.recipeRecipe + req.body.recipeIngredients + req.body.recipePrice + req.body.id)

    db.query(
        'UPDATE recipes SET recipe_name = ?, recipe_recipe = ?, recipe_ingredients = ?, recipe_price = ? WHERE id = ?',
        [name, recipe, ingredients, price, id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Edited")
            }
        }
    )

});

app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query('INSERT INTO users (username, password) VALUES (?,?)',
        [username, hash],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        })
    })
    
})
app.post('/deleteRecipe', (req, res) => {
    const id = req.body.id;
    db.query("DELETE FROM recipes WHERE id=?",
    [id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Recipe Deleted");
        }
    })
})

app.post('/login', (req, res) => {
    const username = req.body.usernameLogin;
    const password = req.body.passwordLogin;

    db.query('SELECT * FROM users WHERE username = ?',
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response) {
                        const id = result[0].id;
                        const token = jwt.sign({id}, "projektpsi", {
                            expiresIn: 300,
                        })

                        req.session.user = result

                        res.json({auth: true, token: token, result: result})
                    } else {
                        res.json({auth: false,  message: "Zla nazwa uzytkownika lub hasło!"})
                    }
                })
            } else {
                res.json({auth: false, message: "Nie ma takiego użytkownika!"})
            }
        });
});
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token){
        res.send({message:"We need a token! Please give it next time..."})
    } else {
        jwt.verify(token, "projektpsi", (err, decoded) => {
            if(err) {
                res.json({auth: false, message: "You failed to authenticate!"});
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}
app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send("You are authenticated!")
})
app.get('/login', (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false});
    }
});

app.get('/getRecipeList', (req, res) => {
    db.query("SELECT * FROM recipes", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("Server is running at port 3001 :)")
})