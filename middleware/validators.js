const yup = require('yup');

async function validateNewUserData(req, resp, next) {
    let {body} = req;

    const userSchema = yup.object({
        name: yup.string().trim().min(1).required(), 
        email: yup.string().email().trim().required() 
    });

    try {
        const userData = await userSchema.validate(body);
        body = userData;
        next();
    } catch (error) {
        resp.send(400, { error: `Data is not valid: ${error.message}` });
    }
}

async function validateUserId(req, resp, next) {
    let { userId } = req.params;
    const userSchema = yup.number().integer().min(0);

    try {
        const userData = await userSchema.validate(userId);
        next();
    } catch (error) {
        resp.send(400, { error: `Data is not valid: ${error.message}` });
    }
}

module.exports = {
    validateNewUserData, 
    validateUserId 
}
