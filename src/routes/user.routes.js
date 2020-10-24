import {authJwt} from '../middleware';

export default app=>{
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      
      app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        (req, res) => {
            const user=req.user;

            res.status(200).send(`User Content. UserID:${user.userId} UserName:${user.userName} email:${user.email}`);
        }
      );

}