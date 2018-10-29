const Request = {

    /*
     *  Return : url based on keys and values of the object (?idKey=idValue&titleKey=titleValue...)
     */
    urlFromObject (object) {
        if (object) {
            var keys = Object.keys(object)
            var values = Object.values(object)
            var url = '?'
            for (let i = 0; i < keys.length; i++) {
                url += keys[i] + '=' + values[i]
            }
            return url
        }
        else return ''
    }

}

export default Request