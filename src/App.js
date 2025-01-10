import CampaignResults from './components/Campaigns';
import Header from './components/Headers';
import SearchResults from './components/SearchResult';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter,
  Routes
} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter >
        <Header />
        <Routes>
          {/* <Route path='/' element={}></Route> */}
          <Route path='/' element={<CampaignResults />}></Route>
          <Route path='/:id' element={<SearchResults />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
