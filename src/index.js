import React from 'react';
import ReactDOM from 'react-dom';
import './css/normalize.css';
import './index.css';
import './css/header.css';
import './css/aside.css';
import './css/topnav.css';
import './css/cont.css';
import './css/adaptiv.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'

const zzz = (                                           
    <BrowserRouter>                                    
        <App />                                        
    </BrowserRouter>                                   
)                                                      

ReactDOM.render(zzz, document.getElementById('root'));
registerServiceWorker();
