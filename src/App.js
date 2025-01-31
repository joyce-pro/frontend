import CampaignResults from './components/Campaigns';
import Navbar from './components/Navbar';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import SearchResults from './components/SearchResult';
import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom'
import Signup from './components/Signup';
import Queue from './components/Queue';
import QueueResults from './components/QueueResult';

function App() {
  return (
    <div>
      <BrowserRouter >
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* <Route path='/' element={}></Route> */}
          <Route path='/' element={<PrivateRoute><CampaignResults /> </PrivateRoute>}></Route>
          <Route path='/:id' element={<PrivateRoute><SearchResults /></PrivateRoute>}></Route>
          <Route path='/queue' element={<PrivateRoute><Queue /></PrivateRoute>}></Route>
          <Route path='/queue/fetch/:id' element={<PrivateRoute><QueueResults /></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
