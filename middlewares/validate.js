const yup = require("yup");
const userModel = require("../models/userSchema");
const fablabModel = require("../models/fablabResquestSchema");


const validate = async (req, res, next) => {
    try {
        console.log("test",req.body);
        const schema = yup.object().shape({
            username: yup.string().notRequired().test('username_unique', 'username is already taken', async function (value) {
                const isUnique = await checkusernameUniqueness(value);             //console.log("aze",user);
                return isUnique;
            }),
            first_Name: yup.string().notRequired()
                .min(4, 'Username must contain at least 4 characters').max(10, 'The first_Name must contain a maximum of 10 characters'),
            last_Name: yup.string().notRequired()
                .min(4, 'Username must contain at least 4 characters').max(10, 'The last_Name must contain a maximum of 10 characters'),
            email: yup.string().notRequired()
                .email().test('email_unique', 'email is already taken', async function (value) {
                    const isUnique = await checkEmailUniqueness(value);
                    return isUnique;
                }),
            password: yup.string().notRequired()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'password : a character string of at least 8 characters containing at least one letter and one number'),
            created_at: yup.date().notRequired(),
            //updated_at: yup.date().notRequired(), methode 1 
            updated_at: yup.date().notRequired().default(null),   //methode 2
            dateOfBirth: yup.date().notRequired()
                .max(new Date(Date.now() - (18 * 365 * 24 * 60 * 60 * 1000)), 'You must be at least 18 years old'),
            phoneNumber: yup.number().notRequired()
                .typeError('The phone number must be a number').test('len', 'The phone number must contain 8 digits', val => val.toString().length === 8),
            gender: yup.string().notRequired()
                .oneOf(['Male', 'Female'    ]),
            // userType: yup.string().notRequired()
            //     .oneOf(['admin', 'regular', 'fablab']),
            address: yup.string().notRequired()
                .min(5, 'address must contain at least 5 characters').max(15, 'address must contain at least 15 characters')
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

const fablabvalidate = async (req, res, next) =>{
    try {
        console.log("test",req.body);
        const schema = yup.object().shape({
            fablabName:yup.string().required().test('fablabName_unique', 'fablab Name is already taken', async function (value) {
                console.log("hi")
                const isUnique = await checkFablabNameUnique(value);             
                return isUnique;
            }),
           fablabEmail: yup.string().required()
                .email().test('email_unique', 'fablab email is already taken', async function (value) {
                    const isUnique = await checkFablabEmailUnique(value);
                    return isUnique;
                })
            
        });
        async function checkFablabNameUnique(fablabName) {
            const user = await userModel.findOne({ username: fablabName });
            const fablab = await fablabModel.findOne({ fablabName: fablabName });
            return (!user && !fablab);
        }
       async function checkFablabEmailUnique(fablabEmail) {
            const user = await userModel.findOne({ email: fablabEmail });
            const fablab = await fablabModel.findOne({ fablabEmail: fablabEmail });
            return  (!user && !fablab);
        }
        await schema.validate(req.body);
        next();
        
    } catch (error) {
        res.json({ message: error.message });
    }

}
module.exports = {validate,fablabvalidate};