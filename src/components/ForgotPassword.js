import React, {useRef, useState} from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useAuth } from '../contexts/AuthContext';


export default function ForgotPassword() {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const { resetPassword } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()
        try{
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further details')
        } catch {
            setError('Failed to send password reset email. Contact Support')
        }
        setLoading(false)        
    }

    return (
       <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Login!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Button className="w-100" type="submit" disabled={loading}>Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <Link to="/login">Login</Link>
                </div>
            </Card.Body>
        </Card>
            <div className="w-100 text-center mt-2">
                Neeed an account? <Link to="/signup">Sign Up</Link>
            </div>
       </>
    )
}
