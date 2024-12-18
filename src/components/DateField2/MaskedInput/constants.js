const KEY_BACKSPACE = 'Backspace';
const KEY_DELETE = 'Delete';

const REGEX_ALPHA = /[^0-9|/]/g;
const REGEX_DATE_SLASH = /\//g;

export default Object.freeze({
    keys: {
        backspaceKey: KEY_BACKSPACE,
        deleteKey: KEY_DELETE,
    },
    regexPatterns: {
        alphaPattern: REGEX_ALPHA,
        dateSlashPattern: REGEX_DATE_SLASH,
    },
});
