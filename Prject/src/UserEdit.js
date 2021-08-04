import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {validEmpty, validNameMaxLength, validName, validDate, validEmail} from "./user.validations";

class UserEdit extends Component {

    validationState = {
        firstName: {
            errors: [],
            validators: [validEmpty, validName, validNameMaxLength]
        },
        lastName: {
            errors: [],
            validators: [validEmpty, validName, validNameMaxLength],
        },
        email: {
            errors: [],
            validators: [validEmpty, validEmail],
        },
        birthDate: {
            errors: [],
            validators: [validEmpty,validDate],
        },
        allField: {
            errors: []
        }
    }

    emptyItem = {
        firstName: '',
        lastName: '',
        email: '',
        birthDate: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            validation: this.validationState,
            isValidForm: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    errorRender(validationFieldState) {
        if (validationFieldState.errors.length) {
            return validationFieldState.errors.map((error) => (<div className="error-field">- {error}</div>));
        }
        return <></>;
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const user = await (await fetch(`/api/users/${this.props.match.params.id}`)).json();
            this.initValidation(user);
        }
    }

    initValidation(user) {
        const validation = {...this.state.validation};
        for (let key in user) {
            if (key !== 'id') {
                validation[key] = this.validation(key, user[key].toString());
            }
        }

        const isValidForm = this.getValidationStatus(validation);
        this.setState({item: user, isValidForm, validation});
    }

    validation(fieldName, fieldValue){
        const self = this;
        const fieldValidation = {...self.state.validation[fieldName], errors: []};
        fieldValidation.validators.forEach(validator => {
            const errors = fieldValidation.errors;
            fieldValidation.errors = [...errors, ...validator(fieldValue)];
        });

        return fieldValidation;
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        const validation = {
            ...this.state.validation,
            [name]: this.validation(name, value.toString())
        };
        validation.allField.errors = [];
        const isValidForm = this.getValidationStatus(validation);
        this.setState({...this.state, validation, item, isValidForm});
    }

    getValidationStatus(validation) {
        return Object.values(validation)
            .every(validField => !validField.errors.length);
    }

    async handleSubmit(event) {
        const self = this;
        event.preventDefault();
        const {item} = this.state;
        const userData = {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            birthDate: item.birthDate
        }

        const endpoint = +item.id ? `/api/users/${item.id}` : '/api/users';

        await fetch(endpoint, {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        }).then(response => {
            if (![400, 500].includes(+response.status)) {
                window.location.href = 'http://localhost:3000/users';
                return null;
            }
            return response.text();
        }).then(message => {
            const validation = {...self.state.validation, allField: {errors: [message]}};
            self.setState({...self.state, validation});
        });
    }

    render() {
        const {item, validation, isValidForm} = this.state;
        const title = <h2>{item.id ? 'Edit User' : 'Add User'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="firstname">First Name</Label>
                        <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                               onChange={this.handleChange} autoComplete="firstName"/>
                        {this.errorRender(validation.firstName)}
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input type="text" name="lastName" id="lastName" value={item.lastName || ''}
                               onChange={this.handleChange} autoComplete="lastName"/>
                        {this.errorRender(validation.lastName)}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                        {this.errorRender(validation.email)}
                    </FormGroup>
                    <FormGroup>
                        <Label for="birthDate">Birth Date</Label>
                        <Input type="text" name="birthDate" id="birthDate" value={item.birthDate || ''}
                               onChange={this.handleChange} autoComplete="birthDate"/>
                        {this.errorRender(validation.birthDate)}
                    </FormGroup>
                    <FormGroup>
                        {this.errorRender(validation.allField)}
                        <Button color="primary" type="submit" disabled={!isValidForm}>Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/users">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(UserEdit);
