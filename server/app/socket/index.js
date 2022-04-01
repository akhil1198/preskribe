const crypto = require('crypto');
const Messages = require('../models/MessageModel');
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

    

    //for chats
    io.of('/chatter').on('connection', socket => {
        console.log('chatter connected to client!')

        //joining chat rooms
        socket.on('join', async data => {
            const { roomID } = data
            //adding users to room
            const addFn = addUserToRoom(roomID, data.user, socket)
        })

        socket.on('getNewMessages', () => {
            const fetchMessages = Messages.find().then(docs => {
                // console.log("docs to send back => ", docs)
                // console.log("docs => ", docs)
                socket.emit('allNewMessages', docs)
            })
        })

        //recieving messages from frontend to store in db
        socket.on('newMessage', async data => {
            console.log(data)
            const { roomID } = data
            const name = data.user.name
            const messages = data.message

            const getRoom = await Messages.findOne({ roomID });
            if(getRoom){
                const add = await Messages.updateOne(
                    { _id: getRoom._id },
                    { $push: { messages: data } }
                )
                console.log(add)
                socket.broadcast.emit('allNewMessages', await Messages.findOne({ roomID }))
            }
            
            // console.log(newmessage)
            // newmessage.save().then(async () => {
            //     console.log("check this =??????????", data.roomID)
            //     socket.to(data.roomID).emit('allNewMessages', await Messages.find())
            // })
            // .catch((err) => {
            //     console.log("new message err => ",err)
            // })
            //adding users to room
            // const addFn = addUserToRoom(roomID, data.user, socket)
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

            let room = roomname

            //Check if room exists
            const checkRoom = await Chatroom.findOne({ room });
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
                    .then(async (response) => {
                        // console.log("RESPONSE => ", response)
                        let createMessageRoom = await new Messages({
                            roomName: roomname,
                            roomID,
                            // users,
                        });
                        let saveMessageRoom = await createMessageRoom
                            .save()
                            .then((response) => {
                                console.log("RESPONSE msgroom => ", response)
                            })
                            .catch((err) => {
                                console.log(err);
                            });    


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