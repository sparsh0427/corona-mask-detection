import React from 'react';
       

    class FaceRecognition extends React.Component{

        constructor(props){
            super(props)
        }

        render(){
            return(
        <div className='center ma'>
            <div className='mt2 absolute'>
                <img id='inputimage' src={this.props.imageUrl} alt="image_of_url" width="500px" height='auto'/>   
            </div>l̥
        </div>
            );
        }
    }
export default FaceRecognition;