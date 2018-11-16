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
    },

    computeListOrder (lists) {
        let listsOrder = []
        let index = 0
        for (let l of lists) {
            //let element = { listId: l.listId, listFather: -1 }
            let element = { listId: l.listId, listFather: index }

            /*if (index === 0) element.listFather = null
            else element.listFather = lists[index - 1].listId*/

            listsOrder.push(element)
            index += 1
        }
        return listsOrder
    },

    computeCardOrder (lists) {
        let cardsOrder = []
        let index = 0
        for (let l of lists) {
            for (let c of l.CardListFks) {
                let element = { cardId: c.cardId, cardFather: index }

                /*let element = { cardId: c.cardId, cardFather: null }
                if (index > 0) element.cardFather = l.CardListFks[index - 1].cardId
                */
                cardsOrder.push(element)
                index += 1
            }
            index = 0//
        }
        return cardsOrder
    }
}


export default method