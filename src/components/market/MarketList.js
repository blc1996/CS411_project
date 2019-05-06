import './MarketList.css'
import React from 'react';
import { connect } from 'react-redux';
import MarketItemCard from './MarketItemCard';
import NevigationBar from '../NevigationBar';
import Filter from '../Filter';

import {changeTab} from '../../actions/headerAction';
import {getItems, fetchItems, deleteItem, editItem} from '../../actions/marketAction';
import sqlApi from '../../api/sqlServer'

class MarketList extends React.Component {

    state = ({page: 0, dataList: [], mark:0, title:"", size:0});

//     fetch = async () => {
    //     const response = await listApi.get("/select");

//         this.setState({list: response.data});
  //   }

    componentDidMount () {
        this.props.changeTab(1);
        this.props.getItems(0);
        sqlApi.get(`/getSize`).then(res => {
            const tempItem = res.data.data[0] === undefined ? {} : res.data.data[0];
            this.setState({size: tempItem.SIZE});
            console.log(this.state.size);
        })
    }

    componentDidUpdate (prevProps) {
        if(prevProps.marketList !== this.props.marketList){
            console.log(this.props.marketList.data);
            this.setState({dataList: this.props.marketList.data})
            sqlApi.get(`/fetchSize?title=${this.state.title}`).then(res => {
                const tempItem = res.data.data[0] === undefined ? {} : res.data.data[0];
                this.setState({size: tempItem.SIZE});
                console.log(this.state.size);
            })
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
                createrFlag={false}
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
                <NevigationBar Mark = {this.state.mark} Size={this.state.size} Title ={this.state.title}/>
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