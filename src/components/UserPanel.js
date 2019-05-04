import './UserPanel.css'
import '../components/market/MarketList.css'
import React from 'react';
import sqlApi from '../api/sqlServer'
import MarketItemCard from '../components/market/MarketItemCard'
import ClassCommentCard from '../components/class/ClassCommentCard'
import { connect } from 'react-redux';

class UserPanel extends React.Component {
    state = {itemList: [], commentList: [], tab: [1, 0]};

    componentDidMount () {
        this.fetchInfo();
    }

    fetchInfo = async () => {
        const itemList = await sqlApi.get(`/fetchUserItems?id=${this.props.auth.user.userId}`);
        const commentList = await sqlApi.get(`/getUserComments?id=${this.props.auth.user.userId}`);
        this.setState({itemList: itemList.data.data, commentList: commentList.data.data});
        console.log(this.state.itemList, this.state.commentList);
    }

    renderContent = () => {
        if(this.state.tab[0] === 1){
            return this.state.itemList.map(item => {
                return <MarketItemCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    description={item.description}
                    date={item.date}
                    price={item.price}
                    title={item.title}
                    createrFlag={true}
                    deleteAction={this.deleteAction}
                    editAction={this.editAction}
                />
            })
        }else{
            return this.state.commentList.map(comment => {
                return <ClassCommentCard time={comment.time} workload={comment.workload} difficulty={comment.difficulty} comment={comment.comment} title={comment.title} />
            })
        }
    }

    render () {
        const tabStatus = this.state.tab.map(t => {
            if(t === 1){
                return "active item";
            }else{
                return "item"
            }
        })
        return (
            <div>
                <header className="panel-header">
                    <div className="info-left">
                        <img className="ui tiny circular image" src={this.props.auth.user.imageUrl} alt="placeholder" />
                    </div>
                    <div className="info-right">
                        <p>{this.props.auth.user.userName}</p>
                        <p>email: {this.props.auth.user.email}</p>
                        <button className="ui button">Edit profile</button>
                        <h3>{this.state.itemList.length} items | {this.state.commentList.length} comments</h3>
                    </div>
                </header>
                <div className="ui two item menu">
                    <a className={tabStatus[0]} onClick={() => this.setState({tab: [1, 0]})} >Items</a>
                    <a className={tabStatus[1]} onClick={() => this.setState({tab: [0, 1]})} >Comments</a>
                </div>
                <div className="market-list" >
                    {this.renderContent()}
                </div>
            </div>
        );
    } 
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, {})(UserPanel);

