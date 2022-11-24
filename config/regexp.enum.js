module.exports = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
    MONGO_ID: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
}

//Password: 1 up, 1 low, 1 sp char, 1 num, min 8 char, max 30 char
