import {signin} from '../controllers/auth.controller';

export default app=>{
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
       
      app.post("/api/auth/signin", signin);
}