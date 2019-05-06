import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeTab} from '../../actions/headerAction';
import courseapi from '../../api/courseAPI';
import './ClassMainPage.css'
import './ClassMainPageShow.css';
import sqlApi from '../../api/sqlServer';

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
    typeB: ['#EFC1E3', '#B52F93'],
    typeC: ['#c9d358', '#d6e246'],
    typeD: ['#66d668', '#55d657'],
    typeE: ['#58bfd8', '#40b2ce']
  };
  
  const randomData = getRandomData();
  const nextType = {
    typeA: 'typeB',
    typeB: 'typeC',
    typeC: 'typeD',
    typeD: 'typeE',
    typeE: 'typeA'
  };
  
  const nextCourse = {
    CS225: 'CS241',
    CS241: 'ECE470',
    ECE470: 'CS411',
    CS411: 'ECE515',
    ECE515: 'TAM541',
    TAM541: 'ECE444',
    ECE444: 'KIN104',
    KIN104: 'CS225'
  };
  
  const drawModes = ['canvas', 'svg'];
  

class ClassMainPage extends Component {
    state = {
        drawMode: 0,
        data: randomData,
        colorType: 'typeA',
        value: false,
        course: 'CS225',
        name: 'CS225',
        recommendCourse: '',
        professor: "",
        items: []
      };

      grades = {
        0: "A+",
        1: "A",
        2: "A-",
        3: "B+",
        4: "B",
        5: "B-",
        6: "C+",
        7: "C",
        8: "C-",
        9: "D+",
        10: "D",
        11: "D-",
        12: "F",
        13: "W"
    } //emulated enum for grades

      async initialize() {
        const id =  (this.state.course === null) || (this.state.course === undefined) ? 'CS225' : this.state.course;
        console.log(id);
        var Subject = id.match(/[a-z|A-Z]+/gi)[0] === null ? "":  id.match(/[a-z|A-Z]+/gi)[0].toUpperCase();
        var Number = id.match(/\d+$/gi) === null ? 0 : id.match(/\d+$/gi)[0];
        console.log(Subject, Number);
        const response = await sqlApi.get(`/getCourseInfo?Subject=${Subject}&Number=${Number}`);
        const comments = await sqlApi.get(`/getCourseComment?courseid=${Subject}${Number}`);
        // console.log(comments);
        const data = response.data.data;
        if(data.length === 0){
            this.setState({loading: 2});
            return;
        }
        console.log(data);
        const total = this.dataMapping(data); 
        const reFill = this.getData(total);
        console.log(reFill);
        this.setState({name: id, data: reFill});
    }

    getData = (total) => {

        return (
            [
                {
                    x: 'W',
                    y: total[13].angle,
                    size: total[13].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'F',
                    y: total[12].angle,
                    size: total[12].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'D-',
                    y: total[11].angle,
                    size: total[11].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'D',
                    y: total[10].angle,
                    size: total[10].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'D+',
                    y: total[9].angle,
                    size: total[9].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                }, 
                {
                    x: 'C-',
                    y: total[8].angle,
                    size: total[8].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'C',
                    y: total[7].angle,
                    size: total[7].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'C+',
                    y: total[6].angle,
                    size: total[6].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'B-',
                    y: total[5].angle,
                    size: total[5].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'B',
                    y: total[4].angle,
                    size: total[4].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'B+',
                    y: total[3].angle,
                    size: total[3].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'A-',
                    y: total[2].angle,
                    size: total[2].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'A',
                    y: total[1].angle,
                    size: total[1].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                },
                {
                    x: 'A+',
                    y: total[0].angle,
                    size: total[0].angle * 10,
                    color: Math.random() * 10,
                    opacity: Math.random() * 0.5 + 0.5
                }
            ]
        );
      }

    dataMapping = (data) => {
        var total = [ {angle: 0, subLabel: "A+"},{angle: 0, subLabel:  "A"}, {angle: 0, subLabel: "A-"}, {angle: 0, subLabel: "B+"},{angle: 0, subLabel:  "B"}, {angle: 0, subLabel: "B-"}, {angle: 0, subLabel: "C+"},{angle: 0, subLabel:  "C"}, {angle: 0, subLabel: "C-"}, {angle: 0, subLabel: "D+"},{angle: 0, subLabel:  "D"}, {angle: 0, subLabel: "D-"},{angle: 0, subLabel:  "F"},{angle: 0, subLabel:  "W"}];
        for(var i = 0; i < data.length; i++){
            for(var j = 0; j < 14; j++){
                total[j].angle += data[i][this.grades[j]];
            }
        }
        return total;
    }

    componentDidMount () {
        console.log(this.props.match.params.id);
        this.props.changeTab(2);
        // this.submit();
    }


    submit = async (event) => {
        event.preventDefault();
        // console.log("123")
        console.log(this.state.recommendCourse)
        console.log(this.state.professor)
        // console.log("123")
        const response = await courseapi.post('/result', {
            course: this.state.recommendCourse,
            prof: this.state.professor

            // course: "Railroad Transportation Engrg",
            // prof: "BarkanChristopherP"
        })
        // console.log(response.data)
        
        var result = []
        for (var i in response.data) {
            // this.state.items.push(i);
            result.push(response.data[i])
        }        
        this.setState({items: result})
        this.initialize();
    }

    componentDidUpdate (){
      if(this.state.name !== this.state.course){ //when the uri changes, update the page
          console.log("here", this.props.match.params.id, this.state.id);
          this.initialize();
      }
    }

    render () {
        const {drawMode, data, colorType, course, name} = this.state;
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
            <div>

            <div>
                <center> <h1> FIND YOUR RIGHT COURSE </h1> 
                <form onSubmit={this.submit} class = "recommend">
                    <label>
                    <input type="text" name="course" placeholder="Enter Course Name"
                        value={this.state.recommendCourse}
                        onChange={(e) => this.setState({ recommendCourse: e.target.value })} 
                        onClick={(e) => this.setState({ recommendCourse: e.target.value })} />
                    </label>
                    <label>
                    <input type="text" name="prof" placeholder="Enter Professor Name"
                        value={this.state.professor}
                        onChange={(e) => this.setState({ professor: e.target.value })} 
                        onClick={(e) => this.setState({ professor: e.target.value })} />
                    </label>
                    
                    <button class="button">Recommend</button>
                </form>


                <table>
                  <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Professor</th>
                        <th>Couse Number</th>
                    </tr>
                  </thead>
                {this.state.items.map(i => {
                    return(
                    <tbody>
                        <tr>
                            <td>{i.course}</td>  
                            <td>{i.professor}</td>  
                            <td>{i.department}</td>
                        </tr>
                    </tbody>
                        )
                })}
                </table>
                </center>
            </div>

            <div className="canvas-wrapper">
                <div className="attention-segment">
                <div className = "ui placeholder segment">                   
                    <i className = {`top-right big ${iconName} icon`} />
                    <h3>Use search bar on the top right for a specific class!</h3>                                                 
                </div>
            </div> 
           
            <div className = "ui placeholder segment">                  
                <div className="canvas-example-controls">
                    <h1>{`${course} Grades Distribution`}</h1>
                    <button className="ui button primary" onClick={() => this.setState({course: nextCourse[course], colorType: nextType[colorType]})}>
                    Random   
                    </button>
                </div>
                <XYPlot
                    xType = "ordinal"
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
            </div>   

        </div>
        )
       
    }
}
// export default ClassMainPage;
export default connect(null, {changeTab})(ClassMainPage);