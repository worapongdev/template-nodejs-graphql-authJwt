import jwt from 'jsonwebtoken';
import config from '../config/auth.config';

export const getToken=req=>{
    let token = null;
    const accessToken=req.headers["x-access-token"];
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        token = bearerToken;
    }else if(accessToken){
        token=accessToken;
    }

    return token;
};

export const verifyToken=(token,callback)=>{
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            callback(err,null);
            return;
        }

        const User={
            userId:decoded.id,
            userName:decoded.username,
            email:decoded.email
        }
        callback(null,User);
    });
};