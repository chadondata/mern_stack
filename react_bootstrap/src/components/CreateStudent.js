import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


class CreateStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name : ''
            , email : ''
            , rollno : ''
        }
    }

    onChangeStudentName = (e) => {
        this.setState({ name : e.target.value });
    }

    onChangeStudentEmail = (e) => {
        this.setState({ email : e.target.value });
    }

    onChangeStudentRollNo = (e) => {
        this.setState({ rollno : e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const studentObject = {
            name : this.state.name
            , email : this.state.email
            , rollno : this.state.rollno
        };

        axios.post('http://localhost:4000/students/create-student', studentObject).then(res => console.log(res.data));
        
        this.setState({
            name : ''
            , email : ''
            , rollno : ''            
        });
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName}/>
                    </Form.Group>
                    
                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail}/>
                    </Form.Group>
                    
                    <Form.Group controlId="RollNo">
                        <Form.Label>Roll No</Form.Label>
                        <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollNo}/>
                    </Form.Group>

                    <Button variant="danger" size="lg" block="block" type="submit">
                        Create Student
                    </Button>
                    
                </Form>
            </div>
        )
    }
}

export default CreateStudent;