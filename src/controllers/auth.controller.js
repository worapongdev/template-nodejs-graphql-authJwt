import db from '../db/models';
import config from '../config/auth.config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const User = db.user;
const Role = db.role;
const User_Role = db.user_role;

const signin = async (req, res) => {
    await User.findOne({
      where: {
        user_name: req.body.username
      }
    })
      .then( async user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ 
            id: user.user_no,
            username:user.user_name,
            email:user.email
          }, 
          config.secret, 
          {
            expiresIn: 86400 // 24 hours
          }
        );
  
        var authorities = [];

        await User_Role.findAll(
          {
            where:{user_no:user.user_no},
            raw: true,
            required:true,
            include:{
              model:Role,
              attributes:['role_name']
            }
          }).then(roles=>{
            roles.map(item=>{
              authorities.push("ROLE_" + item['role.role_name'].toUpperCase());
            });


            res.status(200).send({
                id: user.user_no,
                username: user.user_name,
                email: user.email,
                roles: authorities,
                accessToken: token
              });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  export {signin};