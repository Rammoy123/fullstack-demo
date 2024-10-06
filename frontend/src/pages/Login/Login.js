import React from 'react'
import LoginForm from './LoginForm'


import React from "react";
import { useState, useEffect } from "react";


import eyeOnIcon from "../assets/images/view-on.svg";
import eyeOffIcon from "../assets/images/view-off.svg";


const Login = () => {

  
    const [showPassword, setShowPassword] = useState(false);
    const [loaderStatus, setLoaderStatus] = useState(false);
  
    const [inputValue, setInputValue] = useState({
      userName: "",
      password: "",
      rememberMeBox: [],
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [formError, setFormError] = useState({});
    // const router = useRouter();
  
   
  
    const changeInput = (e) => {
      const { name, value } = e.target;
  
      if (e.target.name == "rememberMeBox") {
        const { value, checked } = e.target;
  
        const { question1Option } = inputValue;
  
        // console.log(`${value} is ${checked} ${name}`);
  
        console.log(e.target.value, "valueee");
        // setChecked(!checked)
        // if(!checked){
        //   setValue(e.target.value)
  
        // }
        console.log(checked);
  
        if (checked) {
          setInputValue({
            ...inputValue,
            rememberMeBox: [...rememberMeBox, value],
          });
        } else {
          setInputValue({
            ...inputValue,
  
            rememberMeBox: rememberMeBox.filter((e) => e !== value),
          });
        }
      } else {
        setInputValue({
          ...inputValue,
  
          [name]: value,
        });
      }
    };
  
  

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
          setLoaderStatus(true);
    
          let cloneInputValueData= { ...inputValue };
    
          const loginApiData= {
            // username: cloneInputValueData.userName,
            email: cloneInputValueData.userName,
    
            password: cloneInputValueData.password,
          };
    
          // console.log(l)
    
          const apiRequest = async () => {
           
    
         
    
      
    
            try {
              let res= await useCallApi({
                headersInfo: authHeader,
                endpoint: "api/login",
                httpMethod: "post",
                data: loginApiData,
              });
    
            
              setLoaderStatus(false);
              
              if (res?.status == "200") {
                inputValue.rememberMeBox.length > 0 ?
                  setSessionStorage(
                    JSON.stringify({
                      token: `Bearer ${res?.data?.access}`,
                      userName: cloneInputValueData.userName,
                      password: cloneInputValueData.password,
                    })
                  ):(inputValue.rememberMeBox.length ==0) ? clearSessionStorage('session'):''
                
                router.push("/dashboard");
              } else if (regexExp400.test(res?.status)) {
    console.log("inside of it")
    
                res?.data?.type == "password"
                  ? setFormError({ password_text: res?.message })
                  : setFormError({ username_text: res?.message });
              } 
         
    
              // console.log('Success:', data);
            } catch (error) {
              setLoaderStatus(false);
    
              const errorMessage =
                error instanceof Error ? error.message : "";
    
              const toastErrorSettingDataCpy=
                toastSettingData;
              toast.error(
                allowableServerErrors.includes(errorMessage)
                  ? errorMessage
                  : generalizedApiError,
                toastErrorSettingDataCpy
              );
    
             
    
          
            }
         
    
            setIsSubmit(false);
          };
    
          apiRequest();
        }
      }, [formError]);
  
      const clearInputBox = () => {
        setInputValue({
          ...inputValue,
          userName: "",
          password: "",
          rememberMeBox:[]
        });
      };


  
    const submitForm = (e) => {
        e.preventDefault();

        let sanitizedInput=sanitizeInput(inputValue);
        console.log(sanitizedInput,"sanitized input")
        setInputValue(sanitizedInput)
       
    
        setFormError(validate({values:{...sanitizedInput,email:sanitizedInput.userName},typeofForm:'LoginForm'}));
    
        setIsSubmit(true);
    };

    const handleClickShowPassword = (event) => {
        setShowPassword(!showPassword);
      };
  
    
  
 
  


  return (
    <>
  <LoginForm   submitForm={submitForm} handleClickShowPassword={handleClickShowPassword} changeInput={changeInput}/>
    
    </>
  )
}

export default Login