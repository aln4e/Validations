import React, { Component } from 'react';

class FormInput extends Component {
  constructor(props){
    super(props)
    this.state={
  //this.props.type looks at where FormInput is called in App.js. If type is specified, do that, otherwise the type is text
      type: this.props.type || 'text'
    }
  }

    //form-group and has-error are bootstrap classes. If this.props.erros is true it will assign the has-error class*/}

    //htmlFor is when you click on the label the cursor will go into the textbox*/}

  render(){
    return(

    <div className={`form-group ${this.props.errors && 'has-error'}`}>

      <label
        htmlFor={this.props.name}
        className='control-label'
      >
        {this.props.label}
      </label>
      <input
        id={this.props.name}
        type={this.state.type}
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
        className='form-control'
      />
      {this.props.errors &&
          <div className='help-block'>{this.props.errors}</div>
      }
    </div>
    )
  }
}

export default FormInput
