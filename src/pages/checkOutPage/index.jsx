import {z} from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect,useState } from 'react';
import OrderSummary from '../../components/orderSummary';

function CheckOutPage() {

    const [step,setStep]=useState(1);
    const [formData,setFormData]=useState([])
    const schema=z.object({
        fname:z.string().min(1,'Enter the name'),
        lname:z.string().min(1,'Enter the last name'),
        email:z.string().email('Enter valid email'),
        phone:z.string().min(10,'enter full phone number').max(10,'please enter valid number'),
        address:z.string().min(5,'Enter your shipping address'),
        rememberMe:z.boolean().optional(),

    })

    const {register, handleSubmit, formState:{errors,isSubmitting},reset,watch}=useForm({
        resolver:zodResolver(schema),
        defaultValues:{rememberMe:false}
    })

    const onSubmit=(data)=>{
        console.log(data);

        if(data.rememberMe){
            localStorage.setItem('checkout-form',JSON.stringify(data))
        }else{
            localStorage.removeItem('checkout-form')
        }
        setFormData(data)
        setStep(2);
    }

    useEffect(()=>{
        const localData= localStorage.getItem('checkout-form');
        if(localData){
            const parsed=JSON.parse(localData)
            const {rememberMe,...rest}=parsed; //while filling form with rest makesure rememberMe is unchecked
            reset(rest)
        }

    },[reset])

    if(step === 2) return <OrderSummary
  cartItems={[
    { id: 1, name: "Nike Shoes", price: 2999, qty: 1 },
    { id: 2, name: "T-shirt", price: 999, qty: 2 }
  ]}
  billingInfo={formData}  // from previous step
  onBack={() => setStep(1)}
  onSubmit={() => setStep(3)}  // go to payment
/>


    if(step===1)return ( 
        <form
  onSubmit={handleSubmit(onSubmit)}
  className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
>
  <fieldset className="space-y-4">
    <legend className="text-xl font-semibold mb-2">Billing Address</legend>

    {/* First Name */}
    <div className="flex flex-col">
      <label htmlFor="fname" className="text-sm font-medium">First name</label>
      <input
        {...register("fname")}
        id="fname"
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
      />
      {errors.fname && (
        <span className="text-red-500 text-sm">{errors.fname.message}</span>
      )}
    </div>

    {/* Last Name */}
    <div className="flex flex-col">
      <label htmlFor="lname" className="text-sm font-medium">Last name</label>
      <input
        {...register("lname")}
        id="lname"
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
      />
      {errors.lname && (
        <span className="text-red-500 text-sm">{errors.lname.message}</span>
      )}
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label htmlFor="email" className="text-sm font-medium">Email</label>
      <input
        {...register("email")}
        id="email"
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
      />
      {errors.email && (
        <span className="text-red-500 text-sm">{errors.email.message}</span>
      )}
    </div>

    {/* Phone */}
    <div className="flex flex-col">
      <label htmlFor="phone" className="text-sm font-medium">Phone number</label>
      <input
        {...register("phone")}
        id="phone"
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
      />
      {errors.phone && (
        <span className="text-red-500 text-sm">{errors.phone.message}</span>
      )}
    </div>

    {/* Address */}
    <div className="flex flex-col">
      <label htmlFor="address" className="text-sm font-medium">Address</label>
      <textarea
        {...register("address")}
        id="address"
        className="border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-400"
      />
      {errors.address && (
        <span className="text-red-500 text-sm">{errors.address.message}</span>
      )}
    </div>

    {/* Remember Me */}
    <label className="flex items-center gap-2">
      <input type="checkbox" {...register("rememberMe")} />
      <span>Remember me</span>
    </label>

    {/* Submit */}
    <button
      type="submit"
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  </fieldset>
</form>

     );
}

export default CheckOutPage;