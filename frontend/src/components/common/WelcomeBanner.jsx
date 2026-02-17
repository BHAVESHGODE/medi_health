import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function WelcomeBanner({ userName, message }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-500 p-6 text-white mb-8 animate-fade-in">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white opacity-5" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white opacity-5" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <AutoAwesomeIcon style={{ fontSize: 24 }} />
          </div>
          <div>
            <h2 className="text-xl font-bold">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {userName || 'there'}! 👋
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
