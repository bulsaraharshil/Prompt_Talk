const users = []

const addUser = ({id, username, room}) => {
    console.log("Inside addUser",id,username,room);
    //clean the data
    username = username
    room = room

    //Validate the data
    if(!username || !room) {
        return {
            error: 'Username and room are required'
        };
    }

    //Check for existing user
    const existingUser = users.find((user) => user.room === room && user.username === username);

    //Validate username
    if(existingUser) {
        
            console.log( "Username is in user") 
      
    }

    //Store User
    const user = {id, username, room}
    users.push(user);
    console.log("USER::",user);
    return {user};
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index,1)[0];
    }
}

const getUser = (id) => {
    const user = users.find((user) => user.id === id);
    if(!user){
        return undefined;
    }
    return user;
}

const getUsersInRoom = (room) => {
    // room = 5
    const usersInRoom = users.filter((user) => user.room === room);
    if(usersInRoom.length === 0){
        return [];
    }
    return usersInRoom;
}


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}