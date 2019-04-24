import sqlApi from '../api/sqlServer';

export const signIn = (user) => {
    sqlApi.get(`/insertUser?id=${user.userId}&userName=${user.userName}&ImageUrl=${user.imageUrl}&email=${user.email}`); 
    return {
        type: "SIGN_IN",
        payload: user
    };
};

export const signOut = () => {
    return {
        type: "SIGN_OUT"
    };
};

export const getUserInfo = (id) => {
    return async dispatch => {
        const response = await sqlApi.get(`/getUserInfo?id=${id}`);
        if(response.data.data[0] === undefined){
            return;
        }
        dispatch( {
            type: "USER_INFO",
            payload: response.data.data[0]
        })
    }
}

export const searchUserByName = (username) => {
    return async dispatch => {
        const response = await sqlApi.get(`/searchUser?username=${username}`);
        console.log(response);
        dispatch( {
            type: "USER_SEARCH",
            payload: response.data.data[0]
        })
    }
}