const INITIAL_STATE = ["item active", "item", "item"];
const template = ["item", "item", "item"];

export default (state = INITIAL_STATE, action) => {
    if(action.type === "CHANGE_TAB"){
        const temp = template.map(item => {
            return item;
        });
        temp[action.payload] = "item active";
        return temp;
    }
    return state
}