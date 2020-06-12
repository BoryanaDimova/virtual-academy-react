import React, {Component} from 'react';
import './CoursesCardsListComponent.css';
import CourseCardItemComponent from "../../components/CourseCardItem/CourseCardItemComponent";
import CourseService from "../../services/CourseService";
import CoursesModalFormComponent from "../../components/CoursesModalForm/CoursesModalFormComponent";


class CoursesCardsListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        courses: [],
        favourites: [],
        modalShow: false
    }

    componentDidMount() {
        this.getCourses();
    }

    getCourses() {
        CourseService.getCourses()
            .then(courses => this.setState({courses}));
    }

    toggleModal() {
        let modalShow = !this.state.modalShow;
        this.setState({modalShow});
    }

    onRemoveClick(id) {
        CourseService.delete(id).then(this.getCourses());
    }

    handleSaveCourse() {
        this.getCourses();
        this.toggleModal();
    }

    render() {
        return (
            <div>
                <div className="row mb-3">
                    <div className="col-md-12 d-flex justify-content-between">

                        <div className="col-md-2">
                            <a className="btn btn-outline-info btn-block" onClick={this.toggleModal.bind(this)}>New
                                Course</a>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {this.state.courses.map((course, index) =>
                        <div className="card-holder" key={course.id}>
                            <CourseCardItemComponent
                                course={course}
                                favourite={this.state.favourites.includes(course.id)}
                                onRemove={this.onRemoveClick.bind(this)}
                            />
                        </div>)}
                </div>
                {this.state.modalShow && <CoursesModalFormComponent show={this.state.modalShow}
                                                                    onHide={this.toggleModal.bind(this)}
                                                                    onSave={this.handleSaveCourse.bind(this)}/>
                }
            </div>
        )
    }
}

export default CoursesCardsListComponent;
