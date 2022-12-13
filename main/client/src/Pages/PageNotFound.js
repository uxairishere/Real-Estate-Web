import React from 'react'
import { Link } from 'react-router-dom'
import './pagenotfound.css'

const PageNotFound = () => {
    return (
        <div className='outerbox'>
            <div className="mainbox">
                <div className="err">4</div>
                <div className="err2">0</div>
                <div className="err3">4</div>
                <div className="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <Link to="/">home</Link> and try from there.</p></div>
            </div>
        </div>
    )
}

export default PageNotFound