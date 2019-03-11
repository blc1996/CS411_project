import sqlApi from '../api/sqlServer';
import history from '../history';

export const createItem = (formValue) => {
    return async dispatch => {
        console.log(formValue);
        await sqlApi.post(`/insertItem?creater=vincent&image=${formValue.picture}&description=${formValue.description}&price=${formValue.price}&create_time=2019-02-02%2000:00:00&title=${formValue.title}`); 
        // http://localhost:9999/insert?id=2&creater=vincent&image=aaa&description=aaa&price=1&create_time=2019-02-02%2000:00:00
        dispatch( {
            type: "CREATE_ITEM"
        });

        history.push('/market');
    }
};


export const fetchItems = (page) => {
    return async dispatch => {
        const response = await sqlApi.get("/select");

        dispatch({
            type: "FETCH_MARKET_ITEMS",
            payload: {...response.data, page: page}
        })
    }
}