import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';


const CLOUDINARY_UPLOAD_PRESET = 'mdhxwmbh';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dsrkgfv4x/upload';

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          uploadedFileCloudinaryUrl: ''
        };

        console.log(this.props);
    }

    onImageDrop(files) {
        this.setState({
          uploadedFile: files[0]
        });
    
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url
            });
          }
        });
    }


    render () {
        const { input: { value, onChange } } = this.props
        if(value !== this.state.uploadedFileCloudinaryUrl){
            onChange(this.state.uploadedFileCloudinaryUrl);
        }
        return (
            <div>
                <div className="FileUpload">
                    <Dropzone
                        onDrop={this.onImageDrop.bind(this)}
                        accept="image/*"
                        multiple={false}>
                            {({getRootProps, getInputProps}) => {
                            return (
                                <div
                                {...getRootProps()}
                                >
                                <input {...getInputProps()} />
                                {
                                <div className="ui placeholder segment">
                                    <div className="ui icon header">
                                    <i className="cloud upload"></i>
                                   Upload the picture of your item
                                   <i class="cloud upload icon"></i>
                                    </div>
                                </div>
                                }
                                </div>
                            )
                        }}
                    </Dropzone>
                </div>

                <div>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                    <div>
                    <p>{this.state.uploadedFile.name}</p>
                    <a className="ui medium image">
                        <img src={this.state.uploadedFileCloudinaryUrl} />
                    </a>
                    </div>}
                </div>
            </div>
            
        )
    }
}

export default ImageUpload;