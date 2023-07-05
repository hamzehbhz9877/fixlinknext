import React from 'react';
import {useField} from 'formik';


const TextArea = ({label,classes, ...props}) => {
    const [field, meta] = useField(props);
    const error = meta.touched && meta.error;
    return (
        <>
            <div className={`form-group ${classes?classes:""}`}>
                <div className="form__div form__cnu">
                    <textarea {...field} {...props}
                           className={`form__input ${error ? "error" : ""} ${meta.touched && !meta.error ? "success" : ""}`}
                           placeholder=" "/>
                    <label htmlFor="" className="form__label">{label}</label>
                </div>
                {error && (<span className="error">{meta.error}</span>)}
            </div>

        </>
    );
};
export default TextArea