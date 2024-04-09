export const generateOTP = async() =>{
    try{
        return (
         Math.floor(100000 + Math.random() * 900000).toString());

    } catch(error) {
        throw error;
    }
};