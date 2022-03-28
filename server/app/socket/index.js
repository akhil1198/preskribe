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
    
    const randomHex = () => {
        return crypto.randomBytes(24).toString('hex')
    }

    let addUserToRoom = async (roomID, data, socket) => {
        const { _id, name, email } = data
        //getting the room details 
        const getRoom = await Chatroom.findOne({ roomID });

        if(getRoom){
            let presentUsers = getRoom && getRoom.users;
           
            const newData = {
                socketID: socket.id,
                userID: _id,
                userName: name,
                userEmail: email
            }
            
            if(presentUsers.some(person => person.userID == _id)){
                const update = await Chatroom.updateOne(
                    { 'users.userID': _id},
                    { $set: { 'users.$.socketID': socket.id }},
                    { upsert: true }
                )
            } else {
                const add = await Chatroom.updateOne(
                    { _id: getRoom._id },
                    { $push: { users: newData } }
                )
            }

            //join the room channel
            socket.join(roomID)

            //broadcasting the updated userslist
            socket.broadcast.emit('roomJoined', await Chatroom.findOne({ roomID }))
        }
    }

    let removeUserFromRoom = async (roomID, user, socket) => {
        console.log(roomID, user)
        let findRoom = await Chatroom.findOne({ roomID })
        console.log(findRoom)

        if(findRoom) {
            const presentUsers = findRoom && findRoom.users

            if(presentUsers.some(user => user.socketID == socket.id)){
                console.log("found user delete him")
                socket.leave(roomID)
                const update = await Chatroom.updateOne(
                    { 'users.socketID': socket.id},
                    { $pull: { 'users.$.socketID': socket.id }},
                    { upsert: true }
                )
            } else {
                console.log("user not found")
            }

            //send updated users list to the same socket event used while adding
            socket.broadcast.emit('roomJoined', await Chatroom.findOne({ roomID }))
        }
    }

    //for chats
    io.of('/chatter').on('connection', socket => {
        console.log('chatter connected to client!')

        //joining chat rooms
        socket.on('join', async data => {
            const { roomID } = data
            //adding users to room
            const addFn = addUserToRoom(roomID, data.user, socket)
        })

        //disconnecting
        socket.on("disconnecting", async () => {
            console.log("Client disconnecting => ", socket.id);
            let findSocketID = await Chatroom.find({
                users: { $elemMatch : { socketID: socket.id }}
            })
            const roomID = findSocketID && findSocketID[0] && findSocketID[0].roomID
            let users = findSocketID && findSocketID[0] && findSocketID[0].users

            const found = users && users.find(user => user.socketID == socket.id)
            if(found){
                const update = await Chatroom.updateOne(
                    { '_id': findSocketID && findSocketID[0]._id},
                    { $pull: { "users" : { 'socketID': found.socketID }}},
                    { upsert: true },
                )
            } else {
                console.log("user not found")
            }
            socket.broadcast.emit('roomJoined', await Chatroom.findOne({ roomID }))
        });
    })

    //for rooms
    io.of('/roomslist').on('connection', socket => {
        console.log('socket.io server connected to client!')

        socket.on('getChatrooms', () => {
            Chatroom.find().then(docs => {
                // console.log("docs to send back => ", docs)
                socket.emit('chatRoomsList', docs)
            })
        })

        socket.on('checkIfRoomExists', async id => {
            let roomID = id
            const checkExists = await Chatroom.findOne({ roomID });
            if(checkExists){
                socket.emit('checkID', true, checkExists)
            } else {
                socket.emit('checkID', false)
            }
        })

        socket.on('createNewRoom', async roomname => {
            //check to see if the same room has been created. if else then create and send updated room list to frontend

            // console.log("name: ", roomname)

            let room = roomname
            //Check if room exists
            const checkRoom = await Chatroom.findOne({ room });
            // console.log("response => ", checkRoom);
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
                        // console.log("RESPONSE => ", response)
                        Chatroom.find().then(docs => {
                            console.log("docs to send back => ", docs)
                            socket.emit('chatRoomsList', docs)
                            socket.broadcast.emit('chatRoomsList', docs)
                            // socket.to(roomID).broadcast.emit('chatRoomsList', docs)
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                    // console.log("save: ", saveRoom)
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