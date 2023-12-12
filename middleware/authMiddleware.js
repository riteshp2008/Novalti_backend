import jwt from 'jsonwebtoken';
import User from '../Models/UserModel.js';

const protect = async (req, res, next) => {
    let token;

    // console.log(req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // console.log(token);

            const decoded = jwt.verify(token, "sanket");

            // console.log(decoded);

            req.user = await User.findById(decoded.id).select('-password');

            // console.log(req.user);

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({
                message: 'Not authorized, token failed',
            });
        }
    }

    if (!token) {
        res.status(401).json({
            message: 'Not authorized, no token',
        });
    }
};

const generateToken = (id) => {
    // Generate a JSON Web Token (JWT) using the user ID
    const token = jwt.sign({ id }, "sanket", {
        expiresIn: "1h" // Set the token expiration time (e.g., 1 hour)
    });

    return token;
};

export { protect, generateToken };
 