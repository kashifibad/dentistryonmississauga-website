import { useState, useEffect } from 'react';

function computeClinicOpen(): boolean {
  try {
    const now = new Date();
    const tz = 'America/Toronto';
    const weekday = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' }).format(now);
    const hour = parseInt(new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: '2-digit', hour12: false }).format(now), 10);
    const minute = parseInt(new Intl.DateTimeFormat('en-US', { timeZone: tz, minute: '2-digit' }).format(now), 10);
    const total = hour * 60 + minute;
    if (weekday === 'Sun') return false;
    if (weekday === 'Sat') return total >= 10 * 60 && total < 17 * 60;
    return total >= 11 * 60 && total < 20 * 60;
  } catch {
    return false;
  }
}

// Returns live open/closed status, re-evaluated every minute aligned to the clock.
export function useClinicOpen(): boolean {
  const [open, setOpen] = useState(computeClinicOpen);

  useEffect(() => {
    // Align the first tick to the next full minute so transitions happen exactly on time.
    const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000 - new Date().getMilliseconds();

    const timeout = setTimeout(() => {
      setOpen(computeClinicOpen());
      const interval = setInterval(() => setOpen(computeClinicOpen()), 60_000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  return open;
}
