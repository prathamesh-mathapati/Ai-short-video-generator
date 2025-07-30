"use client";
import { useAuthContext } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import { CircleDollarSign } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const creditPlans = [
    {
        credits: 10,
        cost: 1
    }, {
        credits: 50,
        cost: 5
    }, {
        credits: 100,
        cost: 9
    }, {
        credits: 200,
        cost: 15
    }, {
        credits: 300,
        cost: 32
    }
]

const Billing = (item) => {
    const {user,setUesr}=useAuthContext()
    const updateUserCredits=useMutation(api.users.GetUpdateCreated)
    const onApprove=async(item)=>{
        const result=await updateUserCredits({
            uid:user?._id,
            credits:Number(user?.credits)+Number(item.cost)
        })
        setUesr(perv=>({
            ...perv,credits:Number(user?.credits)+Number(item.cost)
        }))
        console.log(result)
        toast("Credits Added!")
    }
    return (
        <div className="p-10">
            <h2 className="font-bold text-3xl">Credits</h2>
            <div className="p-4 border  rounded-xl flex justify-between  mt-7 max-w-2xl">
                <div>
                    <h2 className=" font-bold text-xl">Total Credits Left</h2>
                    <h2 className="text-sm">1 Credits = 1 Video</h2>
                </div>
                <h2 className="font-bold text-3xl ">2 Credits</h2>
            </div>
            <p className="text-sm p-5 text-gray-500 max-w-2xl">
                When your credit balance reaches $0, your Video generation will stop
                working. Add Credits balance topped up.
            </p>
            <div className="mt-5">
                <h2 className="font-bold text-2xl">Buy More Credits</h2>
                <div className="">
                    {
                        creditPlans.map((item, index) => (
                            <div className="p-5 mt-3 border rounded-xl max-w-2xl flex justify-between items-center" key={index}>
                                <h2 className=" text-xl flex gap-2 items-center">
                                    <CircleDollarSign />
                                    <strong>{item.credits}</strong> Credits
                                </h2>
                                <div className="flex gap-2 items-center">
                                    <h2 className="font-medium text-xl">{item?.cost} $</h2>
                                    <PayPalButtons style={{ layout: "horizontal", tagline: false }}
                                        onCancel={() => console.log("Cancel")}
                                        onApprove={()=>onApprove(item)}
                                        createOrder={(data, action) => {
                                            return action?.order?.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: item.cost,
                                                            currency_code: "USD"
                                                        }
                                                    }
                                                ]
                                            })

                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    );
};

export default Billing
