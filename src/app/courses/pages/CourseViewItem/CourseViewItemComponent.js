import React, {Component} from 'react';
import './CourseViewItemComponent.css';
import CourseService from "../../services/CourseService";
import Moment from 'react-moment';
import CoursesModalFormComponent from "../../components/CoursesModalForm/CoursesModalFormComponent";

class CourseViewItemComponent extends React.Component {
    constructor(props) {
        super(props);

    }

    state = {
        course: {},
        modalShow: false
    }

    componentDidMount() {
        this.getCourse();
    }

    getCourse() {
        CourseService.getCourseById(this.props.match.params.id)
            .then(course => this.setState({course}));
    }

    toggleModal() {
        let modalShow = !this.state.modalShow;
        this.setState({modalShow});
    }

    handleSaveCourse() {
        this.getCourse();
        this.toggleModal();
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-12 justify-content-sm-center">
                    <img src={this.state.course.imageUrl}/>
                </div>
                <div className="col-md-12">
                    <h5 className="title">{this.state.course.title}
                        <span className="fa fa-pencil" type="button" onClick={this.toggleModal.bind(this)}/>
                    </h5>
                </div>
                <div className="col-md-9"><b>Date Published:</b>
                    <Moment format="MMMM DD, YYYY" date={this.state.course.datePublished}/>
                </div>
                <div className="col-md-12 desc">
                    <div>{this.state.course.description}</div>
                </div>

                {this.state.modalShow && <CoursesModalFormComponent
                    show = {this.state.modalShow}
                    course = {this.state.course}
                    onHide={this.toggleModal.bind(this)}
                    onSave={this.handleSaveCourse.bind(this)}/>
                }
            </div>

        )
    }

}


export default CourseViewItemComponent;
