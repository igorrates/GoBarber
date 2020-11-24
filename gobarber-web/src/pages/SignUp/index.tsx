import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Container, Content, Background } from './styles';

import Input from '../../components/input';
import Button from '../../components/button';

import logoImg from '../../assets/logo.svg';

const SingUp: React.FC = () => (
  <>
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form action="">
          <h1>Sign Up</h1>
          <Input icon={FiUser} name="name" type="text" placeholder="Name" />
          <Input icon={FiMail} name="email" type="text" placeholder="Email" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Save</Button>
        </form>

        <a href="create">
          <FiArrowLeft />
          Back
        </a>
      </Content>
    </Container>
  </>
);

export default SingUp;
