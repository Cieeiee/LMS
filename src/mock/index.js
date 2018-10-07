export const userLogin = (account, password) => {
    fetch('/api/login')
        .then(Response => Response.json())
        .then(result => {
            return result;
        })
        .catch(e => {
            return null;
        })
}

