import React, { Component } from 'react';
import Header from './components/Header'
import FormInput from './components/FormInput'
import registrationStore from './stores/RegistrationStore'
import {createField, submitForm} from './actions/RegistrationStoreActions'

class App extends Component {
  constructor(props){
    //super(props) is a function from the Component
    super(props)
    this.state={
      registration: registrationStore.getFields(),
      errors: {}
    }
  }

//1. handleChange() forces the createField ACTION
  handleChange(event){
    const target = event.target
    createField(target.name, target.value)
  }

//6. Finally, we setState and rerender with the updates.
  handleStateChange() {
    this.setState({
      registration: registrationStore.getFields()
    })
  }

  handleFormSubmission() {
    this.setState({
      errors: registrationStore.getErrors()
    })
  }

//5. the app is waiting for change emissions from the store, and it triggers the handleStateChange method above.
  componentWillMount(){
    registrationStore.on('CHANGE', this.handleStateChange.bind(this))
    registrationStore.on('SUBMIT', this.handleFormSubmission.bind(this))
  }

  validate(){
    // registrationStore.validate()
    this.setState({errors: registrationStore.getErrors()})
  }

  handleSubmit(event){
    event.preventDefault()
    submitForm()
    console.log(this.state.registration)
  }

//if we have errors, the isValid method should return false
  isValid(){
    return Object.keys(this.state.errors).length === 0
  }

  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
              <div className='panel panel-default'>
                <div className='panel-body'>
                {/*If this is not valid show the text in the div*/}
                  { !this.isValid() &&
                    <div className='alert alert-danger'>
                      Please verify that all fields are filled in below.
                    </div>
                  }
                  <h3>Registration</h3>
                  <form onSubmit={this.handleSubmit.bind(this)}>

                    <div className='row'>
                      <div className='col-xs-12'>
                          <FormInput
                            name='firstName'
                            value={this.state.registration.firstName}
                            onChange={this.handleChange.bind(this)}
                            className='form-control'
                            label='Fist Name'
                            errors={this.state.errors.firstName}
                          />

                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-xs-12'>
                          <FormInput
                            name='lastName'
                            value={this.state.registration.lastName}
                            onChange={this.handleChange.bind(this)}
                            className='form-control'
                            label='Last Name'
                            errors={this.state.errors.lastName}
                          />
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-xs-12'>
                          <FormInput
                            name='email'
                            value={this.state.registration.email}
                            onChange={this.handleChange.bind(this)}
                            className='form-control'
                            label='Email'
                            errors={this.state.errors.email}
                          />
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-xs-12'>
                          <FormInput
                            type='password'
                            name='password'
                            value={this.state.registration.password}
                            onChange={this.handleChange.bind(this)}
                            className='form-control'
                            label='Password'
                            errors={this.state.errors.password}
                          />
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-xs-12'>
                        <input className='btn btn-primary' type='submit' value='Submit' />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className="col-xs-4 col-xs-offset-4">
            <ul className='list-group'>
              <li className='list-group-item'>First Name: {this.state.registration.firstName}</li>
              <li className='list-group-item'>Last Name: {this.state.registration.lastName}</li>
              <li className='list-group-item'>Email: {this.state.registration.email}</li>
              <li className='list-group-item'>Password: {this.state.registration.password}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
