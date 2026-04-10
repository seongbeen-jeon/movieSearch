import './style.css';
import Home from './pages/Home.jsx';
import Detail from './pages/Detail.jsx';
import {Routes,Route} from 'react-router-dom';
import Layout from './Layout.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
      </Route>
    </Routes>
  )
}

export default App
