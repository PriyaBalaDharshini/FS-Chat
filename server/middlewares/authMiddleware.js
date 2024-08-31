import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    //console.log(req.cookies);
    const token = req.cookies.jwt;
    //console.log({ token });
    if (!token) {
        return res.status(401).send("You are not authenticated")
    } else {
        jwt.verify(token, process.env.JWT_KEY, async (error, payload) => {
            if (error) {
                res.status(403).send("Token is not valid")
            } else {
                req.userId = payload.userId;
                next()
            }
        })
    }
}