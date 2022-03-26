const crypto = require('crypto');
const Chatroom = require('../models/ChatRoomModel');

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
            Chatroom.find().then(docs => {
                console.log("docs to send back => ", docs)
                socket.emit('chatRoomsList', docs)
            })
        })

        socket.on('checkIfRoomExists', async id => {
            console.log("ROOM ID => ", id)
            let roomID = id
            const checkExists = await Chatroom.findOne({ roomID });
            console.log("room => ", checkExists)
            if(checkExists){
                console.log("exists good to go")
                socket.emit('checkID', true, checkExists)
            } else {
                console.log("doesnt not exist bad route")
                socket.emit('checkID', false)
            }
        })

        socket.on('createNewRoom', async roomname => {
            //check to see if the same room has been created. if else then create and send updated room list to frontend

            console.log("name: ", roomname)

            let room = roomname
            //Check if room exists
            const checkRoom = await Chatroom.findOne({ room });
            console.log("response => ", checkRoom);
            if (!checkRoom) {
                //if room doesnt exist push it
                let roomID = randomHex()
                let createRoom = await new Chatroom({
                    room,
                    roomID,
                    // users,
                });
                let saveRoom = await createRoom
                    .save()
                    .then((response) => {
                        console.log("RESPONSE => ", response)
                        Chatroom.find().then(docs => {
                            console.log("docs to send back => ", docs)
                            socket.emit('chatRoomsList', docs)
                            socket.broadcast.emit('chatRoomsList', docs)
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                    console.log("save: ", saveRoom)
            } else {
                console.log("exists => ", checkRoom)
                //else send response saying room exists
                socket.emit('chatRoomsList', "Room Name Already Exists.");
            }


            // if(!findRoombyName(allrooms, roomname)) {
            //     allrooms.push({
            //         room: roomname,
            //         roomID: randomHex(),
            //         users: []
            //     })

            //     //emit updated list
            //     socket.emit('chatRoomsList', JSON.stringify(allrooms))
            //     //emit and updated list to everyone connected 
            //     socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms))
            // }
        })  
    })
}