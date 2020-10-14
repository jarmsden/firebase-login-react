import React, {useRef, useState} from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth } from '../contexts/AuthContext';


export default function UpdateProfile() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { currentUser, updateEmail, updatePassword  } = useAuth()
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        if(passwordRef.current.value !== passwordConfRef.current.value) {
            return setError('Password do not match!')
        }
        
        const promises =[]
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update account. Contact Support')
        }).finally(() => {
            setLoading('false')
        })
    }

    return (
       <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} defaultValue={currentUser.value} />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} placeholder='Keep blank to tleave the same'/>
                    </Form.Group>
                    <Form.Group id="passwordConf">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfRef} required placeholder='Keep blank to tleave the same'/>
                    </Form.Group>
                    <Button className="w-100" type="submit" disabled={loading}>Update</Button>
                </Form>
            </Card.Body>
        </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
       </>
    )
}
