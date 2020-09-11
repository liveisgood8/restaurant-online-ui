import React, { useState } from 'react';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { Form, Button } from 'react-bootstrap';

interface ILoginForm {
  onSubmit: (data: IAuthRequestBody) => void;
}

export const LoginForm: React.FC<ILoginForm> = ({ onSubmit: onSubmitProp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmitProp({
      email,
      password,
    });
  };
  
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Почтовый адрес</Form.Label>
        <Form.Control 
          required
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.currentTarget.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Пароль</Form.Label>
        <Form.Control 
          required
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.currentTarget.value)}
        />
      </Form.Group>
      <Button type="submit" variant="success">Войти</Button>
    </Form>
  )
};

