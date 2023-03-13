import User from '../models/users.js';
import bcrypt from 'bcryptjs';

// JWT 쿠키 세션 구현하기 

export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const userExist = await User.findOne({username: req.body.username});
        if (userExist) return res.status(400).json({message: "User already exists"});

        const newUser = new User({
            username: req.body.username,
            password: hash
        });

        await newUser.save();

        res.status(200).json({message: "User created successfully"});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) return res.status(404).json({message: "User not found"});

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({message: "Incorrect password"});

        res.status(200).json({message: "Login successful"});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
}
