// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes,/*  Navigate */ } from 'react-router-dom';
import { AuthProvider, /* useAuth */ } from './context/auth-context';
import Layout from './layout/layout';
import Login from './components/users/login';
import MainContent from './components/main.content';
import Register from './components/users/register';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          <Route path="/" element={<Layout><MainContent /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

/* const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
 */
export default App;
