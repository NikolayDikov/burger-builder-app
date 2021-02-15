import React, { useEffect, useState } from 'react';

import { Modal } from '../../components';
import Aux from '../Aux';
import axios from '../../axios-orders'

const withErrorHandler = (WrappedComponent) => {
    return (props) => {

        const [error, setError] = useState(false);
        const [errorMessage, setErrorMessage] = useState('test');
        // const reqInterceptor = useRef(null);
        // const resInterceptor = useRef(null);


        useEffect(() => {
            // reqInterceptor = 
            axios.interceptors.request.use(req => {
                setError(false);
                setErrorMessage(null);
                return req;
            });
            // resInterceptor = 
            axios.interceptors.response.use(res => res, error => {
                setError(true);
                setErrorMessage(error.message);
            });
        });
        // , [() => {
        //     axios.interceptors.request.eject(reqInterceptor);
        //     axios.interceptors.response.eject(resInterceptor);
        // }]

        return (
            <Aux>
                <Modal show={error} modalClosed={() => setError(false)}>
                    {error ? errorMessage : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;