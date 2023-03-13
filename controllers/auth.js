import User from '../models/users.js';

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) return res.status(404).json({message: "User not found"});

        const isPasswordCorrect = await user.comparePassword(req.body.password);

        if (!isPasswordCorrect) return res.status(400).json({message: "Incorrect password"});

        res.status(200).json({message: "Login successful"});
    } catch (err) {
        next(err);
    }
}
