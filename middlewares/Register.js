const yup = require("yup");
const userModel = require("../models/userSchema");

const validate = async (req, res, next) => {
    try {
        //console.log("test",req.body);
        const schema = yup.object().shape({
            username: yup.string().notRequired().test('username_unique', 'username is already taken', async function (value) {
                const isUnique = await checkusernameUniqueness(value);            
                return isUnique;
            }),
            email: yup.string().notRequired()
                .email().test('email_unique', 'email is already taken', async function (value) {
                    const isUnique = await checkEmailUniqueness(value);
                    return isUnique;
                }),
            password: yup.string().notRequired()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'password : a character string of at least 8 characters containing at least one letter and one number'),
            created_at: yup.date().notRequired(),
            dateOfBirth: yup.date().notRequired()
                .max(new Date(Date.now() - (18 * 365 * 24 * 60 * 60 * 1000)), 'You must be at least 18 years old'),
            gender: yup.string().notRequired()
                .oneOf(['Male', 'Female'    ]),
              });
        async function checkusernameUniqueness(username) {
            // Check if username exists in database
            const user = await userModel.findOne({ username: username });
            // Return true if username exists, false otherwise
            //console.log("test sur username",user);
            return !user;
        }
        async function checkEmailUniqueness(email) {
            // Check if username exists in database
            const user = await userModel.findOne({ email: email });
            // Return true if username exists, false otherwise
            //console.log("aze",user);
            return !user;
        }
        await schema.validate(req.body);
        next();
    } catch (error) {
        res.json({ message: error.message });
    }
    
}

module.exports = validate;