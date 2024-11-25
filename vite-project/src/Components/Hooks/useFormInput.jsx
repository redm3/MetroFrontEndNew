import { useState } from 'react';

//see https://react.dev/learn/reusing-logic-with-custom-hooks

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    const inputProps = {
        value: value,
        onChange: handleChange
    };

    return inputProps;
}

export default useFormInput

//create a new component that displays a form and make use of this custom hook