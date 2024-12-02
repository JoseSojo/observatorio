
export const getUser = () => {
    return `${window.localStorage.getItem(`user`)}` as any;
}

export const setUser = (user: any) => {
    return `${window.localStorage.setItem(`user`, JSON.stringify(user))}`;
}

