import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../node_modules/react-vis/dist/style.css';
import {RadialChart} from 'react-vis';
import sqlApi from '../../api/sqlServer';
import {changeTab} from '../../actions/headerAction';
import ClassCommentCard from './ClassCommentCard';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  MarkSeriesCanvas,
  Hint
} from 'react-vis'

function getRandomData() {
    return new Array(100).fill(0).map(row => ({
      x: Math.random() * 10,
      y: Math.random() * 20,
      size: Math.random() * 10,
      color: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.5
    }));
  }
  
  const randomData = getRandomData();

  const colorRanges = {
    typeA: ['#59E4EC', '#0D676C'],
    typeB: ['#EFC1E3', '#B52F93']
  };
  
  const nextType = {
    typeA: 'typeB',
    typeB: 'typeA'
  };
  
  const nextModeContent = {
    canvas: 'SWITCH TO SVG',
    svg: 'SWITCH TO CANVAS'
  };
  
  const drawModes = ['canvas', 'svg'];


class ClassShow extends Component {
    state = {tabState: [1, 0, 0], courseInfo: [], loading: 1, figure: [], teacherSelectionBar: false, comments: [], drawMode: 0,
        figure: randomData,  colorType: 'typeB',
        value: false}; 
    //loading: 0=successful, 1=loading, 2=no such course

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
        const id = this.props.match.params.id;
        var Subject = id.match(/[a-z|A-Z]+/gi)[0] === null ? "":  id.match(/[a-z|A-Z]+/gi)[0].toUpperCase();
        var Number = id.match(/\d+$/gi) === null ? 0 : id.match(/\d+$/gi)[0];
        console.log(Subject, Number);
        const response = await sqlApi.get(`/getCourseInfo?Subject=${Subject}&Number=${Number}`);
        const comments = await sqlApi.get(`/getCourseComment?courseid=${Subject}${Number}`);
        console.log(comments);
        const data = response.data.data;
        if(data.length === 0){
            this.setState({loading: 2});
            return;
        }
        console.log(data);
        const total = this.dataMapping(data); 
        const reFill = this.getData(total);
        this.setState({courseInfo: data, loading: false, figure: total, Subject: data[0].Subject, Number: data[0].Number, id: Subject+Number, comments: comments.data.data, figure: reFill});
    }

    getData = (total) => {
        return (
            {
                x: 14 - total[0].subLabel,
                y: total[0].angle,
                size: total[0].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[1].subLabel,
                y: total[1].angle,
                size: total[1].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[2].subLabel,
                y: total[2].angle,
                size: total[2].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[3].subLabel,
                y: total[3].angle,
                size: total[3].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[4].subLabel,
                y: total[4].angle,
                size: total[4].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[5].subLabel,
                y: total[5].angle,
                size: total[5].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[6].subLabel,
                y: total[6].angle,
                size: total[6].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[7].subLabel,
                y: total[7].angle,
                size: total[7].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[8].subLabel,
                y: total[8].angle,
                size: total[8].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[9].subLabel,
                y: total[9].angle,
                size: total[9].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[10].subLabel,
                y: total[10].angle,
                size: total[10].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[11].subLabel,
                y: total[11].angle,
                size: total[11].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[12].subLabel,
                y: total[12].angle,
                size: total[12].angle * 10,
                color: 10,
                opacity: 1000
            },
            {
                x: 14 - total[13].subLabel,
                y: total[13].angle,
                size: total[13].angle * 10,
                color: 10,
                opacity: 1000
            }
        
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

    componentDidUpdate (){
        if(this.props.match.params.id.toUpperCase() !== this.state.id){ //when the uri changes, update the page
            console.log("here", this.props.match.params.id, this.state.id);
            this.initialize();
        }
    }

    componentDidMount () {
        console.log(this.props.match.params.id);
        this.props.changeTab(2);
        this.initialize();
    }

    mapSpecificTeacherData = (teacher) => {
        console.log(teacher);
        if(teacher === "All teachers"){
            const total = this.dataMapping(this.state.courseInfo);
            return total;
        }else{
            const select = (self) =>{
                return self["Primary Instructor"] === teacher;
            }
            const data = this.state.courseInfo.filter(select);
            const total =this.dataMapping(data);
            return total;
        }
    }

    renderTeacherList = () => {
        const distinct = (value, index, self) =>{
            return self.indexOf(value) === index;
        }
        var teachers = this.state.courseInfo.map(course => {
            return course["Primary Instructor"];
        })
        teachers = teachers.filter(distinct);
        teachers.splice(0, 0, "All teachers");
        return teachers.map(teacher => {
            return (
                <div className="item" data-value={`${teacher}`}  
                    onClick={() => {
                        const total = this.mapSpecificTeacherData(teacher);
                        const reFill = this.getData(total);
                        this.setState({figure: total, figure: reFill})
                    }}>
                    {teacher}
                </div>
            )
        })
    }

    teacherSelectDropDown = () => {
        var status = ["", ""];
        if(this.state.teacherSelectionBar){
            status = ["active visible", "transition visible"];
        }
        return (
            <div>
                <div className={`ui fluid selection dropdown ${status[0]}`} 
                    onClick={() => {this.setState({teacherSelectionBar: !this.state.teacherSelectionBar})}}
                >
                <input type="hidden" name="user"/>
                <i className="dropdown icon"></i>
                <div className="default text">Select Teacher</div>
                <div className={`menu ${status[1]}`}>
                    
                    {this.renderTeacherList()}
                </div>
                </div>
            </div>
        )
    }

    renderCourseInfo = () => {
        if(this.state.loading === 2){
            return(
                <div>Invalid Course Number</div>
            )
        }else{
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

            return (                
            <div className="r">
                {this.teacherSelectDropDown()}
                <div className="canvas-wrapper">
                    <div>{`MODE: ${mode}`}</div>
                    <XYPlot
                        data = {this.state.figure}
                        onMouseLeave={() => this.setState({value: false})}
                        width={600}
                        height={300}
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
            );
        }
    }

    renderComments = () => {
        const UserComments = this.state.comments.map(comment => {
            return <ClassCommentCard time={comment.time} workload={comment.workload} difficulty={comment.difficulty} comment={comment.comment} title={comment.title} />
        })
        return UserComments;
    }

    render(){
        //different status of each tab
        const tabs = this.state.tabState.map(tab => {
            if(tab === 1){
                if(this.state.loading === 1){
                    return "loading";
                }else{
                    return "active";
                }
            }else{
                return "";
            }
        })
        return (
            <div>
                <h1>{this.state.Subject+this.state.Number}</h1>
                <a href={`/class/${this.state.id}/addComment`} class="ui blue button">Add a Comment</a>
                <div className="ui top attached tabular menu">
                    <a className={`item ${tabs[0]}`} data-tab="GPA" onClick={() => {this.setState({tabState: [1, 0, 0]})}} >GPA</a>
                    <a className={`item ${tabs[1]}`} data-tab="Comments" onClick={() => {this.setState({tabState: [0, 1, 0]})}} >Comments</a>
                    <a className={`item ${tabs[2]}`} data-tab="Course Materials" onClick={() => {this.setState({tabState: [0, 0, 1]})}} >Course Materials</a>
                </div>
                <div className={`ui bottom attached tab segment ${tabs[0]}`} data-tab="GPA">
                    {this.renderCourseInfo()}
                </div>
                <div className={`ui bottom attached tab segment ${tabs[1]}`} data-tab="Comments">
                    {this.renderComments()}
                </div>
                <div className={`ui bottom attached tab segment ${tabs[2]}`} data-tab="Course Materials">
                    Course Materials
                </div>
            </div>
        )
    }
}

export default connect(null, {changeTab})(ClassShow);
