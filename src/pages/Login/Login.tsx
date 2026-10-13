import {
  Button,
  FieldError,
  InputGroup,
  Spinner,
  TextField,
  toast,
} from "@heroui/react";
import {  useState } from "react";
import { BiEnvelope, BiKey} from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {  useForm } from "react-hook-form";
import { LoginSchema,type LoginSchemaType} from "../../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "../../api/auth.api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  useAuth } from "../../context/AuthContext";

export default function Login() {

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const {setToken} = useAuth();
 
  const{register,handleSubmit,formState:{errors,isSubmitting}}=useForm<LoginSchemaType>({
   defaultValues:{

    email:"",
    password:"",
   
   },
    resolver: zodResolver(LoginSchema),
  });

  

  async function submitForm(data:LoginSchemaType) {
    


    try {
      const response = await loginApi(data);
        console.log(response);
        setToken(response.token);
        localStorage.setItem('userToken',response.token);
        toast.success('Login successful');
        navigate('/');
      
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.response?.data);
        toast.danger(error.response?.data.msg);
        
        
      }
      else{
        console.log(error);
      }
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-20  p-5 bg-white shadow rounded-2xl">
      <h1 className="text-3xl font-bold text-blue-900 text-center ">
        Login
      </h1>
      
      <form className="my-4 space-y-4" onSubmit={handleSubmit(submitForm)}>
      
        <TextField isInvalid={Boolean(errors?.email)} className={"w-full"} name="email" aria-label="email">
          <InputGroup
            className={
              "data-focus-within:ring-2 data-focus-within:ring-blue-900  data-invalid:ring-red-500"
            }
          >
            <InputGroup.Prefix>
              <BiEnvelope className="size-4 text-muted" />
            </InputGroup.Prefix>
            <InputGroup.Input className="" placeholder="name@email.com" {...register('email')}/>
          </InputGroup>

          <FieldError>{errors?.email?.message}</FieldError>
        </TextField>
        <TextField isInvalid={Boolean(errors?.password)} className={"w-full"} name="password" aria-label="password">
          <InputGroup
            className={
              "data-focus-within:ring-2 data-focus-within:ring-blue-900 data-invalid:ring-red-500"
            }
          >
            <InputGroup.Prefix>
              <BiKey className="size-4 text-muted" />
            </InputGroup.Prefix>
            <InputGroup.Input {...register('password')}
              className=""
              placeholder="enter password"
              type={isVisible ? "text" : "password"}
            />
            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <BsEye className="size-4" />
                ) : (
                  <BsEyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <FieldError>{errors?.password?.message}</FieldError>
        </TextField>
       
        <Button type="submit" className={"w-full bg-blue-900"} isPending={isSubmitting}>
            {({isPending}) => (
        <>
          {isPending ? <><Spinner color="current" size="sm" /> loading...</> : "Login"}
         
        </>
      )}
        </Button>
      </form>
    </section>
  );
}
