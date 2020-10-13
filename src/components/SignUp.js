import React, {useRef, useState} from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth } from '../contexts/AuthContext';


export default function SignUp() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { signup } = useAuth()
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfRef.current.value) {
            return setError('Password do not match!')
        }        

        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to create account. Contact Support')
        }
        setLoading(false)        
    }

    return (
       <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="passwordConf">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfRef} required />
                    </Form.Group>
                    <Button className="w-100" type="submit" disabled={loading}>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Login</Link>
            </div>
       </>
    )
}
