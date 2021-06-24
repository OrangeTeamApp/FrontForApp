export const validName = (value) => {
    return value && /^[А-Я][а-я]*$/.test(value) ?
        [] :
        ['Имя должно начинаться с большой буквы и содержать латинские символы'];
};

export const validEmpty = (value) => {
    return value && value.length ? [] : ['Поле не может быть пустым'];
};

export const validNameMaxLength = (value) => {
    return value && value.length <= 20 ? [] : [`Максимальная количество символов - 20`];
};

export const validDate = (dateString) => {
    return dateString && /^\d\d\d\d-\d\d-\d\d$/.test(dateString) ? [] : ['Формат даты: YYYY-MM-DD'];
};

export const validEmail = (email) => {
    return email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) ? [] : ['Не правильный формат Email'];
}
