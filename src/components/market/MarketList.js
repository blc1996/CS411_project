import './MarketList.css'
import React from 'react';
import { connect } from 'react-redux';
import MarketItemCard from './MarketItemCard';
import NevigationBar from '../NevigationBar';
import Filter from '../Filter';

import {changeTab} from '../../actions/headerAction';
import {fetchItems} from '../../actions/marketAction';

class MarketList extends React.Component {
    state = ({page: 1, list: []});

    // fetch = async () => {
    //     const response = await listApi.get("/select");

    //     this.setState({list: response.data});
    // }

    componentDidMount () {
        this.props.changeTab(1);
        this.props.fetchItems(1);
    }

    componentDidUpdate (prevProps) {
        if(prevProps.marketList !== this.props.marketList){
            // console.log(this.props, "*******27");
            this.setState({list: this.props.marketList.data})
        }
    }

    renderList = () => {
        return this.state.list.map(item => {
            return <MarketItemCard
                image={item.image}
                description={item.description}
                date={item.date}
                price={item.price}
                title={item.title}
            />
        })
    }

    render () {
        console.log(this.state.list);
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

const mapStateToProps = (state) => {
    return {
        marketList: state.marketList
    }
}

export default connect(mapStateToProps, {changeTab, fetchItems})(MarketList);