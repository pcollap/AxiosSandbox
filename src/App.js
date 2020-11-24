import React, { Component } from 'react'
import './App.css';
import {v4 as uuid} from 'uuid'
import axios from 'axios'

const api = axios.create({
  // https://jsonplaceholder.typicode.com/posts
  baseURL: 'http://localhost:3000/courses/',
  headers: {
    'X-auth-key': "token123"
  }
})

class App extends Component {

  state = {
    courses: []
  }

  constructor() {
    super();
    this.getCourses();
  }

  getCourses = async() => {
    try {
      let data = await api.get('/', {
        params: {
          _limit: 4, //Limits get request to number of returned objects
          _start: 0
        }
      }).then(({data}) => data);

      //Another way to make a get request with AXIOS
      // let data = await axios({
      //   method: 'get',
      //   url: 'http://localhost:3000/courses/'
      // }).then(({data}) => data);

      console.log('GET Request: ' + data)
      this.setState({ courses: data })
    } catch (err) {
      console.log(err)
    }
  }

  createCourse = async() => {
    let response = api
      .post('/', {title: 'Test 2', id: uuid(), author: 'test2' })
      .catch(err => console.log(err))
    console.log('POST Request: ' + response)
    this.getCourses();
  }

  deleteCourse = async (id) => {
    let data = await api.delete(`/${id}`)
    console.log('DELETE Request: ' + data)
    this.getCourses();
  }

  updateCourse = async (id, newTitle) => {
    let data = await api.patch(`/${id}`, {title: newTitle})
    console.log('PATCH Request: ' + data)
    this.getCourses();
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          {/* creating a post request on button click to create a course */}
          <button onClick={this.createCourse}>createCourse</button>
          {/* iterating thru courses and displaying the titles from the get request*/}
          {this.state.courses.map(course => 
            // For each course, create a h2 header to update on click and X to delete course
            <h2 key={course.id} onClick={() => this.updateCourse(course.id, `${course.title}A`)}>
              {course.title}<button onClick={()=>this.deleteCourse(course.id)}>X</button>
            </h2>)}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App
