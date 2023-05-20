import './App.css';

import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import Editor from './componet/Editor';
// import SideNavBar from './component/SideNavBar/SideNavBar.js';




function App() {
  return (
    <Router>
    <Routes>
    <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`}/>}/>
    <Route path='/docs/:id' element={ <Editor/> } />
    {/* <Route path='/docs/:id' element={ <SideNavBar/> } /> */}
    </Routes>
    </Router>
    
  );
}


export default App;
