/**SOCKET IO CONFIG
 * Define url from where to listen and emit
 */

import io from "socket.io-client"


const socket = io('http://localhost:4200')

export default socket

