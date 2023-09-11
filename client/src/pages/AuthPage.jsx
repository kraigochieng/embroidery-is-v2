import React, { useState } from 'react'
import { auth } from '../axiosInstances'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Form, Input } from 'antd'
export default function AuthPage() {
    // State
    const [loginForm] = Form.useForm() // to set default values
    const [isUserValid, setIsUserValid] = useState(true)
    // Form Config
    loginForm.setFieldsValue({
        username: 'kraig',
        password: 'password'
    })

    // Navigation
    const navigate = useNavigate()

    // Form Submission
    function handleFinish(values) {
        auth.post('login', values)
            .then(response => {
                sessionStorage.setItem("jwt", response.data.token) // Set JWT Token
                sessionStorage.setItem("authorities", JSON.stringify(response.data.authorities))
                navigate("/") // Navigate to home page
            })
            .catch(error => {
                setIsUserValid(false)
                console.error(error.response.status)
            })
    }

    // handle error alert close
    function handleClose() {
        setIsUserValid(true)
    }

    return (
        <>
            <Form form={loginForm} name='loginForm' onFinish={handleFinish}>
                <Form.Item label='Username' name='username'>
                    <Input placeholder='Username'/>
                </Form.Item>
                <Form.Item label='Password' name='password'>
                    <Input.Password placeholder='Password'/>
                </Form.Item>
                <Button htmlType='submit'>Login</Button>
                {
                    !isUserValid &&
                    <Alert
                        type='error'
                        message='Either username or password invalid'
                        closable
                        onClose={handleClose}
                    />
                }
            </Form>
        </>
    )
}
