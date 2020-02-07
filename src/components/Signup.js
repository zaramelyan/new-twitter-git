import React from "react";
import { createUser } from '../services/tweets'

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            SignUpForm: {
                name:'',
                handle: '',
                password: '',
                passwordcheck: '',
            }
        }
    }

    handleInputChange(field, event) {
        this.setState({
            SignUpForm: {
                ...this.state.SignUpForm,
                [field]: event.target.value,
            }
        })
    }

    async handleNewUserSubmit(name, handle, password) {
        await createUser(name, handle, password);
    }

    async checkPass(event) {
        const { history } = this.props;
        const { name, handle, password, passwordcheck} = this.state.SignUpForm;

        event.preventDefault();
        if (!name || !handle || !password || !passwordcheck) {
            throw new Error ('Input missing');
        }

        if(password !== passwordcheck) {
            throw new Error ('Passwords do not match')
            }

        await this.handleNewUserSubmit(name, handle, password);
        history.push('/home')
    }

    render(){
        return(
            <div className="container">
                <h1>Sign up</h1>
                <form>
                    <div>
                <label>Name:
                    <input type="text" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "name")}></input>
                </label>
                </div>
                <div>
                <label>Handle:
                    <input type="text" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "handle")}></input>
                </label>
                </div>
                <div>
                <label>Password:
                    <input type="text" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "password")}></input>
                </label>
                </div>
                <div>
                <label>Confirm password:
                    <input type="text" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "passwordcheck")}></input>
                </label>
                </div>
                <button onClick={this.checkPass.bind(this)}>Sign up</button>
                </form>
            </div>
        )
    }
}

export default Signup