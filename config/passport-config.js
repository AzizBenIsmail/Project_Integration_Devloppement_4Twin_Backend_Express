const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');

function initialize(passport,getUserByEmail) {

    const authenticateUser =async (email,password,done)=>{
        const user =getUserByEmail(email);
        if(user){
            try {
                if(await bcrypt.compare(user.password,password)){
                    return done(null,user);
                }else{
                    return done(null,false,{message :'Password incorrect!'});
                }
                
            } catch (error) {
                return done(error);
            }
         
        }
        else{
            return done(null,false,{message :'No such user found!'});
        }
    }
passport.use(new LocalStrategy({usernameField: 'email'},

authenticateUser))
}
module.exports = initialize;