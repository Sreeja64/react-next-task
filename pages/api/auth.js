export const loginFetcher = async () => {
    const res = await fetch('https://uatservice.fodxpert.com/auth/local/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier: email,
            password: password,
        })

    })
    const data = await res.json()
    return data
}

