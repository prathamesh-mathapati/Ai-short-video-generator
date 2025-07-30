"use client";

import { useAuthContext } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import { CircleDollarSign } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const creditPlans = [
  { credits: 10, cost: 1 },
  { credits: 50, cost: 5 },
  { credits: 100, cost: 9 },
  { credits: 200, cost: 15 },
  { credits: 300, cost: 32 },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { staggerChildren: 0.2, ease: "easeOut" } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    transition: { duration: 0.3 },
  },
};

const balanceVariants = {
  initial: { scale: 1 },
  updated: { scale: 1.1, transition: { yoyo: 1, duration: 0.3 } },
};

const Billing = (item) => {
  const { user, setUesr } = useAuthContext();
  const updateUserCredits = useMutation(api.users.GetUpdateCreated);
  const [balanceAnimation, setBalanceAnimation] = React.useState("initial");

  const onApprove = async (item) => {
    const newCredits = Number(user?.credits) + Number(item.cost);
    const result = await updateUserCredits({
      uid: user?._id,
      credits: newCredits,
    });
    setUesr((prev) => ({
      ...prev,
      credits: newCredits,
    }));
    setBalanceAnimation("updated");
    setTimeout(() => setBalanceAnimation("initial"), 300);
    toast.success("Credits Added!");
    console.log(result);
  };

  return (
    <motion.div
      className="p-10 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="font-bold text-3xl mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Credits
      </motion.h2>

      <motion.div
        className="p-4 border rounded-xl flex justify-between mt-7"
        variants={itemVariants}
      >
        <div>
          <h2 className="font-bold text-xl">Total Credits Left</h2>
          <h2 className="text-sm">1 Credit = 1 Video</h2>
        </div>
        <motion.h2
          className="font-bold text-3xl flex items-center gap-2"
          variants={balanceVariants}
          animate={balanceAnimation}
          key={user?.credits}
        >
          <CircleDollarSign className="text-green-600" />
          {user?.credits ?? 0} Credits
        </motion.h2>
      </motion.div>

      <p className="text-sm p-5 text-gray-500 max-w-2xl mx-auto">
        When your credit balance reaches $0, your video generation will stop working. Add credits to top up your balance.
      </p>

      <motion.div
        className="mt-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="font-bold text-2xl mb-4"
          variants={itemVariants}
        >
          Buy More Credits
        </motion.h2>

        {creditPlans.map((item, index) => (
          <motion.div
            className="p-5 mt-3 border rounded-xl flex justify-between items-center"
            key={index}
            variants={itemVariants}
            whileHover="hover"
          >
            <h2 className="text-xl flex gap-2 items-center">
              <CircleDollarSign className="text-yellow-600" />
              <strong>{item.credits}</strong> Credits
            </h2>
            <div className="flex gap-2 items-center">
              <h2 className="font-medium text-xl">{item?.cost} $</h2>
              <PayPalButtons
                style={{ layout: "horizontal", tagline: false }}
                onCancel={() => console.log("Cancel")}
                onApprove={() => onApprove(item)}
                createOrder={(data, action) => {
                  return action?.order?.create({
                    purchase_units: [
                      {
                        amount: {
                          value: item.cost,
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Billing;