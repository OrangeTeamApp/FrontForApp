import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';


class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch("/api/users?action=list")
        .then(response => response.json())
        .then(data => this.setState({users: data}));
    }

    async remove(id) {
        await fetch(`/api/users?id=${id}&action=delete`, {
            method: 'DELETE',
        }).then(() => {
            let updatedUsers = [...this.state.users].filter(i => i.id !== id);
            this.setState({users: updatedUsers});
        });
    }

    render() {
        const {users} = this.state;

        const userList = users.map(user => {
            return <tr key={user.id}>
                <td>{user.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.birthDate}</td>
                <td>{user.email}</td>
                
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/users/" + user.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(user.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/users/new">Add User</Button>
                    </div>
                    <h3>Users</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">ID</th>
                            <th width="30%">First Name</th>
                            <th width="30%">Last Name</th>
                            <th width="30%">Birth Date</th>
                            <th width="30%">Email</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }

}
export default UserList;