import React from 'react';

class ClassCommentCard extends React.Component {
    render () {
        return (
            <div className="ui card">
            <div className="content">
                <div className="header">{this.props.title}</div>
                <div className="meta">{this.props.time}</div>
                <div className="description">
                {/* data percentage should be 100 - width to relect correct color */}
                <div className="ui indicating progress" data-percent={`${11-this.props.difficulty}0`}>
                    <div className="bar" style={{transitionDuration: "300ms", width: `${this.props.difficulty}0%`}}></div>
                    <div className="label">Difficulty Level</div>
                </div>
                <div className="ui indicating progress" data-percent={`${11-this.props.workload}0`}>
                    <div className="bar" style={{transitionDuration: "300ms", width: `${this.props.workload}0%`}}></div>
                    <div className="label">Workload</div>
                </div>
                <p>{this.props.comment}</p>
                </div>
            </div>
            <div className="extra content">
                <i className="check icon"></i>
                2 Votes
            </div>
            </div>
        )
    }
}

export default ClassCommentCard;