import { RouterProvider } from 'react-router-dom';
import './App.css'
import router from './router';
import QueryProvider from './components/query-provider';
import { UserAuthProvider } from './context/useVotedLatestContext';

function App() {
  return (
    <QueryProvider>
      <UserAuthProvider>
        <RouterProvider router={router} />
      </UserAuthProvider>
    </QueryProvider>
  )
}

export default App
