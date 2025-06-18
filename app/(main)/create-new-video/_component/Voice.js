import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
const voiceOption = [
  { value: "us_sarah", name: "🇺🇸 Sarah (Female)" },
  { value: "us_sky", name: "🇺🇸 Sky (Female)" },
  { value: "us_adam", name: "🇺🇸 Adam (Male)" },
  { value: "in_alpha", name: "🇮🇳 Alpha (Female)" },
  { value: "in_beta", name: "🇮🇳 Beta (Female)" },
  { value: "in_omega", name: "🇮🇳 Omega (Male)" },
  { value: "in_psi", name: "🇮🇳 Psi (Male)" },
  { value: "us_echo", name: "🇺🇸 Echo (Male)" },
  { value: "us_eric", name: "🇺🇸 Eric (Male)" },
  { value: "us_fenrir", name: "🇺🇸 Fenrir (Male)" },
  { value: "us_liam", name: "🇺🇸 Liam (Male)" },
  { value: "us_michael", name: "🇺🇸 Michael (Male)" },
  { value: "us_onyx", name: "🇺🇸 Onyx (Male)" },
];
export const Voice = ({ onHandleInputChange }) => {
  const [selectedVoiceOption, setSelectedVoiceOption] = useState("");

  return (
    <div className="mt-5">
      <h2> Voice</h2>
      <p>Select voice for your video</p>
      <ScrollArea className="h-[200px] w-full p-4">
        <div className=" grid grid-cols-2 gap-2">
          {voiceOption.map((option, index) => (
            <h2
              key={index}
              className={`cursor-pointer p-3 dark:bg-slate-900 dark:border-white hover:border rounded-lg ${selectedVoiceOption===option.name&&"border"}`}
              onClick={() => {
                onHandleInputChange("voice", option.name),
                  setSelectedVoiceOption(option.name);
              }}
            >
              {option.name}
            </h2>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
