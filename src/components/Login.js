import React from "react";
import { createSession } from '../services/session';
import { Link } from 'react-router-dom';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginForm: {
                handle: "",
                password: "",
            },
        }
    }

    handleInputChange(field, event) {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [field]: event.target.value,
            }
        })
    }

    async handleLoginAttempt(event) {
        event.preventDefault();
        const { history } = this.props;
        const { handle, password } = this.state.loginForm;

       try { 
           this.setState({ isLoggingIn: true })
           const { token, error } = await createSession({ handle, password });
        if (error) {
            throw new Error(error);
        }

        if (!token) {
            throw new Error('No token received, try again.');
        }
        
        localStorage.setItem('twitter_clone_token', token)
        history.push('/');

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
                            value = {this.state.loginForm.handle}
                            onChange={this.handleInputChange.bind(this, "handle")}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input 
                            type="password"
                            value = {this.state.loginForm.password}
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