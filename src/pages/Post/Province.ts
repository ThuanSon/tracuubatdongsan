import axios from "axios"
const getProvince = async () => {
    const res = await axios.get("https://partner.viettelpost.vn/v2/categories/listProvince");
    // console.log(res);
    return res;
    
}
export default getProvince;