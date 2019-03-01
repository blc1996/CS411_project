import axios from 'axios'

export default axios.create({
    baseURL: "http://sp19-cs411-29.cs.illinois.edu:9999",
    headers: {
        Authorization: "Client-ID toBeFilled"
    }
});
