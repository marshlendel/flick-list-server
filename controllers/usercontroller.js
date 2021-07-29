const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    let { username, email, password } = req.body.user;
    try {
    const User = await UserModel.create({
        username,
        email,
        password: bcrypt.hashSync(password, 13),
    });


    res.status(201).json({
        message: "User successfully registered",
        user: User,
        sessionToken: token
    });
}catch (err) {
    if (err instanceof UniqueConstraintError) {
        res.status(409).json({
            message: "Email already in use",
        });
    } else {
    res.status(500).json({
        message: "Failed to register user ${err}",
    });
    }
    }
});

router.post("/login", async (req, res) => {
    let { username, email, password } = req.body.user;
    
    try {
        let loginUser = await UserModel.findOne({
        where: {
            email:email,
        },
    });

    if (loginUser) {

        let passwordComparison = await bcrypt.compare(password, loginUser.password);

        if (passwordComparison) {


        res.status(200).json({
        user:loginUser,
        message: "User successfully logged in!",
    });
} else {
    res.status(401).json({
        message: "Incorrect email or password"
    })
}
} else {
        res.status(401).json({
            message: 'Incorrect email or password'
        });
}
} catch (error) {
    res.status(500).json({
        message: "Failed to log user in"
    })
}
});

module.exports = router;
