import React, {Component} from 'react';
import UserService from "../../services/UserService";
import './AdminPanelComponent.css';

const newUser ={
    id: 0,
    email: '',
    firstName: '',
    isAdmin: false,
    isBlocked: false,
    lastName: '',
    password: ''
};
class AdminPanelComponent extends React.Component {
    constructor(props) {
        super(props);

    }


    state = {
        users: [],
        formGroup: {},
        editDisabled: true
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        UserService.getUsers().then(
            users => this.setState({users})
        )
    }

    addNewUser() {
        if (this.state.users.filter(u => u.id === 0).length > 0){
            return;
        }
        this.state.users.push(newUser);
        this.editRow(newUser);

    }

    updateEdit() {
        UserService.save(this.state.formGroup).then(()=>{
            this.getUsers();
            this.clearForm();
            }
        );
    }

    cancelEdit() {
        if (this.state.users.filter(u => u.id === 0).length > 0) {
            this.state.users.pop();
        }
        this.clearForm();
    }

    clearForm(){
        this.buildForm(newUser);
        this.setState({editDisabled: true});
    }

    editRow(user) {
        this.buildForm(user);
        this.setState({editDisabled: false});
    }

    onBlockClick(user) {
        user.isBlocked = true;
        UserService.save(user).then(
            this.getUsers()
        );
    }

    changeHandler = event => {

        const name = event.target.id;
        let value = (event.target.type === 'checkbox'? event.target.checked : event.target.value);
        const updatedControls = {
            ...this.state.formGroup
        };

        if(name === 'isAdmin') {
            value = (value === "true");
        }
        updatedControls[name] = value;


        this.setState({
            formGroup: updatedControls
        });
    }

    onDeleteClick(id) {
        UserService.delete(id).then(
            this.getUsers()
        )
    }

    buildForm(user) {
        let formGroup = {
            id:  user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            isBlocked: user.isBlocked,
            isAdmin: user.isAdmin
        };

        this.setState({formGroup});
    }

    formatPassword(value) {
        return value.replace(/./gi, '*');
    }


    renderTableBody() {
        return <tbody>
        {this.state.users.map((user, index) => <tr key={user.id}>
            <td scope="row">{index + 1}</td>
            <td>
                {(user.id === this.state.formGroup.id && !this.state.editDisabled)
                    ? <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        onChange={this.changeHandler}
                        value={this.state.formGroup.firstName}/>
                    : <span>{user.firstName}</span>
                }
            </td>
            <td>
                {(user.id === this.state.formGroup.id && !this.state.editDisabled)
                    ? <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        onChange={this.changeHandler}
                        value={this.state.formGroup.lastName}/>
                :<span>{user.lastName}</span>
                }

            </td>
            <td>
                {(user.id === this.state.formGroup.id && !this.state.editDisabled) ?
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={this.changeHandler}
                        value={this.state.formGroup.email}/>
                    : <span>{user.email}</span>}
            </td>
            <td>
                {(user.id === this.state.formGroup.id && !this.state.editDisabled) ?
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={this.changeHandler}
                        value={this.state.formGroup.password}/>
                    : <span>{this.formatPassword(user.password)}</span>}
            </td>
            <td className="justify-content-md-center">
                {(user.id === this.state.formGroup.id && !this.state.editDisabled) ?
                    <input
                        type="checkbox"
                        className="form-control"
                        id="isBlocked"
                        onChange={this.changeHandler}
                        checked={this.state.formGroup.isBlocked}/>
                    : <span className={user.isBlocked ? 'fa fa-check-square-o' : 'fa fa-square-o'}/>}
            </td>
            <td>
                {(user.id === this.state.formGroup.id && !this.state.editDisabled) ?
                    <select
                        className="form-control custom-select"
                        id="isAdmin"
                        onChange={this.changeHandler}
                        defaultValue={this.state.formGroup.isAdmin}>
                        <option label="Admin" value="true"/>
                        <option label="User" value="false"/>
                    </select>
                    : <span>{user.isAdmin ? ' Admin' : ' User'}</span>}
            </td>

            {(user.id === this.state.formGroup.id && !this.state.editDisabled) ?
                <td className="actions">
                    <button className="fa fa-check-square-o btn btn-outline-primary ml-2" type="submit"
                            aria-hidden="true"
                            onClick={this.updateEdit.bind(this)}/>
                    <button className="fa fa-close btn btn-outline-dark ml-2" type="button" aria-hidden="true"
                            onClick={this.cancelEdit.bind(this)}/>
                </td>
                :
                <td className="actions">
                    <button className="fa fa-pencil btn btn-outline-primary ml-2" type="button"
                            aria-hidden="true"
                            onClick={() => this.editRow(user)}/>
                    <button className="fa fa-ban btn btn-outline-danger ml-2" type="button" aria-hidden="true"
                            onClick={() => this.onBlockClick(user)} disabled={user.isBlocked}/>
                    <button className="fa fa-trash btn btn-outline-dark ml-2" type="button" aria-hidden="true"
                            onClick={() => this.onDeleteClick(user.id)}/>
                </td>
            }
            <td></td>
        </tr>)
        }
        </tbody>
    }

    render() {
        return (
            <div className="table-responsive-sm">
                <table className="table table-striped table-hover align-items-center">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Blocked</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                        <th scope="col">
                            <button className="fa fa-plus btn btn-outline-success ml-2" type="button" aria-hidden="true"
                                    onClick={this.addNewUser.bind(this)}/>
                        </th>
                    </tr>
                    </thead>
                    {this.renderTableBody()}
                </table>
            </div>
        )
    }


}


export default AdminPanelComponent;
