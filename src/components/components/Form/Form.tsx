'use client'

import { FormEvent, useState } from 'react';
import styles from './Form.module.scss';
import classNames from 'classnames';

import { checkFormField } from '../../utils/checkFormFields';
import { form } from '../../services/public/form';
import { FormFields } from '../../types/FormFields';
import { Loader } from '../Loader';

export const Form = () => {
  const [field, setField] = useState<FormFields>({
    email: '',
    subject: '',
    isVolunteer: false,
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const hasErrors = (errors: {[key: string]: string}) => Object.values(errors).some((value: string) => value.length > 0);
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateInput = (currentField: string, newValue: string | boolean) => {
    setField(prevState => ({ ...prevState, [`${currentField}`]: newValue }));
    setErrors({
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedField = {
      email: field.email.trim(),
      subject: field.subject.trim(),
      message: field.message.trim(),
    };

   
    const currentErrors = checkFormField(normalizedField);
    setErrors(currentErrors);
    const checkErrors = hasErrors(currentErrors);

    if (checkErrors) {
      return;
    }

    setLoading(true);
    form
      .post({ ...normalizedField, isVolunteer: field.isVolunteer })
      .then(() => {
        setField({
          email: '',
          subject: '',
          isVolunteer: false,
          message: '',
        });
      })
      .catch(() => {
        setFormError(true);
        setTimeout(() => {
          setFormError(false);
        }, 5000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className={styles.container} id="contact-form">
      <h2 className={`${styles.header} heading--h2`}>Contact Us</h2>
      <form
        className="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">
          Your email adress
          <br />
          <input
            className={classNames(`formField`, {
              formField__notValid: errors.email,
            })}
            value={field.email}
            onChange={e => {
              updateInput('email', e.target.value);
            }}
            type="email"
            name="email"
            id="email"
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="formField__notValid--text">{errors.email}</p>
          )}
        </label>

        <label htmlFor="suject">
          Subject
          <br />
          <input
            type="text"
            name="suject"
            className={classNames(`formField`, {
              formField__notValid: errors.subject,
            })}
            value={field.subject}
            onChange={e => {
              updateInput('subject', e.target.value);
            }}
            id="suject"
            placeholder="Type the subject"
          />
          {errors.subject && (
            <p className="formField__notValid--text">{errors.subject}</p>
          )}
        </label>

        <div className="form__checkbox--label">
          <input
            type="checkbox"
            name="volunteer"
            id="volunteer"
            defaultChecked={field.isVolunteer}
            className={styles.checkbox}
            onChange={() => updateInput('isVolunteer', !field.isVolunteer)}
          />
          <label htmlFor="volunteer" >I want to become your volunteer</label>
        </div>
        <label htmlFor="messageText">
          Message
          <br />
          <textarea
            className={classNames(`form__textArea formField`, {
              formField__notValid: errors.message,
            })}
            placeholder="Type your message..."
            value={field.message}
            onChange={e => {
              updateInput('message', e.target.value);
            }}
          ></textarea>
          {errors.message && (
            <p className="formField__notValid--text">{errors.message}</p>
          )}
          <p className={styles.text}>
            Please enter the details of your request. A member of our support
            staff will respond as soon as possible.
          </p>
        </label>
        {loading && (
          <div className={styles.button}>
            <Loader />
          </div>
        )}
        {!loading && formError && (
          <div className={styles.button}>
            <p className="formField__notValid--text">
              Something went wrong! Try again later!
            </p>
          </div>
        )}
        {!loading && !formError && (
          <button
            type="submit"
            className={`button button--yellow form__button button--secondary`}
            disabled={hasErrors(errors)}
          >
            <p>SUBMIT</p>
            <div className="icon icon--button icon--send icon--send--black"></div>
          </button>
        )}
      </form>
    </section>
  );
};
