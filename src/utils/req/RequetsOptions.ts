import { getToken } from "../token"

// GET SIMPLE
export function RequestOptions ({method}: {method:string}) {
    return {
        method,
        headers: {},
    }
}

// GET CON SESIÓN
export function RequestOptionsGetToken ({method}: {method:string}) {
    return {
        method,
        headers: {
            "Content-Type": "application/json",
            token: `${getToken()}`
        },
    }
}

// CREAR SIN SESIÓN
export function RequestOptionsCreate ({method, body}: {method:string, body:any}) {
    return {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

// CREAR SIN SESIÓN
export function RequestOptionsCreateToken ({method, body}: {method:string, body:any}) {
    return {
        method,
        headers: {
            "Content-Type": "application/json",
            token: `${getToken()}`
        },
        body: JSON.stringify(body)
    }
}

export function RequestOptionsUpdate ({method,body}: {method:string, body:any}) {
    return {
        method,
        headers: {
            token: `${getToken()}`
        },
        body: JSON.stringify(body)
    }
}

export function RequestOptionsDelete ({method}: {method:string}) {
    return {
        method,
        headers: {
            token: `${getToken()}`
        }
    }
}

export function RequestOptionsRecovery ({method}: {method:string}) {
    return {
        method,
        headers: {
            token: `${getToken()}`
        }
    }
}
