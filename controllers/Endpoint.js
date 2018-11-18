module.exports = {

    /*  Call from all routes
     *
     *  req.body = {
     *      finalResult: Any
     *  }
     *
     *  return: Send the result of a given route.
     */
    sendRes(req, res) {
        try {
            console.log('TRQL')
            res.status(201).send(req.body.result)
        } catch (error) {
            console.log('FINAL ERROR')
            console.log(error)
            res.status(400).send(error)
        }
    }

}