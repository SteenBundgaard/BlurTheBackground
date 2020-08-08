import React, { Component } from 'react';
import Item5 from '../images/item5.jpg'
import Style from './Upload.module.css'
import { actions } from './actions/actionCreators'
import { connect } from 'react-redux'
import { uploadActions } from './actions/action-types/uploadActions'
import Spinner from '../images/spinner.gif'
import { saveAs } from 'file-saver';
import UploadFailed from './UploadFailed'

class Upload extends Component {
    constructor(props) {
        super(props);
        this.imageUploader = React.createRef();
    }

    onUpload = (clickEvent) => {
        clickEvent.preventDefault();
        this.imageUploader.current.click();
    }

    onDownload = (clickEvent) => {
        clickEvent.preventDefault();
        const blob = new Blob([this.convertDataToBinary(this.props.processedImage)], {type: 'image/jpeg'});
        const nameParts = this.props.name.split('.');        
        const fileName = nameParts[0] + '-processed';
        saveAs(blob, fileName);       
    }

    convertDataToBinary = (encoded) => {
        const BASE64_MARKER = ';base64,';
        const base64Index = encoded.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        const base64 = encoded.substring(base64Index);
        const raw = window.atob(base64);
        const rawLength = raw.length;
        const array = new Uint8Array(new ArrayBuffer(rawLength));
    
        for(let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.props.dispatch(actions.upload(e.target.result, file.name));
          }
          reader.readAsDataURL(file);
        }
      };
     
    componentWillUnmount() {
        this.props.dispatch({type: uploadActions.CLEARING});        
    } 

    render() {
        const hasProcessedImage = this.props.processedImage.length != 0;
        const img = this.props.processing ? this.props.rawImage : hasProcessedImage ? this.props.processedImage : Item5;
        
        return (
            <div className="container">
                <div className="row" />
                <div className="row">
                    <div className="col s6 offset-s3">
                        <div className="card card-panel hoverable grey">
                            <div>
                               {this.props.processing && <img className={Style.spinner} src={Spinner} />}
                               <img src={img} className={Style.imageCenter} />                           
                            </div>
                            <div className="card-action">
                                <input tag='input' ref={this.imageUploader} onChange={this.handleImageUpload} className={Style.button} type='file' accept="image/jpeg" />
                                {!this.props.processing && !hasProcessedImage && <a href="#" tag='upload' onClick={this.onUpload}>Upload Image</a>}
                                {hasProcessedImage && <a tag='download' href="#" onClick={this.onDownload}>Download Image</a>}   
                                {this.props.processing && <a>Processing - this may take a couple of minutes</a>}                             
                            </div>
                            <div>
                                {this.props.failure && <UploadFailed/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const rawImage = state.upload.rawImage;
    const processedImage = state.upload.processedImage;
    const processing = state.upload.processing;
    const failure = state.upload.failure;
    const name = state.upload.name;
    return {
        rawImage,
        processedImage,
        processing, 
        failure,
        name
    };
}

export default connect(mapStateToProps)(Upload);
