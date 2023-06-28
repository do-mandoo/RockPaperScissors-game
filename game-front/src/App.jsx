// import { useState } from 'react';
// import LoginForm from './Login';
// import SignupForm from './Signup';
// // import './App.css';

// const App = () => {
//   const [isLogin, setIsLogin] = useState(false);

//   const handleSignUpClick = (nickname, password) => {
//     // 회원가입 로직을 구현한 후 로그인 창으로 전환합니다.
//     console.log('회원가입:', nickname, password);
//     setIsLogin(true);
//   };

//   const handleLoginClick = (nickname, password) => {
//     // 로그인 로직을 구현합니다.
//     console.log('로그인:', nickname, password);
//   };

//   return (
//     <div>
//       {isLogin ? (
//         <LoginForm onLoginClick={handleLoginClick} />
//       ) : (
//         <SignupForm onSignUpClick={handleSignUpClick} />
//       )}
//     </div>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupForm from './Signup';
import LoginForm from './Login';
import Gaming from './Gaming';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to='/signup'>회원가입</Link>
          </li>
          <li>
            <Link to='/login'>로그인</Link>
          </li>
          <li>
            <Link to='/game'>게임하기</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/game' element={<Gaming />} />
      </Routes>
    </Router>
  );
};

export default App;
