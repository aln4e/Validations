import {EventEmitter} from 'events'
import Dispatcher from '../dispatchers/Dispatcher'

class RegistrationStore extends EventEmitter{
  constructor(){
    super()
    this.fields = {
      firstName:'',
      lastName:'',
      email:'',
      password:''
    },
    this.errors = {}
  }

//4. setField receives data from the handleAction method below, and it ultimately updates this.fields. by emitting the change, it finishes the circle by triggering the componentWillMount method in the app.js COMPONENT
  setField(fieldName, value){
    // if(this.fields[fieldName] === ''){
    this.fields[fieldName] = value
    this.emit('CHANGE')
  }

  getFields(){
    return this.fields
  }

  getErrors(){
    return this.errors
  }

  validate(){
     this.errors = {}
     this.validatePresence('firstName')
     this.validatePresence('lastName')
     this.validatePresence('password')
     this.validateEmail('email')
     this.emit('SUBMIT')
   }

   validatePresence(fieldName){
     if(this.fields[fieldName] === ''){
       this.addError(fieldName, 'is Required')
     }
   }

   validateEmail(fieldName){
     const filter = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/
     if(!filter.test(this.fields[fieldName])){
       this.addError(fieldName, 'is not an email')
     }
   }

   addError(fieldName, message){
     this.errors[fieldName] = message
   }

//3. the ACTION is received from the dispatcher and told to run the handleAction method. Eventually, it is forced to the setField method above.
   handleAction(action){
       switch(action.type){
        case('CHANGE'):{
          this.setField(action.fieldName, action.value)
          break
        }
        case('SUBMIT'):{
          this.validate()
          break
        }
        default: {}
      }
    }
 }

const registrationStore = new RegistrationStore()
Dispatcher.register(registrationStore.handleAction.bind(registrationStore))
window.dispatcher = Dispatcher
window.store = registrationStore
export default registrationStore
