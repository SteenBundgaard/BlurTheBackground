import { uploadActions } from '../actions/action-types/uploadActions'

const initState = {
    rawImage: [],
    processedImage: [],
    processing: false,
    failure: false,
    name: null
}

const uploadReducer = (state = initState, action) => {
    switch (action.type) {
        case uploadActions.CLEARING: {
           return initState;
        }
        case uploadActions.UPLOADING: {
            return {
                rawImage: action.image,
                processedImage: [],
                processing: true,
                failure: false,
                name: action.name
            }
        }
        case uploadActions.UPLOADED: {
            if (!state.processing) {
                return initState;
            }
            return {
                rawImage: [],
                processedImage: action.image,
                processing: false,
                failure: false,
                name: state.name
            }
        }
        case uploadActions.FAILURE: {
            return {
                rawImage: state.rawImage,
                processedImage: state.processedImage,
                processing: state.processing,
                failure: true,
                name: state.name
            }
        }    
        default:
            return state;
    }
}

export default uploadReducer;