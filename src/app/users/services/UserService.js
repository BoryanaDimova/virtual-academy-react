import Constants from "../../constants/Constants";
import API from "../../api/API";

const UserService = {
    getUsers() {
        return API.get(Constants.USERS);
    },
    getUserById(id) {
        return API.get(Constants.USERS+ '/' + id);
    },
    save(data) {
        if(!data){
            return;
        }

        if (data.id) {
            return API.put(Constants.USERS + '/' + data.id, data);
        } else {
            return API.post(Constants.USERS, data);
        }

    },
    delete(id) {
        return API.delete(Constants.USERS + '/' + id);
    },
}

export default UserService;
