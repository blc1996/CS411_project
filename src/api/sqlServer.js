import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:9999",
    headers: {
        Authorization: "Client-ID toBeFilled"
    }
});
