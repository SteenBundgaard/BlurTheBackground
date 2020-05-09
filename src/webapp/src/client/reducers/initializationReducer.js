import { initializationActions } from '../actions/action-types/initializationActions'

const initState = {
    isSdkLoaded : false
}

const initializationReducer = (state = initState, action) => {
    switch (action.type) {
        case initializationActions.SDK_LOADED: {
          return {
            isSdkLoaded: true
          }
        }        
        default:
            return state; 
      }
}

export default initializationReducer;