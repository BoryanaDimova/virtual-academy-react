import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainLayout from "./app/layouts/MainLayout";
import CoursesCardsListComponent from "./app/courses/pages/CoursesCardsList/CoursesCardsListComponent";
import CourseViewItemComponent from "./app/courses/pages/CourseViewItem/CourseViewItemComponent";
import AdminPanelComponent from "./app/users/pages/AdminPanel/AdminPanelComponent";

class App extends React.Component {

    render() {
        return (
            <Router>
                <MainLayout>
                    <Route path="/" exact component={CoursesCardsListComponent}/>
                    <Route path="/courses-cards-list" exact component={CoursesCardsListComponent}/>
                    <Route path="/course-view/:id" exact component={CourseViewItemComponent}/>
                    <Route path="/admin-panel" exact component={AdminPanelComponent}/>
                </MainLayout>
            </Router>
        )
    }
}

export default App;
