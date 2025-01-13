import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../../firebase/firebase-config';
import Loading from '../../../utils/Loading';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User details:', user); // Inspect the user object
        if (user.emailVerified) {
          alert('Email is verified');
        } else {
          console.log('Email is not verified');
        }
      } else {
        console.log('No user is signed in');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const loginHandler = async (e) => {
    setError('');
    e.preventDefault();
    try {
      setLoading(true);
      // localStorage.setItem("authToken", data.token);
      if (email === 'admin@gmail.com' || email === 'aathireguraj@gmail.com') {
        const res = await signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            localStorage.setItem('user_id', auth.currentUser.uid);
            setLoading(false);
            navigate('/admindash');
          })
          .catch((err) => {
            setError('Provide valid credentials');
            setLoading(false);
            console.log(err);
          });
        console.log(res);
      } else {
        const res = await signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            localStorage.setItem('user_id', auth.currentUser.uid);
            setLoading(false);
            navigate('/user');
          })
          .catch((err) => {
            setError('Provide valid credentials');
            setLoading(false);
            console.log(err);
          });
        console.log(res);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const forgetPassword = async () => {
    try {
      if (email) {
        await sendPasswordResetEmail(auth, email);
        alert('check the email has been sent');
      } else {
        alert('Enter the email to proceed to with forget password');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className='Inclusive-login-page'>
      <div className='login-big-wrapper row'>
        <div className='col-md-6 section-wrapper'>
          <div className='top-login-explain'>
            <h2>Login to Your Account </h2>
            <p>Please Login Your Account, Thank You!</p>
          </div>
          <form onSubmit={loginHandler}>
            {error && <div className='error_message'>{error}</div>}
            <div className='input-wrapper'>
              <input
                type='email'
                required
                id='email'
                placeholder='example@gmail.com'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
                className='form-control mb-3'
              />
              <label htmlFor='email'>E-mail</label>
            </div>
            <div className='input-wrapper'>
              <input
                type='password'
                required
                id='password'
                autoComplete='true'
                placeholder='6+ strong character'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
                className='form-control mb-3'
              />
              <label htmlFor='password'>Password</label>
            </div>
            <div
              onClick={forgetPassword}
              className='login-screen__forgotpassword'
            >
              Forgot Password?
            </div>
            <button type='submit' className='btn text-white w-100 mt-3'>
              Login
            </button>
            <div className='top-suggest_register'>
              <span>Dont have an account? </span>
              <a href='/register'>Sign Up</a>
            </div>
          </form>
        </div>

        <div className='col-md-6 login-banner-section'>
          <center>
            <img src='./logo.png' alt='Logo' width='100' height='100' />
          </center>
          <h3>
            Achieve Your Dreams with Knowledge Infinity
            <br />
            <br />
            At Knowledge Infinity, we make success in competitive exams simple.
            With expert teachers, focused coaching, and a proven track record.
            <br />
            <br />
            We’re here to help you reach your goals. Join our community of
            achievers and take the first step towards your bright future.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
