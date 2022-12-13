import React from 'react'
import ailogo from '../assets/ailogo2.png'

const AiIntro = () => {
    return (
        <div className='ai-container'>
            <h1 className='text-center'>Get help with AI Assistance</h1>
            <div className='ai-wrapper row'>
                <div className='col-md-6 ai-desc pt-4'>
                    <p className='ai-p gradient-text'><i className='fa fa-comment ai-icons'></i> Fast ai support for you.</p>
                    <p className='ai-p gradient-text'><i className='fa fa-comment ai-icons'></i> Have queries in mind we got you</p>
                    <p className='ai-p gradient-text'><i className='fa fa-comment ai-icons'></i> Send a message to our Chatbot</p>
                    <button style={{fontSize: '18px', fontWeight: '700'}} className='btn btn-outline-dark home-buttons'>Send Message</button>
                </div>
                <div className='col-md-6'>
                    <img src={ailogo} alt=">" width={300}/>
                </div>

            </div>
        </div>
    )
}

export default AiIntro