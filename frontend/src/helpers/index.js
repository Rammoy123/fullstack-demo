export const validate = ({values,typeofForm}) => {
    const errorObject = {};
    //   const user_regx = new RegExp();
    const email_regx = /^\w+([\+.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(typeofForm=="LoginForm"){
      if (!values.password) {
        errorObject.password_text = "Please provide a password";
      }

    }
    
    if (!values.email) {
       errorObject.username_text = "Please provide an email"
    } else {
      //    const regxPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

      if (!email_regx.test(values.email)) {
        errorObject.username_text = "Please provide a valid email";
      }
    }
    // console.log(error);

    return errorObject;
  };