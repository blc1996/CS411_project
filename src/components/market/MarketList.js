import './MarketList.css'
import React from 'react';
import { connect } from 'react-redux';
import MarketItemCard from './MarketItemCard';
import NevigationBar from '../NevigationBar';
import Filter from '../Filter';

import {changeTab} from '../../actions/headerAction';
import {getItems, fetchItems, deleteItem, editItem} from '../../actions/marketAction';

class MarketList extends React.Component {

    state = ({page: 0, dataList: [], mark:0, title:""});

//     fetch = async () => {
    //     const response = await listApi.get("/select");

//         this.setState({list: response.data});
  //   }

    componentDidMount () {
        this.props.changeTab(1);
        this.props.getItems(0);
    }

    componentDidUpdate (prevProps) {
        if(prevProps.marketList !== this.props.marketList){
            console.log(this.props.marketList.data);
            this.setState({dataList: this.props.marketList.data})
        }
    }

    deleteAction = async (id) => {
        this.props.deleteItem(id);
    }

    renderList = () => {
        return this.state.dataList.map(item => {
            var createrFlag = false;
            if(this.props.userId !== null && item.creater === this.props.userId.userId){
                createrFlag = true;
            }
            return <MarketItemCard
                key={item.id}
                id={item.id}
                image={item.image}
                description={item.description}
                date={item.date}
                price={item.price}
                title={item.title}
                createrFlag={createrFlag}
                deleteAction={this.deleteAction}
                editAction={this.editAction}
            />
        })
    }

    onChangeMark(newMark){
        this.setState({
            mark:newMark
        });
    }

    onChangeTitle(newTitle){
        this.setState({
            title:newTitle
        });
    }

    render () {
        return (
            <div>
                <Filter changeMark={this.onChangeMark.bind(this)} changeTitle={this.onChangeTitle.bind(this)}/>
                <div className="market-list" >
                    {this.renderList()}
                </div>
                <NevigationBar Mark = {this.state.mark} Title={this.state.title}/>
            </div>
        );
    } 
};

const mapStateToProps = (state) => {
    return {
        marketList: state.marketList,
        userId: state.auth.user
    }
}

export default connect(mapStateToProps, {changeTab, getItems, fetchItems, deleteItem, editItem})(MarketList);