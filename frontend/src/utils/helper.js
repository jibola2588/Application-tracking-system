
export const validateData = (data) => {
    return Object.entries(data).every((item) =>  validateInput(item[0], item[1]))
}

export const validateInput = (type, value) => {
    switch (type) {
        case 'email':
            return String(value)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
       case 'password':
                return value.length >= 8;
        default:
            return value.length > 0
    }
}

export function toTitleCase(str) {
    if (!str) return
    return str.replaceAll("_", " ").replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}






