import React, { useState } from 'react'
import axios from 'axios'

const Contact = () => {

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    async function HandleOnSubmit() {
        const res = await axios.post('http://localhost:3001/email/contact', { fullname, email, subject, body })
        const data = await res.data;
        if (data.status === 'ok') {
            console.log("CONTACT: " + data.message)
        } else {
            console.log("ERROR OCCURED ON CONTACT ROUTE");
        }
    }
    return (
        <div className='contact-container' style={{ padding: "9rem 0" }}>
            <div className='contact-form'>
                <div className='contact-img-container'>
                    <img src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/mail-letter-offer-256.png" alt="icon" />
                </div>

                <input placeholder='Full Name'
              class="form-control contact__inputs1"
              type='text'
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
            />

            <input
              class="form-control contact__inputs1"
              type='email'
              placeholder='@email.com'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              class="form-control contact__inputs1"
              type='text'
              placeholder='Subject'
              onChange={(e) => setSubject(e.target.value)}
              value={subject}

            />
            <textarea
              placeholder='How can we help?'
              class="form-control contact__textare mt-3"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            ></textarea>

            <input
              type='submit'
              className='btn btn-dark introbutton login-button'
              style={{ width: '70%', margin: '0 auto' }}
              onClick={() => {HandleOnSubmit()}}
            />
            </div>
        </div>
    )
}

export default Contact