import {
  Alert,
  Button,
  FieldError,
  InputGroup,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { useState } from "react";
import { BiEnvelope, BiKey, BiUser } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import { Radio, RadioGroup } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { RegisterSchema, type RegisterSchemaType } from "../../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerApi } from "../../api/auth.api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const{register,control,handleSubmit,formState:{errors}}=useForm<RegisterSchemaType>({
   defaultValues:{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    age:0,
    phone:"",
    gender:"male",
   },
    resolver: zodResolver(RegisterSchema),
  });

  console.log(register('name'));

  async function submitForm(data:RegisterSchemaType) {
    const {rePassword,gender,...payload} = data
    console.log(data);


    try {
      const response = await registerApi(payload);
        console.log(response);
        toast.success('Registration successful');
        navigate('/login');
      
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.response?.data);
        toast.danger(error.response?.data.msg);
        setError(error.response?.data.msg);
        
      }
      else{
        console.log(error);
      }
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-20  p-5 bg-white shadow rounded-2xl">
      <h1 className="text-3xl font-bold text-blue-900 text-center ">
        Register
      </h1>
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{error}</Alert.Title>
         </Alert.Content>
      </Alert>
      <form className="my-4 space-y-4" onSubmit={handleSubmit(submitForm)}>
        <TextField isInvalid={Boolean(errors?.name)} className={"w-full"} name="name" aria-label="name">
          <InputGroup
            className={
              "data-focus-within:ring-2 data-focus-within:ring-blue-900  data-invalid:ring-red-500"
            }
          >
            <InputGroup.Prefix>
              <BiUser className="size-4 text-muted" />
            </InputGroup.Prefix>
            <InputGroup.Input className="" placeholder="name" {...register('name')} />
          </InputGroup>
         
          <FieldError>{errors?.name?.message}</FieldError>
        </TextField>
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
        <TextField isInvalid={Boolean(errors?.rePassword)} className={"w-full"} name="rePassword" aria-label="rePassword">
          <InputGroup
            className={
              "data-focus-within:ring-2 data-focus-within:ring-blue-900 data-invalid:ring-red-500"
            }
          >
            <InputGroup.Prefix>
              <BiKey className="size-4 text-muted" />
            </InputGroup.Prefix>
            <InputGroup.Input {...register('rePassword')}
              className=""
              placeholder="confirm password"
              type={isRePasswordVisible ? "text" : "password"}
            />
            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={
                  isRePasswordVisible ? "Hide password" : "Show password"
                }
                size="sm"
                variant="ghost"
                onPress={() => setIsRePasswordVisible(!isRePasswordVisible)}
              >
                {isRePasswordVisible ? (
                  <BsEye className="size-4" />
                ) : (
                  <BsEyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <FieldError>{errors?.rePassword?.message}</FieldError>
        </TextField>
        <TextField isInvalid={Boolean(errors?.age)} className={"w-full"} name="age" aria-label="age">
          <InputGroup
            className={
              "data-focus-within:ring-2 data-focus-within:ring-blue-900 data-invalid:ring-red-500"
            }
          >
            <InputGroup.Prefix>
              <MdOutlineDateRange className="size-4 text-muted" />
            </InputGroup.Prefix>
            <InputGroup.Input {...register('age',{valueAsNumber:true})} className="" placeholder="enter your age" />
          </InputGroup>

          <FieldError>{errors?.age?.message}</FieldError>
        </TextField>
        <TextField isInvalid={Boolean(errors?.phone)} className={"w-full"} name="phone" aria-label="phone">
          <InputGroup
            className={
              "data-focus-within:ring-2 data-focus-within:ring-blue-900 data-invalid:ring-red-500"
            }
          >
            <InputGroup.Prefix>
              <PiPhone className="size-4 text-muted" />
            </InputGroup.Prefix>
            <InputGroup.Input {...register('phone')} className="" placeholder="enter your phone" />
          </InputGroup>

          <FieldError>{errors?.phone?.message}</FieldError>
        </TextField>
        <Label>Gender</Label>
        <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          
          <RadioGroup orientation="horizontal" {...field} aria-label="gender">
          <Radio value="male"  className={"group"}>
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator className="group-data-[selected=true]:bg-blue-900 group-data-[selected=true]:rounded-full" />
              </Radio.Control>
              Male
            </Radio.Content>
          </Radio>
          <Radio value="female"  className={"group"}>
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator className="group-data-[selected=true]:bg-blue-900 group-data-[selected=true]:rounded-full" />
              </Radio.Control>
              female
            </Radio.Content>
          </Radio>
        </RadioGroup>
        )}
      />
      {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
        <Button type="submit" className={"w-full bg-blue-900"}>
          Register
        </Button>
      </form>
    </section>
  );
}
