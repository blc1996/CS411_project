import axios from 'axios'

export default axios.create({
    baseURL: "http://10.195.198.90:9999",
    headers: {
        Authorization: "Client-ID toBeFilled"
    }
});
