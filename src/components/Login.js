import React, {useRef, useState} from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth } from '../contexts/AuthContext';


export default function Login() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to login. Contact Support')
        }
        setLoading(false)        
    }

    return (
       <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Login!</h2>
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
                    <Button className="w-100" type="submit" disabled={loading}>Login</Button>
                </Form>
            </Card.Body>
        </Card>
            <div className="w-100 text-center mt-2">
                Neeed an account? <Link to="/signup">Sign Up</Link>
            </div>
       </>
    )
}