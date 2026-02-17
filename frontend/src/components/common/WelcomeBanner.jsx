import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import NightsStayIcon from '@mui/icons-material/NightsStay';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good Morning', icon: <WbSunnyIcon style={{ fontSize: 24 }} /> };
  if (hour < 18) return { text: 'Good Afternoon', icon: <WbTwilightIcon style={{ fontSize: 24 }} /> };
  return { text: 'Good Evening', icon: <NightsStayIcon style={{ fontSize: 24 }} /> };
};

export default function WelcomeBanner({ userName, message }) {
  const [dismissed, setDismissed] = useState(false);
  const greeting = getGreeting();

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-500 p-6 text-white mb-8 animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path fill="currentColor" d="M45.7,-58.8C58.9,-49.7,69,-36.5,76.1,-21.4C83.2,-6.3,87.3,10.7,82.8,25.6C78.3,40.5,65.2,53.3,51.1,62.1C37,70.9,21.9,75.7,5.8,74.9C-10.3,74.1,-27.4,67.7,-41.8,57.4C-56.2,47.1,-67.9,32.9,-72.4,16.3C-76.9,-0.3,-74.2,-19.3,-66.4,-35.8C-58.6,-52.3,-45.7,-66.3,-31.2,-74.1C-16.7,-81.9,-0.6,-83.5,14.2,-79.3C29,-75.1,44.2,-65.3,45.7,-58.8Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path fill="currentColor" d="M45.7,-58.8C58.9,-49.7,69,-36.5,76.1,-21.4C83.2,-6.3,87.3,10.7,82.8,25.6C78.3,40.5,65.2,53.3,51.1,62.1C37,70.9,21.9,75.7,5.8,74.9C-10.3,74.1,-27.4,67.7,-41.8,57.4C-56.2,47.1,-67.9,32.9,-72.4,16.3C-76.9,-0.3,-74.2,-19.3,-66.4,-35.8C-58.6,-52.3,-45.7,-66.3,-31.2,-74.1C-16.7,-81.9,-0.6,-83.5,14.2,-79.3C29,-75.1,44.2,-65.3,45.7,-58.8Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            {greeting.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {greeting.text}, {userName || 'there'}
            </h2>
            <p className="text-sm text-white/80 mt-0.5">
              {message || "Here's what's happening at MediHealth today."}
            </p>
          </div>
        </div>
        <button onClick={() => setDismissed(true)} className="text-white/60 hover:text-white transition-colors p-1">
          <CloseIcon style={{ fontSize: 20 }} />
        </button>
      </div>
    </div>
  );
}
