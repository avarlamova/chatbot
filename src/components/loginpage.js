import React, { useRef} from 'react'

export default function Login({onLoginSubmit}) {
    const login = useRef();

    function onSubmit (e) {
        //prevents the page from refreshing
        e.preventDefault();
        onLoginSubmit(login.current.value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Enter your login</label>
                <input type="text" ref={login} required></input>
                <button className="btn btn-primary" type="submit"> Login </button>
                <button className="btn btn-secondary"> Get login </button>
            </form>
        </div>
    )
}
