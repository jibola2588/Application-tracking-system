export const getUserToken = () => {
    let userDetails = localStorage.getItem("user-details");
  
    return userDetails ? JSON.parse(userDetails) : {};
  };
  