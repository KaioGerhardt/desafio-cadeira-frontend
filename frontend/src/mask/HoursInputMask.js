import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

const HoursInputMask = ({ onChange }) => {
    const handleChange = (event) => {
        const novaHoras = event.target.value;
        onChange(novaHoras);
    };

    return (
        <InputMask
            mask="99:99"
            placeholder="HH:MM"
            maskChar="_"
            autoComplete="off"
            onChange={handleChange}
        />
    );
};

HoursInputMask.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default HoursInputMask;