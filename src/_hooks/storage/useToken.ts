
export const GetToken = () => {
    return window.localStorage.getItem(`token`);
}

export const SetToken = (token: string) => {
    window.localStorage.setItem(`token`, token);
}

