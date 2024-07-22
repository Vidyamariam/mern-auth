//to create custom error
export const errorHandler = (statusCode, message)=> {
   const error = new Error(message); //javascript constructor to create a custom error
    error.statusCode = statusCode;
    error.message = message;
    return error;
   
};