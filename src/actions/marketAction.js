import sqlApi from '../api/sqlServer';
import history from '../history';

export const createItem = (formValue) => {
    return async dispatch => {
        console.log(formValue);
        await sqlApi.post(`/insertItem?creater=${formValue.userId.userId}&image=${formValue.picture}&description=${formValue.description}&price=${formValue.price}&create_time=2019-02-02%2000:00:00&title=${formValue.title}`); 
        // http://localhost:9999/insert?id=2&creater=vincent&image=aaa&description=aaa&price=1&create_time=2019-02-02%2000:00:00
        dispatch( {
            type: "CREATE_ITEM"
        });
        history.push('/market');
    }
};

export const deleteItem = (id) => {
    return async dispatch => {
        const response = await sqlApi.post(`/deleteItem?id=${id}`)
        console.log(response)
        if(response.status === 200){
            dispatch( {
                type: "DELETE_ITEM",
                payload: id
            });
        }
    }
};

export const editItem = (formValue, id) => {
    return async dispatch => {
        const response = await sqlApi.post(`/editItem?id=${id}&image=${formValue.picture}&description=${formValue.description}&price=${formValue.price}&title=${formValue.title}`)
        console.log(response)
        if(response.status === 200){
            dispatch( {
                type: "EDIT_ITEM",
                payload: id
            });
        }
        history.push('/market');
    }
};


export const getItems = (page) => {
    return async dispatch => {
        console.log(page);
        const response = await sqlApi.get(`/getItems?page=${page}`)
        console.log(response);
        console.log(response.data.data)

        dispatch({
            type: "FETCH_MARKET_ITEMS",
            payload: {data: response.data.data, page: page}
        })
    }
}

export const fetchItems = (title,page) => {
    return async dispatch => {
        const response = await sqlApi.get(`/fetchItems?title=${title}&page=${page}`)
        console.log(response);
        console.log(response.data.data)

        dispatch({
            type: "FETCH_MARKET_ITEMS",
            payload: {data: response.data.data, page: page}
        })
    }
}