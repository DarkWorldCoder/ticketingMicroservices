import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../../hooks/use-request';
import styles from "./index.module.scss"
export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className={`${styles.main_container}`}>
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <hr></hr>
      <div className={`${styles.input_container}`}>
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className={`${styles.input_container}`}>
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className={`${styles.button}`}>Sign In</button>
    </form>
    </div>
  );
};
