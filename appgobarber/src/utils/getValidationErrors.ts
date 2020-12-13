import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErros(errs: ValidationError): Errors {
  const validationErrors: Errors = {};

  errs.inner.forEach(err => {
    validationErrors[err.path!] = err.message;
  });

  return validationErrors;
}
