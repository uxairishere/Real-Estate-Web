import React, { useState } from 'react'
import avatar from './assets/newchatbot2.png'
import avatar2 from './assets/personava.png'
import axios from 'axios';

import AOS from 'aos';
import 'aos/dist/aos.css';



const Chatbot = () => {
    AOS.init();

    const [input, setInput] = useState('')
    const [convo, setConvo] = useState([])

    const [resp, setResp] = useState('')
    const [botConvo, setBotConvo] = useState([])

    const HandleOnChange = (event) => {
        setInput(event.target.value)
    }
    const HandleOnSubmit = () => {
        convo.push(input)
        setInput('')
    }

    const HandleClearConvo = () => {
        setConvo([])
    }

    async function HandleRequest(event) {
        event.preventDefault()
        // var query = input

        let temp = convo;
        temp.push({
            user: 'user',
            text: input
        })


        setConvo([...temp])
        setInput('')
        console.log("User: " + input)

        await axios.post('http://localhost:1337/api/chatbot', { message: input })
            .then(res => {
                let temp = convo;
                temp.push({
                    user: 'bot',
                    text: res.data.message
                })

                setResp(res.data.message)
                setConvo([...temp])
                console.log("Bot: " + res.data.message)
            })
        console.log(convo)
    }

    return (
        <>
            <div data-aos="fade-up" className='chatbot-container'>

                <div className='chatbot-nav' >
                    {/* <img className='bot-avatar' style={{ display: 'inline-block' }} width={40} src={avatar} alt=">" /> */}
                    <h3 className='chatbot-heading-h3' style={{ display: 'inline-block' }} >Botagent</h3>
                </div>

                <div id='scroll' className='chatbot-conv'>
                    <div className='bot-content-wrapper'>
                        <img className='bot-avatar' width={30} src={avatar} alt=">" />
                        <div className='bot-response-alert'>Hi there, how are you doing</div>
                    </div>
                    {
                        convo.map((entry) => {
                            if (entry.user === "user") {
                                return (
                                    <div style={{ textAlign: 'right' }} className='bot-content-wrapper'>
                                        <div className='bot-content-alert'>{entry.text}</div>
                                        <img className='bot-avatar' width={30} src={avatar2} alt=">" />
                                    </div>
                                )
                            } else {
                                return (
                                    <div className='bot-content-wrapper'>
                                        <img className='bot-avatar' width={30} src={avatar} alt=">" />
                                        <div className='bot-response-alert'>{entry.text}</div>
                                    </div>
                                )
                            }
                        })
                    }

                </div>

                <div className='chatbot-input'>
                    <input style={{ width: '75%', display: 'inline-block' }} onChange={HandleOnChange} type='text' className='form-control bot-input' />
                    <button className='btn btn-dark bot-submit' style={{ display: 'inline-block' }} onClick={HandleRequest}>Send</button>
                    {/* <button onClick={HandleClearConvo}>clear</button> */}
                </div>

            </div>
        </>
    )
}

export default Chatbot