import React, {Component} from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary'
import './App.css';





class App extends Component {
    constructor() {
        super()
        this.state= {
          robots: [],
          searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response=> response.json())
        .then(users =>{this.setState({robots: users})});
    }

    onSearchChange=(event)=> {
       this.setState({searchfield:event.target.value})
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (!robots.length){
            return <h1>Loading</h1>
        } else{
            return(
                <div className='tc'>
                    <link href="https://fonts.cdnfonts.com/css/sega-logo-font" rel="stylesheet"></link>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;