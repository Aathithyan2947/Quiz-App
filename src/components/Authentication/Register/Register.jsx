import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Register/Register.css';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../../firebase/firebase-config';
import Loading from '../../../utils/Loading';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmpassword) {
      setLoading(false);
      setPassword('');
      setConfirmPassword('');
      setError('');
      return setError('Passwords do not match');
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await updateProfile(userCredential.user, {
          displayName: username,
        });

        console.log('Signed up successfully');
        localStorage.setItem('username', username);
        // Send email verification
        await sendEmailVerification(user);
        alert('Check your email and verify your account');
        setLoading(false);
        navigate('/');
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='Inclusive-register-page'>
      <div className='register-big-wrapper'>
        <div className='register-banner-section'>
          <div className='w-full d-flex justify-content-center'>
            <img src='./logo.png' alt='Logo' width='100' height='100' />
          </div>
          <h3>
            Achieve Your Dreams with Knowledge Infinty
            <br />
            <br />
            At Knowledge Infinty, we make success in competitive exams simple.
            With expert teachers, focused coaching, and a proven track record.{' '}
            <br />
            <br />
            we are here to help you reach your goals, Join our community of
            achievers and take the first step towards your bright future.
          </h3>
        </div>

        <div className='section-wrapper'>
          <div className='top-register-explain'>
            <h2>Registration</h2>
            <p>Enter your details to register</p>
          </div>

          <form onSubmit={registerHandler}>
            {error && <div className='error_message'>{error}</div>}
            <div className='input-wrapper'>
              <input
                type='text'
                required
                id='name'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor='name'>Username</label>
            </div>
            <div className='input-wrapper'>
              <input
                type='email'
                required
                id='email'
                placeholder='example@gmail.com'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />
              <label htmlFor='email'>E-mail</label>
            </div>
            <div className='input-wrapper'>
              <input
                type='password'
                required
                id='password'
                autoComplete='true'
                placeholder='6+ strong characters'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor='password'>Password</label>
            </div>
            <div className='input-wrapper'>
              <input
                type='password'
                required
                id='confirmpassword'
                autoComplete='true'
                placeholder='Confirm password'
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor='confirmpassword'>Confirm Password</label>
            </div>

            <button type='submit' className='btn text-white w-100'>
              Sign up
            </button>
            <div className='top-suggest_login'>
              <span>Have an account? </span>
              <a href='/'>Sign In</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
