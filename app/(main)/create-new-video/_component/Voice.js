import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
const voiceOption = [
  { value: "us_alloy", name: "🇺🇸 Alloy (Female)" },
  { value: "us_aoede", name: "🇺🇸 Aoede (Female)" },
  { value: "us_bella", name: "🇺🇸 Bella (Female)" },
  { value: "us_jessica", name: "🇺🇸 Jessica (Female)" },
  { value: "us_kore", name: "🇺🇸 Kore (Female)" },
  { value: "us_nicole", name: "🇺🇸 Nicole (Female)" },
  { value: "us_nova", name: "🇺🇸 Nova (Female)" },
  { value: "us_river", name: "🇺🇸 River (Female)" },
  { value: "us_sarah", name: "🇺🇸 Sarah (Female)" },
  { value: "us_sky", name: "🇺🇸 Sky (Female)" },
  { value: "us_adam", name: "🇺🇸 Adam (Male)" },
  { value: "am_echo", name: "🇺🇸 Echo (Male)" },
  { value: "am_eric", name: "🇺🇸 Eric (Male)" },
  { value: "am_fenrir", name: "🇺🇸 Fenrir (Male)" },
  { value: "am_liam", name: "🇺🇸 Liam (Male)" },
  { value: "am_michael", name: "🇺🇸 Michael (Male)" },
  { value: "am_onyx", name: "🇺🇸 Onyx (Male)" },
  { value: "am_puck", name: "🇺🇸 Puck (Male)" },
  { value: "bf_alice", name: "Alice (Female)" },
  { value: "bf_emma", name: "Emma (Female)" },
  { value: "bf_isabella", name: "Isabella (Female)" },
  { value: "ff_siwis", name: "🇫🇷 Siwis (Female)" },
  { value: "hf_alpha", name: "🇮🇳 Alpha (Female)" },
  { value: "hf_beta", name: "🇮🇳 Beta (Female)" },
  { value: "hm_omega", name: "🇮🇳 Omega (Male)" },
  { value: "hm_psi", name: "🇮🇳 Psi (Male)" },
  { value: "aura-asteria-en", name: "🇺🇸 Asteria (Female)" },
  { value: "aura-luna-en", name: "🇺🇸 Luna (Female)" },
  { value: "aura-stella-en", name: "🇺🇸 Stella (Female)" },
  { value: "aura-athena-en", name: "🇬🇧 Athena (Female)" },
  { value: "aura-hera-en", name: "🇺🇸 Hera (Female)" },
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
                onHandleInputChange("voice", option.value),
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
