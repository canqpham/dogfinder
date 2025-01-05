import { RouterProvider } from 'react-router-dom';
import './App.css'
import router from './router';
import QueryProvider from './components/query-provider';

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}

export default App
