import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import karachi from '../assets/karachi.jpg'
import jsonDataa from '../assets/islamabad_data.json'
import { PredictFuture } from '../../middleware/Predict.future'


const Islamabad = () => {

    const [location, setLocation] = useState('');
    const [sqr, setSqr] = useState('');
    const [bedroom, setBedroom] = useState('');
    const [bath, setBath] = useState('');
    const [jsonData, setJsonData] = useState([]);

    const [predictionVal, setPredictionVal] = useState(null);
    const [years, setYears] = useState(null)
    const [interst, setInterst] = useState(null)

    const formData = new FormData();

    const outputRef = useRef();
    const futureRef = useRef();


    async function HandleOnSubmit(e) {
        e.preventDefault()
        formData.append("Location", location);
        formData.append("Total_sqr", sqr);
        formData.append("Bedroom", bedroom);
        formData.append("Bath", bath);

        const response = await axios.post("http://localhost:8000/islamabad", formData);

        const data = await response.data;

        if (data.status === 'ok') {
            // alert("SUCCESS")
            outputRef.current.innerHTML = "<h4>It will cost you around " + data.Prediction + " lakh</h4>"
            setPredictionVal(data.Prediction)
        } else {
            alert("ERROR: ")
        }

        // console.log("FORM DATA: " + formData.get("Location"))
    }

    function HandleJsonData() {
        setJsonData(jsonDataa.data_columns)
    }

    useEffect(() => {
        HandleJsonData()
    }, [])

    return (
        <div className='pre-container'>

            <div className='pre-islamabad-cover'></div>

            <form onSubmit={HandleOnSubmit}>

                {/* location  */}
                <select onChange={(e) => {setLocation(e.target.value)}} className="form-select pre-input" aria-label="Default select example">
                <option selected>Please select location</option>
                {
                    jsonData.map((val, index) => (
                        <option value={val} key={index}>{val}</option>
                    ))
                }
            </select>
                
                {/* square feet  */}
                <input
                    type="number"
                    className="form-control pre-input"
                    placeholder='Square feet'
                    onChange={(e) => { setSqr(e.target.value) }}
                />
                {/* bedrooms  */}
                <input
                    type="number"
                    className="form-control pre-input"
                    placeholder='Total bedrooms'
                    onChange={(e) => { setBedroom(e.target.value) }}
                />
                {/* bath  */}
                <input type="number"
                    className="form-control pre-input"
                    placeholder='Total baths'
                    onChange={(e) => { setBath(e.target.value) }}
                />

                <button type='submit' className='btn btn-dark pre-submit'>Predict</button>
            </form>

            {/* output */}
            <div ref={outputRef} id="mailAlert" class="alert pre-alert text-center" role="alert">
                <i className='fa fa-comment'></i> Please select the related property's locatoion, Square Feet, Bedrooms and Baths
            </div>

            <div>
                <h4 className='text-center p-3'>Predit future Value</h4>
                <input onChange={(e) => { setYears(e.target.value) }} id='future-price' type="number" className="pre-input form-control" placeholder='Number of years' />
                <input onChange={(e) => { setInterst(e.target.value) }} id='interst' type="number" className="pre-input form-control" placeholder='Current interst 16(%)' />

                <button onClick={() => {
                    var future_val = PredictFuture(predictionVal, years, interst)
                    futureRef.current.innerHTML = "<h4>It will cost around " + future_val + " lakh in next " + years + " years </h4>"
                }}
                    className='btn btn-warning pre-submit'>Predict Future Value</button>
            </div>

            {/* future ref  */}
            <div ref={futureRef} class="alert pre-alert text-center" role="alert">
                <i className='fa fa-comment'></i> Please select the current interst rate and number of years you want to predict cost
            </div>

        </div>
    )
};

export default Islamabad;
