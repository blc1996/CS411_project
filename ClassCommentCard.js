import React from 'react';

class ClassCommentCard extends React.Component {
    render () {
        return (
            <div className="card-display">
                <div className="ui card">
                <div className="content">
                    <div className="header">{this.props.title}</div>
                    <div className="meta">{this.props.time}</div>
                    <div className="description">
                    {/* data percentage should be 100 - width to relect correct color */}
                    <div class="ui indicating progress" data-percent={`${11-this.props.difficulty}0`}>
                        <div class="bar" style={{transitionDuration: "300ms", width: `${this.props.difficulty}0%`}}></div>
                        <div class="label">Difficulty Level</div>
                    </div>
                    <div class="ui indicating progress" data-percent={`${11-this.props.workload}0`}>
                        <div class="bar" style={{transitionDuration: "300ms", width: `${this.props.workload}0%`}}></div>
                        <div class="label">Workload</div>
                    </div>
                    <p>{this.props.comment}</p>
                    </div>
                </div>
                <div className="extra-content">
                    <i className="check icon"></i>           
                    <div>{`${parseInt(Math.random() * 100)} votes`}</div>
                </div>
                </div>
            </div>
            
        )
    }
}

export default ClassCommentCard;