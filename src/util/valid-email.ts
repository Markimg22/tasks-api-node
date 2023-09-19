export function emailIsValid(email: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regexEmail.test(email);
}
