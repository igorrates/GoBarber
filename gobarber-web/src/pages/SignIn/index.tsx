import { SigningOptions } from 'crypto';
import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';

import Input from '../../components/input';
import Button from '../../components/button';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <>
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form action="">
          <h1>Sign In</h1>
          <Input icon={FiMail} name="email" type="email" placeholder="Email" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Enter</Button>
          <a href="forgot">Forgot Password</a>
        </form>

        <a href="create">
          <FiLogIn />
          Sign Up
        </a>
      </Content>

      <Background />
    </Container>
  </>
);

export default SignIn;
