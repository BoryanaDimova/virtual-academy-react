import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalTitle} from "react-bootstrap";
import './CoursesModalFormComponent.css';
import CourseService from "../../services/CourseService";

class CoursesModalFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {course: {}, errors: {
                title: '',
                description: '',
                datePublished: '',
            }};
    }

    componentDidMount() {
        this.populateState();
    }

    populateState() {
        let course = {
            id: (this.props.course ? this.props.course.id : 0),
            title: (this.props.course ? this.props.course.title : ''),
            description: (this.props.course ? this.props.course.description : ''),
            datePublished: (this.props.course ? this.props.course.datePublished : this.formatDate()),
            imageUrl: (this.props.course ? this.props.course.imageUrl : '')
        }
        this.setState({course});
    }

    changeHandler = event => {

        const name = event.target.id;
        const value = event.target.value;
        const updatedControls = {
            ...this.state.course
        };

        updatedControls[name] = value;


        this.setState({
            course: updatedControls
        });

        this.validateInput(name, value)
    }

    validateInput(name, value){
        let errors = this.state.errors;

        switch (name) {
            case 'title':
                errors.title =
                    value.length < 0
                        ? 'The title is required!'
                        : '';
                break;
            case 'description':
                errors.description =
                    value.length < 0
                        ? 'The description is required!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })
    }

    formatDate(){
       let d = new Date();
        let dt = d.getDate();
        let mn = d.getMonth();
        let yyyy = d.getFullYear();
        console.log((yyyy + "-" + mn + "-" + dt));
        return (yyyy + "-" + (mn+1) + "-" + dt);
    }
    submitFormHandler = event => {
        event.preventDefault();
        if(!this.validateForm(this.state.errors)){
            return;
        }

        CourseService.save(this.state.course).then(this.props.onSave);
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} className="modal" id="centralModalLg" tabIndex="-1"
                   role="dialog" aria-labelledby="myModalLabel" size="lg" centered aria-hidden="true">
                <Modal.Header className="modal-header" closeButton>
                    <ModalTitle className="modal-title">{this.state.course.id ? 'Update' : 'Add'} course</ModalTitle>
                </Modal.Header>
                <ModalBody className="modal-body">
                    <form>
                        <div className="form-group focus">
                            <label htmlFor="title">Title</label>
                            <input type="text"
                                   className="form-control"
                                   id="title"
                                   placeholder="Enter title..."
                                   value={this.state.course.title}
                                   onChange={this.changeHandler} required={true}/>
                            {this.state.errors.title.length > 0 &&
                            <span className='error'>{this.state.errors.title}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea type="textarea"
                                      rows="10"
                                      className="form-control"
                                      id="description"
                                      placeholder="Enter description..."
                                      value={this.state.course.description}
                                      onChange={this.changeHandler} required={true}/>
                            {this.state.errors.description.length > 0 &&
                            <span className='error'>{this.state.errors.description}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="datePublished">Published Date</label>
                            <input type="date"
                                   className="form-control"
                                   id="datePublished"
                                   placeholder="Choose date"
                                   value={this.state.course.datePublished}
                                   onChange={this.changeHandler} required={true}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <textarea type="text"
                                      rows="2"
                                      className="form-control"
                                      id="imageUrl"
                                      placeholder="Enter image url..."
                                      value={this.state.course.imageUrl}
                                      onChange={this.changeHandler}/>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter className="modal-footer btn-group btn-group-lg" role="group"
                             aria-label="group button">
                    <Button id="modal-close-button" type="button" className="btn" data-dismiss="modal"
                            onClick={this.props.onHide}>
                        Close
                    </Button>
                    <Button id="modal-action-button" type="submit" className="btn" onClick={this.submitFormHandler}>Save
                    </Button>
                </ModalFooter>
            </Modal>

        )
    }

}

export default CoursesModalFormComponent;
