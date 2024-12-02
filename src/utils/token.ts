
export const getToken = () => {
    return window.localStorage.getItem(`token`);
}

export const setToken = (token: string) => {
    return `${window.localStorage.setItem(`token`, token)}`;
}

export const deleteTokenAndUser = () => {
    window.localStorage.removeItem(`token`);
    window.localStorage.removeItem(`user`);
}

