import {getToken,verifyToken as authVerityToken} from '../auth';

const verifyToken = (req, res, next) => {
    const token=getToken(req);

    if (!token) {
        return res.status(403).send({
          message: "No token provided!"
        });
    }

    authVerityToken(token,(err,user)=>{
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }

        req.user=user;
        next();
    });
};


const authJwt = {
    verifyToken: verifyToken
};

export default authJwt;