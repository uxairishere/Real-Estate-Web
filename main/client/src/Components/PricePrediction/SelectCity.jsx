import React from 'react'
import karachi from '../assets/karachibg.jpg'
import rwp from '../assets/rawalpindicity.jpg'
import isl from '../assets/islamabadcity.jpg'
import faisal from '../assets/faisalabadcity.jpg'

const SelectCity = () => {
  return (
    <div className='city-container'>
        <h1>Please select a City</h1>
        <div className='city-wrapper row'>
            
            <div style={{backgroundImage: `url('${karachi}')`}} className='city-card col-md-2'>
            <a className='btn btn-light pre-submit city-h3' href='/karachi'>KARACHI</a>
            </div>

            <div style={{backgroundImage: `url('${rwp}')`}} className='city-card col-md-2'>
            <a className='btn btn-light pre-submit city-h3' href='/rawalpindi'>Rawalpindi</a>
            </div>

            <div style={{backgroundImage: `url('${isl}')`}} className='city-card col-md-2'>
            <a className='btn btn-light pre-submit city-h3' href='/islamabad'>Islamabad</a>
            </div>

            <div style={{backgroundImage: `url('${faisal}')`}} className='city-card col-md-2'>
            <a className='btn btn-light pre-submit city-h3' href='/faisalabad'>Faisalabad</a>
            </div>

            <div style={{backgroundImage: `url('${karachi}')`}} className='city-card col-md-2'>
            <h3 className='city-h3'>Comming soon...</h3>
            </div>
        </div>
        <div className='mt-5'>
            <h1>Pakistan's Real estate prediction</h1>
            <p className='city-p'>The Pakistan real estate forecast 2022 has indicated that it is also going to be a year of boom for the real estate market like the previous year due to many reasons such as unstable gold prices, inflation and unstable stock market etc.</p>
        </div>
    </div>
  )
}

export default SelectCity