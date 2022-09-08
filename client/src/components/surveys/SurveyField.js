// contains logic to render a single label and text input

import React from "react";

export default ({ input, label, meta: {error, touched}}) => {
    return(
        <div>
            <label>{label}</label>
            {/* pass in the object with the functionality equal to onBlur={input.onBlut}, onChange={input.onChange} ... */}
            <input {...input} style={{ marginBottom: '5px' }}/>
            <div className="red-text" style={{ marginBottom: '20px' }}>
              {touched && error}  
            </div>
            
        </div>
    );
};