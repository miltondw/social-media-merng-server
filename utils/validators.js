module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = {}
    if (username.trim() == '' ||
        email.trim() == '' ||
        password.trim() == '' ||
        confirmPassword.trim() == '') {
        errors.empty = 'This field must not be empty'
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            );
    };
    if (validateEmail(email) == null && email.trim() !== '') {
        errors.email = "Email must be a valid email address"
    }
    if (password !== confirmPassword) {
        errors.password = "Passwords must match"
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
module.exports.validateLoginInput = (username, password) => {
    const errors = {}
    if (username.trim() === '' || password.trim() === '') {
        errors.empty = 'This field must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}