
export const GetUser = () => {
    return JSON.parse(`${window.localStorage.getItem(`user`)}`);
}

export const SetUser = (User: string) => {
    window.localStorage.setItem(`user`, User);
}
