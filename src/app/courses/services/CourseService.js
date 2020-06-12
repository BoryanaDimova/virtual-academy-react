import Constants from "../../constants/Constants";
import API from "../../api/API";

const CourseService = {
    getCourses() {
        return API.get(Constants.COURSES);
    },
    getCourseById(id) {
        return API.get(Constants.COURSES+ '/' + id);
    },
    save(data) {
        if(!data){
            return;
        }

        if (data.id) {
            return API.put(Constants.COURSES + '/' + data.id, data);
        } else {
            return API.post(Constants.COURSES, data);
        }

    },
    delete(id) {
        return API.delete(Constants.COURSES + '/' + id);
    },
}

export default CourseService;
