import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import history from '../history';
import MarketCreate from './market/MarketCreate';
import MarketDelete from './market/MarketDelete';
import MarketEdit from './market/MarketEdit';
import MarketList from './market/MarketList';
import MarketShow from './market/MarketShow';
import Home from './home/HomePage';
import Chatroom from './Chatroom';

const App = () => {
    return (
        <div className="ui container">
        <Router history={history}>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/market" exact component={MarketList} />
                    <Route path="/market/new" exact component={MarketCreate} />
                    <Route path="/market/edit/:id" exact component={MarketEdit} />
                    <Route path="/market/delete/:id" exact component={MarketDelete} />
                    <Route path="/market/:id" exact component={MarketShow} />
                    <Route path="/chat" exact component={Chatroom} />
                </Switch>
            </div>
        </Router>
        </div>
    );
};
export default App;