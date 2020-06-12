const Constants={
    BASE_URL: 'http://localhost:3000/',
    COURSES: '/courses',
    USERS: '/users',
    VALID_NAME_REGEX : RegExp('^[a-zA-Z\s]+$'),
    VALID_EMAIL_REGEX: RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
    VALID_PASSWORD_REGEX: RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
}
export default Constants;
