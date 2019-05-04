import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeTab} from '../../actions/headerAction';
import './ClassMainPageShow.css';

import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries,
    MarkSeriesCanvas,
    Hint
  } from 'react-vis';
  
  function getRandomData() {
    return new Array(100).fill(0).map(row => ({
      x: Math.random() * 10,
      y: Math.random() * 20,
      size: Math.random() * 10,
      color: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.5
    }));
  }
  const colorRanges = {
    typeA: ['#59E4EC', '#0D676C'],
    typeB: ['#EFC1E3', '#B52F93']
  };
  
  const randomData = getRandomData();
  const nextType = {
    typeA: 'typeB',
    typeB: 'typeA'
  };
  
  const nextModeContent = {
    canvas: 'SWITCH TO SVG',
    svg: 'SWITCH TO CANVAS'
  };
  
  const drawModes = ['canvas', 'svg'];
  

class ClassMainPage extends Component {

    state = {
        drawMode: 0,
        data: randomData,
        colorType: 'typeA',
        value: false
      };
    componentDidMount () {
        this.props.changeTab(2);
    }

    render () {
        const {drawMode, data, colorType} = this.state;
        const markSeriesProps = {
            animation: true,
            className: 'mark-series-example',
            sizeRange: [5, 15],
            seriesId: 'my-example-scatterplot',
            colorRange: colorRanges[colorType],
            opacityType: 'literal',
            data,
            onNearestXY: value => this.setState({value})
        };
    
        const mode = drawModes[drawMode];
        const iconName = 'hand point up';
        return (
            <div className="canvas-wrapper">
                <div className = "ui placeholder segment">
                    <div className = "ui icon header">
                        <i className = {`top-right massive ${iconName} icon`} />
                        <h1>Use search bar on the top right for a specific class!</h1>
                       
                    </div> 
                    
                </div>
                
                   
                <div className="canvas-example-controls">
                    <div>{`Grades Distribution`}</div>
                </div>
                <XYPlot
                    onMouseLeave={() => this.setState({value: false})}
                    width={1100}
                    height={500}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    {mode === 'canvas' && <MarkSeriesCanvas {...markSeriesProps} />}
                    {mode === 'svg' && <MarkSeries {...markSeriesProps} />}
                    {this.state.value ? <Hint value={this.state.value} /> : null}
                </XYPlot>
                
            </div>

            
        );
       
    }
}
// export default ClassMainPage;
export default connect(null, {changeTab})(ClassMainPage);