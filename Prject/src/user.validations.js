export const validName = (value) => {
    return value && /^[A-Z][a-z]*$/.test(value) ?
        [] :
        ['Name must start with a capital letter and contain only latin symbols'];
};

export const validEmpty = (value) => {
    return value && value.length ? [] : ['Field can not be empty'];
};

export const validNameMaxLength = (value) => {
    return value && value.length <= 20 ? [] : [`Max length is 20`];
};

export const validDate = (dateString) => {
    return dateString && /^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)$|^(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))$|^(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))$|^(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))$/.test(dateString) ? [] : ['Date format: YYYY-MM-DD'];
};

export const validEmail = (email) => {
    return email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) ? [] : ['Incorrect email format'];
}
