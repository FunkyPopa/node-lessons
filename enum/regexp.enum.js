module.exports = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/, //1 up, 1 low, 1 sp char, 1 num, min 8 char, max 30 char
    MONGO_ID: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    PHONE: /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\d?\{1,6})?/
}
