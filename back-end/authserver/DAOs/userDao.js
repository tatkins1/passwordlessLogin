//sigleton
class UserDao {
    constructor() {
        this.db = [];
    }
    createUser(number, sessionId) {
        let user = {
            uid: number,
            number:number,
            name:null,
            email:null,
            zip:null,
            last_session:sessionId,
        }
        this.db.push(user);
        console.log("User created");
        console.log(user);
        return user;
    }
    getUser(uid) {
        return this.db.find((user)=>{
            return user.uid===uid;
        })
    }
    getAllUsers(){
        return this.db;
    }
    updateUser(uid,name,email,zip,last_session) {
        let user=this.getUser(uid);
        user.name=name;
        user.email=email;
        user.zip=zip,
        user.last_session=last_session;
        console.log("User updated");
        console.log(user);
    }
}
let userDao = new UserDao();
module.exports = userDao;