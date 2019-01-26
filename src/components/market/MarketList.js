import './MarketList.css'
import React from 'react';
import { connect } from 'react-redux';
import MarketItemCard from './MarketItemCard';
import NevigationBar from '../NevigationBar';
import Filter from '../Filter';

import {changeTab} from '../../actions/headerAction';

class MarketList extends React.Component {
    state = ({cards: []});

    componentDidMount () {
        this.props.changeTab(1);
        this.setState({cards:[1, 1, 1, 1, 1, 1, 1, 1]});
    }

    renderList = () => {
        return this.state.cards.map(card => {
            return <MarketItemCard />
        })
    }

    render () {
        return (
            <div>
                <Filter />
                <div className="market-list" >
                    {this.renderList()}
                </div>
                <NevigationBar />
            </div>
        );
    } 
};

export default connect(null, {changeTab})(MarketList);