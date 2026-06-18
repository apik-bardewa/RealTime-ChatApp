import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        console.log("cookies:", req.cookies);

        if (!token) {
            return res.status(400).json({
                msg: "token not found, user not logged in"
            });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        console.log("decoded token:", verifyToken);

        // support both possible keys
        req.userId = verifyToken.userId || verifyToken.userid;

        if (!req.userId) {
            return res.status(400).json({
                msg: "Invalid token payload: userId missing"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            msg: `isAuth error detected: ${error.message}`
        });
    }
};

export default isAuth;