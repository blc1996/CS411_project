import React from 'react';

class ScoreInput extends React.Component {
    state = {colors: ["teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal"]}
    initialColors = ["teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal"];

    callBack = (id, onChange) => {
        var currentColors = [...this.initialColors];
        currentColors[id] = "blue";
        this.setState({colors: currentColors});
        onChange(id);
    }

    render () {
        const { input: { onChange }, label } = this.props;
        const errInfo = this.props.meta.touched ? this.props.meta.error : "";
        const errIndicator = errInfo && this.props.meta.touched ? "error" : "";
        return (
            <div className={`field ${errIndicator}`}>
                <label>{label}</label>
                {errInfo}
                <br></br>
                <a className={`ui ${this.state.colors[1]} circular label`} onClick={() => {this.callBack(1, onChange)}} >1</a>
                <a className={`ui ${this.state.colors[2]} circular label`} onClick={() => {this.callBack(2, onChange)}} >2</a>
                <a className={`ui ${this.state.colors[3]} circular label`} onClick={() => {this.callBack(3, onChange)}} >3</a>
                <a className={`ui ${this.state.colors[4]} circular label`} onClick={() => {this.callBack(4, onChange)}} >4</a>
                <a className={`ui ${this.state.colors[5]} circular label`} onClick={() => {this.callBack(5, onChange)}} >5</a>
                <a className={`ui ${this.state.colors[6]} circular label`} onClick={() => {this.callBack(6, onChange)}} >6</a>
                <a className={`ui ${this.state.colors[7]} circular label`} onClick={() => {this.callBack(7, onChange)}} >7</a>
                <a className={`ui ${this.state.colors[8]} circular label`} onClick={() => {this.callBack(8, onChange)}} >8</a>
                <a className={`ui ${this.state.colors[9]} circular label`} onClick={() => {this.callBack(9, onChange)}} >9</a>
                <a className={`ui ${this.state.colors[10]} circular label`} onClick={() => {this.callBack(10, onChange)}} >10</a>
            </div>
        )
    }
}
            
export default ScoreInput;