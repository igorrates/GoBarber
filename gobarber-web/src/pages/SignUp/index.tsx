import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/input';
import Button from '../../components/button';

import logoImg from '../../assets/logo.svg';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('Email is required')
            .email('Email invalid'),
          password: Yup.string().min(6, 'Not enough characters'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('./users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Successfully registered',
          description: 'You can login now',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Could not sign you up',
          description: 'An error has ocurred, try again',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
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
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Back
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SingUp;
