import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
const voiceOption = [
  {
    "value": "af_alloy",
    "name": "🇺🇸 Alloy (Female)"
  },
  {
    "value": "af_aoede",
    "name": "🇺🇸 Aoede (Female)"
  },
  {
    "value": "af_bella",
    "name": "🇺🇸 Bella (Female)"
  },
  {
    "value": "af_jessica",
    "name": "🇺🇸 Jessica (Female)"
  },
  {
    "value": "af_kore",
    "name": "🇺🇸 Kore (Female)"
  },
  {
    "value": "af_nicole",
    "name": "🇺🇸 Nicole (Female)"
  },
  {
    "value": "af_nova",
    "name": "🇺🇸 Nova (Female)"
  },
  {
    "value": "af_river",
    "name": "🇺🇸 River (Female)"
  },
  {
    "value": "af_sarah",
    "name": "🇺🇸 Sarah (Female)"
  },
  {
    "value": "af_sky",
    "name": "🇺🇸 Sky (Female)"
  },
  {
    "value": "am_adam",
    "name": "🇺🇸 Adam (Male)"
  },
  {
    "value": "bm_lewis",
    "name": "🇬🇧 Lewis (Male)"
  },
  {
    "value": "ff_siwis",
    "name": "🇫🇷 Siwis (Female)"
  },
  {
    "value": "hf_alpha",
    "name": "🇮🇳 Alpha (Female)"
  },
  {
    "value": "hf_beta",
    "name": "🇮🇳 Beta (Female)"
  },
  {
    "value": "hm_omega",
    "name": "🇮🇳 Omega (Male)"
  },
  {
    "value": "hm_psi",
    "name": "🇮🇳 Psi (Male)"
  },
  {
    "value": "aura-asteria-en",
    "name": "🇺🇸 Asteria (Female)"
  },
  {
    "value": "aura-luna-en",
    "name": "🇺🇸 Luna (Female)"
  },
  {
    "value": "aura-stella-en",
    "name": "🇺🇸 Stella (Female)"
  },
  {
    "value": "aura-athena-en",
    "name": "🇬🇧 Athena (Female)"
  }

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
