import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeTab} from '../../actions/headerAction';
import courseapi from '../../api/courseAPI';
import './ClassMainPage.css'

class ClassMainPage extends Component {
    state = {
            course: "",
            professor: "",
            items: []
        }

    componentDidMount () {
        this.props.changeTab(2);
        // this.submit();
    }


    submit = async (event) => {
        event.preventDefault();
        // console.log("123")
        // console.log(this.state.course)
        // console.log("123")
        const response = await courseapi.post('/result', {
            course: this.state.course,
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
    }

    render () {
        return (
            <div>
                <center> <h1> FIND YOUR RIGHT COURSE </h1> 
                <form onSubmit={this.submit} class = "recommend">
                    <label>
                    <input type="text" name="course" placeholder="Enter Course Name"
                        value={this.state.course}
                        onChange={(e) => this.setState({ course: e.target.value })} 
                        onClick={(e) => this.setState({ course: e.target.value })} />
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
        )
    }
}

export default connect(null, {changeTab})(ClassMainPage);