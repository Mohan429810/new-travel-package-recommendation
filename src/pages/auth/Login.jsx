// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // load logged-in user from localStorage if exists
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (isRegister) {
        handleRegister(values);
      } else {
        handleLogin(values);
      }
      setLoading(false);
    }, 700);
  };

  const handleRegister = (values) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    const exists = users.some((u) => u.email === values.email);
    if (exists) {
      message.error('User already registered with this email.');
      return;
    }

    // Add new user
    users.push({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    localStorage.setItem('users', JSON.stringify(users));
    message.success('Registered successfully! You can now login.');
    setIsRegister(false);
  };

  const handleLogin = (values) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (!user) {
      message.error('Invalid credentials!');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setLoggedInUser(user);
    message.success(`Welcome back, ${user.name || 'User'}!`);
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 px-4 relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <Card
        className="w-full max-w-md shadow-xl rounded-2xl"
        style={{ background: 'white', padding: '2rem' }}
      >
        <Title level={2} className="text-center mb-6">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </Title>

        {!loggedInUser ? (
          <>
            <Form
              name="auth-form"
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
            >
              {isRegister && (
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your full name"
                  />
                </Form.Item>
              )}

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Invalid email format' },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                />
              </Form.Item>

              {isRegister && (
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm password"
                  />
                </Form.Item>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                  className="rounded-lg"
                >
                  {isRegister ? 'Register' : 'Login'}
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-4">
              <Text>
                {isRegister ? 'Already have an account? ' : 'Don’t have an account? '}
              </Text>
              <Button
                type="link"
                onClick={() => setIsRegister(!isRegister)}
                style={{ padding: 0 }}
              >
                {isRegister ? 'Login' : 'Register'}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <Title level={3}>Hi, {loggedInUser.name || 'User'} 👋</Title>
            <p>You are already logged in.</p>
            <Button
              danger
              type="primary"
              size="large"
              onClick={() => {
                localStorage.removeItem('loggedInUser');
                setLoggedInUser(null);
                message.info('Logged out successfully.');
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
