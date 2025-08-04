// models/user.js
const {Schema, model }= require('mongoose')
const validator = require('validator')
const {createHmac,randomBytes} = require('crypto')
const {createTokenForUser,verifyToken} = require('../server/auth.js')

const userSchema =new Schema({
    FullName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100,
    },
    email:{
        type:String,
        required:[true,"Email address required"],
        unique:true,
        trim:true,
        lowercase:true,
        validate:[validator.isEmail,'Invalid Email address']
    },
    salt:{
        type:String,
     
    },
    password:{
        type:String,
        required:true,
        minlength:8,
         
    },
    profileImgURL:{
        type:String,
        default:"/profile/default.jpg",
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],/* here enum means fixed no other than these roles if any user try to keep other roles mongoose thorows error */
        default:'USER'
    }

},{timestamps:true})

userSchema.pre('save',function (next){
    const user = this;
    if(!user.isModified("password")) return next();
    const salt = randomBytes(16).toString('hex'); 
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex")/* here sha256 is a crypto algo */
   /*  .update(data) → adds the data (like password) to hash.
  .update(data) → adds the data (like password) to hash.  */
    this.salt = salt;
    this.password = hashedPassword;
   return  next();
})
userSchema.static("matchPasswordAndGenerateToken",async function(email,password) {
    const user = await this.findOne({email})
    if(!user) throw new Error('Invalid email or password')
    salt = user.salt;
    const hashedPassword = user.password
    const providedPassword = createHmac("sha256",salt).update(password).digest("hex")
    if(hashedPassword !==  providedPassword) throw new Error('Invalid email or password')/* check if password is matched or not if matched send user */
    const token  = createTokenForUser(user);
    return token;
        // return {...user,password:undefined,salt:undefined} /* password should not share out of reference */

})
const User = model("user",userSchema);

module.exports=User
