
const method = {
    copy (o) {
        return JSON.parse( JSON.stringify( o ) )
    }
}


export default method