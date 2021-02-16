import React from 'react';

import styles from './Input.module.css'

const Input = (props) => {
    let inputEl = null;
    const inputClasses = [styles.inputEl];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.invalid);
    }

    switch (props.elType) {
        case ('input'):
            inputEl = <input
                className={inputClasses.join(' ')}
                {...props.elConfig}
                value={props.value} 
                onChange={props.onChange}/>;
            break;
        case ('textarea'):
            inputEl = <textarea
                className={inputClasses.join(' ')}
                {...props.elConfig}
                value={props.value} 
                onChange={props.onChange}/>;
            break;
        case ('select'):
            inputEl = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.onChange}>
                    {props.elConfig.options.map(key => (
                        <option key={key.value} value={key.value}>{key.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputEl = <input
                className={inputClasses.join(' ')}
                {...props.elConfig}
                value={props.value} />;
    }

    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>{props.label}</label>
            {inputEl}
        </div>
    );
}

export default Input