import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={ Login } />
        <Route path="/carteira" Component={ Wallet } />
      </Routes>
    </div>
  );
}

export default App;
