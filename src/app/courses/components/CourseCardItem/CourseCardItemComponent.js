import React, {Component} from 'react';
import './CourseCardItemComponent.css';
import {Link} from "react-router-dom";

class CourseCardItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    transform(value, length) {
        const maxLength = length ? length : 50;

        if (value.length > maxLength) {
            return `${value.substr(0, maxLength)}...`;
        }

        return value;
    }

    render() {

        return (
            <div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img className="card-img-top" src={this.props.course.imageUrl}
                                 alt={this.props.course.title}/>
                        </div>
                        <div className="flip-card-back">
                            <div className="row card-title">
                                <div className={this.props.favourite !== undefined ? 'col-10' : 'col-12'}>
                                    <Link className="btn btn-link btn-lg" type="button"
                                          to={`/course-view/${this.props.course.id}`}> {this.props.course.title} </Link>
                                </div>
                            </div>
                            <div className="row">
                                <p className="card-text multiline-ellipsis">{this.transform(this.props.course.description, 250)}</p>
                            </div>
                            <div className="row justify-content-between">
                                <Link className="btn btn-outline-primary ml-2"
                                      to={`/course-view/${this.props.course.id}`}>Details</Link>
                                <i className={this.props.favourite === undefined ? "btn btn-outline-dark ml-2 fa fa-times" : "btn btn-outline-dark ml-2 fa fa-trash"}
                                   type="button"
                                   aria-hidden="true" onClick={() => {
                                    let id = this.props.course.id;
                                    this.props.onRemove(id);
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default CourseCardItemComponent;
