import React, { useRef} from 'react';
import {v4 as uuidV4} from 'uuid'

export default function Login({setLogin}) {
    
    const login = useRef();
    function onSubmit (e) {
        //prevents the page from refreshing
        e.preventDefault();
        setLogin(login.current.value);
    };

    function createLogin () {
        setLogin(uuidV4());
    }

    return (
        <div className="container text-center" >
            <form onSubmit={onSubmit}>
                <label>Enter your login</label>
                <input type="text" ref={login} required></input>
                <button className="btn btn-primary" type="submit"> Login </button>
                <button className="btn btn-secondary" onClick={createLogin}> Get login </button>
            </form>
        </div>
    )
}
