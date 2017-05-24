import Dispatcher from '../dispatchers/Dispatcher'

//2. After getting the call from handleChange in App.js, the createField ACTION routes to the Dispatcher and is then routed to the subscribers of that Dispatcher
export function createField(fieldName, value){
  Dispatcher.dispatch({
    type: 'CHANGE',
    fieldName: fieldName,
    value: value
  })
}

export function submitForm(fieldName, value){
  Dispatcher.dispatch({
    type: 'SUBMIT',
  })
}
