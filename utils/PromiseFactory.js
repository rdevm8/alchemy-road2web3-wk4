export async function PromiseFactory({ fetchObject, successCallBack, errorCallBack, setLoading }) {
    if (setLoading) {
        setLoading(true)
    }

    return fetch(fetchObject.fetchUrl, fetchObject.fetchOptions)
        .then(async (data) => {
            const response = await data.json()
            if (successCallBack) {
                successCallBack(response)
            }
        })
        .catch((error) => {
            console.log("Error encountered: ", error)
            if (errorCallBack) {
                errorCallBack(error)
            }
        })
        .finally(() => {
            if (setLoading) {
                setLoading(false)
            }
        })
}
