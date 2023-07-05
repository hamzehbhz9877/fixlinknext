import React from 'react';
import { useField} from 'formik';


const WInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className="input-group mb-5">
                <input {...field} {...props} className="form-control"/>
                {meta.touched && meta.error && (
                    <span className="error custom-pos">{meta.error}</span>
                )}
                <div className="input-group-prepend pl-2">
                    <button type="submit" className="btn bt-transform">{label}</button>
                </div>
            </div>
        </>
    );
};
export default WInput