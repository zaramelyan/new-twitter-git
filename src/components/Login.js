import React from "react";
import { createSession } from '../services/session';
import { Link } from 'react-router-dom';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          
                handle: "",
                password: "",
            
        }
    }

    handleInputChange(field, event) {
        this.setState({
                [field]: event.target.value,
        })
        console.log(this.state.handle, this.state.password)
    }

    async handleLoginAttempt(event) {
        console.log(this.state)
        event.preventDefault();
        const { history } = this.props;
        const { handle, password } = this.state;
       try { 
        this.setState({ isLoggingIn: true })
       console.log("here " + this.state.handle)
        const { token, error } = await createSession({handle, password});
        localStorage.setItem('twitter_clone_token', token)
        history.push('/');
        if (error) {
            throw new Error(error);
        }

        if (!token) {
            throw new Error('No token received, try again.');
        }
     

    } catch (error) {
        this.setState({ error, isLoggingIn: false });
    }}

    render(){
        const { error, isLoggingIn } = this.state;
        return(
            <div>
                <div className='container'>
                <h1>Login</h1>
                <form>
                    <div>
                        <label>
                            Handle:
                            <input 
                            type="text"
                            value = {this.state.handle}
                            onChange={this.handleInputChange.bind(this, "handle")}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input 
                            type="password"
                            value = {this.state.password}
                            onChange={this.handleInputChange.bind(this, "password")}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <button onClick={this.handleLoginAttempt.bind(this)}>Login</button>
                        <br></br>
                        <Link to='/signup'>Or sign up here</Link>
                    </div>
                    <div>
                        {isLoggingIn && <p>Logging in...</p>}
                        {error && <p>Unable to log in: {error.message}</p>}
                    </div>
                </form>
                </div>
            </div>
        )
      }
}

export default Login