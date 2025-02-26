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
import Connection from './components/ConnectionPage';
import ConnectionResults from './components/ConnectionResult';
import Whatsapp from './components/WhatsappPage';
import WhatsappResults from './components/WhatsappResult';
import Email from './components/EmailPage';
import EmailResults from './components/EmailResult';

function App() {
  return (
    <div>
      <BrowserRouter >
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}

          {/* <Route path='/' element={}></Route> */}
          <Route path='/' element={<PrivateRoute><CampaignResults /> </PrivateRoute>}></Route>
          <Route path='/:id' element={<PrivateRoute><SearchResults /></PrivateRoute>}></Route>
          <Route path='/queue' element={<PrivateRoute><Queue /></PrivateRoute>}></Route>
          <Route path='/queue/fetch/:id' element={<PrivateRoute><QueueResults /></PrivateRoute>}></Route>
          <Route path='/connection' element={<PrivateRoute><Connection /></PrivateRoute>}></Route>
          <Route path='/connection/:id' element={<PrivateRoute><ConnectionResults /></PrivateRoute>}></Route>
          <Route path='/whatsapp' element={<PrivateRoute><Whatsapp /></PrivateRoute>}></Route>
          <Route path='/whatsapp/:id' element={<PrivateRoute><WhatsappResults /></PrivateRoute>}></Route>
          <Route path='/email' element={<PrivateRoute><Email /></PrivateRoute>}></Route>
          <Route path='/email/:id' element={<PrivateRoute><EmailResults /></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
