export const SIGNUP = "SIGNUP"
export const LOGIN = "LOGIN"

export const singup = (email, password) => {
    return async dispatch => {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnCX_8jKVHuYCdAH2NB2MdRwRN3I1ABNg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong";
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found';
            }
            throw new Error(message);
        }

        const resData = await response.json();

        dispatch({type: SIGNUP}); 
    };
};


export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBnCX_8jKVHuYCdAH2NB2MdRwRN3I1ABNg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong";
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found';
            }
            throw new Error(message);
        }

        const resData = await response.json();

        dispatch({type: LOGIN}); 
    };
};