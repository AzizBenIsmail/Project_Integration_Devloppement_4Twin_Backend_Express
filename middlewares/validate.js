const yup = require("yup");
const userModel = require("../models/userSchema");


const validate = async (req, res, next) => {
    try {
        console.log(req.body);
        const schema = yup.object().shape({
            username: yup.string().required().test('username_unique', 'username is already taken', async function (value) {
                const isUnique = await checkusernameUniqueness(value);
                return isUnique;
            }),
            first_Name: yup.string().notRequired()
                .min(4, 'Username must contain at least 4 characters').max(10, 'The first_Name must contain a maximum of 10 characters'),
            last_Name: yup.string().notRequired()
                .min(4, 'Username must contain at least 4 characters').max(10, 'The last_Name must contain a maximum of 10 characters'),
            email: yup.string().required()
                .email().test('email_unique', 'email is already taken', async function (value) {
                    const isUnique = await checkEmailUniqueness(value);
                    return isUnique;
                }),
            password: yup.string().required()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'password : a character string of at least 8 characters containing at least one letter and one number'),
            created_at: yup.date().notRequired(),
            //updated_at: yup.date().notRequired(), methode 1 
            updated_at: yup.date().notRequired().default(null),   //methode 2
            dateOfBirth: yup.date().required()
                .max(new Date(Date.now() - (18 * 365 * 24 * 60 * 60 * 1000)), 'You must be at least 18 years old'),
            phoneNumber: yup.number().notRequired()
                .typeError('The phone number must be a number').test('len', 'The phone number must contain 8 digits', val => val.toString().length === 8),
            gender: yup.string().notRequired()
                .oneOf(['Male', 'Female', 'Other']),
            userType: yup.string().notRequired()
                .oneOf(['admin', 'regular', 'fablab']),
            address: yup.string().notRequired()
                .min(5, 'address must contain at least 5 characters').max(15, 'address must contain at least 15 characters')
        });
        async function checkusernameUniqueness(username) {
            // Check if username exists in database
            const user = await userModel.findOne({ username: username });
            // Return true if username exists, false otherwise
            console.log(user);
            return !user;
        }
        async function checkEmailUniqueness(email) {
            // Check if username exists in database
            const user = await userModel.findOne({ email: email });
            // Return true if username exists, false otherwise
            console.log(user);
            return !user;
        }
        await schema.validate(req.body);
        next();
    } catch (error) {
        res.json({ message: error.message });
    }
}
module.exports = validate;