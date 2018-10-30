const Request = {

    /*
     *  Return : url based on keys and values of the object (?idKey=idValue&titleKey=titleValue...)
     */
    urlFromObject (object) {
        if (object) {
            let keys = Object.keys(object)
            let values = Object.values(object)
            let url = '?'
            for (let i = 0; i < keys.length; i++) {
                url += keys[i] + '=' + values[i]
                if (i < keys.length - 1) url += '&'
            }
            return url
        }
        else return ''
    }

}

export default Request