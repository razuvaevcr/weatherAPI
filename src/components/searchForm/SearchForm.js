import { useState, useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';
import WeatherService from '../../services/WeatherService';

import './searchForm.scss'



const SearchForm = ({onCitySearched}) => {
    const [field, setField] = useState('');

    const {getPlace, getPlaces} = WeatherService();

    const onUpdateField = async (value) => {
        setField(value); 
        // const res = await getPlaces(value)
        // console.log(res);
        // onCitySearched()
    }

    const onCoordsLoaded = async (place) => {
        const res = await getPlace(place);
        // console.log(res);
        onCitySearched(res);
    }
    
    

    return (
        <div className="search-form">
            <Formik
                initialValues = {{
                    city: {field}
                }}
                // validationSchema = {Yup.object({
                //     city: Yup.string().required('This field is required')
                // })}
                onSubmit = {() => onCoordsLoaded(field)}>

                <Form>
                    <div className="search-wrapper">
                        <Field 
                            id="city" 
                            name='city' 
                            type='text' 
                            placeholder="Enter city"
                            value={field}
                            onChange={(e) => onUpdateField(e.target.value)}/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled=''>
                            <div className="inner"></div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="city__search-error" name="city" />
                </Form>
                
            </Formik>
        </div>

    )
}

export default SearchForm;