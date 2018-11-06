const method = {
    copy (o) {
        return JSON.parse( JSON.stringify( o ) )
    },

    isTypeEmail (str) {
        try {
            let strSplit = str.split('@')
            let strAfterA = strSplit[1].split('.')
            let strEnd = str.split('.')

            return (strSplit.length === 2 && strAfterA.length === 2 && strEnd.length > 1)
        } catch (err) {
            return false
        }
    }
}


export default method