import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.js';
import { NotificationProvider } from './context/NotificationContext.js';
import Notification from './components/Notification/Notification.js';

import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';

import Header from './components/Header/Header.js';
import Home from './components/Home/Home.js';
import List from './components/Bikes/List/List.js';
import Create from './components/Bikes/Crate/Create.js';
import Details from './components/Bikes/Details/Details.js';
import Edit from './components/Bikes/Edit/Edit.js';

import SendMessage from './components/Conversations/SendMessage/SendMessage.js';
import Inbox from './components/Conversations/Inbox/Inbox.js';
import DetailsConversation from './components/Conversations/DetailsConversation/DetailsConversation.js';

import ErrorPage from './components/ErrorPage/ErrorPage.js';

import './App.css'

function App() {
 
  return (
    <AuthProvider>
    <NotificationProvider>  

    <div className='container'>
      
      <Header />
      <Notification />

      <div id="main-container">
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list/" element={<List />} />
            <Route path="/list/create" element={<Create />} />
            <Route path="/list/:bikeId" element={<Details />} />
            <Route path="/list/edit/:bikeId" element={<Edit />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/conversations/:username/send-message/:receiverUsername/:itemTitle" element={<SendMessage />} />
            <Route path="/conversations/:username" element={<Inbox />} />
            <Route path="/conversations/:username/:conversationId" element={<DetailsConversation />} />

            <Route path="*" element={<ErrorPage />} />

          </Routes>
        
      </div>

      <footer>
        <p>@ React Project Buy and Sell Bikes</p>
      </footer> 
    </div>
    </NotificationProvider> 
    </AuthProvider>
  );
}

export default App;
