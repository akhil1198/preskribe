const crypto = require('crypto')

module.exports = (io, app) => {
    let allrooms = app.locals.chatrooms;

    // allrooms.push({
    //     room: 'Good Food',
    //     roomID: '0001',
    //     users: []
    // })
    // allrooms.push({
    //     room: 'Good Foods',
    //     roomID: '0002',
    //     users: []
    // })
    
    //checking if room name already exists in this function below which returns a boolean value
    const findRoombyName = (allrooms, room) => {
        let findRoom = allrooms.findIndex((element, index, array) => {
            if(element.room === room) {
                return true 
            } else {
                return false
            }
        })
        return findRoom > -1 ? true : false
    }

    const findRoombyID = (allrooms, id) => {
        let findRoom = allrooms.findIndex((element, index, array) => {
            console.log(element.roomID !== id)
            if(element.roomID !== id) {
                return true 
            } else {
                return false
            }
        })
        // return findRoom > -1 ? true : false
    }

    const randomHex = () => {
        return crypto.randomBytes(24).toString('hex')
    }

    io.of('/roomslist').on('connection', socket => {
        console.log('socket.io server connected to client!')

        socket.on('getChatrooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms))
        })

        socket.on('checkIfRoomExists', id => {
            console.log("ROOM ID => ", id)
            if(!findRoombyID(allrooms, id)){
                socket.emit('checkID', true)
            } else {
                socket.emit('checkID', false)
            }
        })

        socket.on('createNewRoom', roomname => {
            //check to see if the same room has been created. if else then create and send updated room list to frontend

            console.log(roomname)
            if(!findRoombyName(allrooms, roomname)) {
                allrooms.push({
                    room: roomname,
                    roomID: randomHex(),
                    users: []
                })

                //emit updated list
                socket.emit('chatRoomsList', JSON.stringify(allrooms))
                //emit and updated list to everyone connected 
                socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms))
            }
        })  
    })
}