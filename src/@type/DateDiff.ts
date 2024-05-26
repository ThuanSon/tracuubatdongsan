interface TimeDifference {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }
  
export function getTimeDifference(startDate: string | undefined): TimeDifference {
    if (!startDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  
    const now: Date = new Date();
    const start: Date = new Date(startDate);
  
    // Calculate the difference in milliseconds
    const diff: number = now.getTime() - start.getTime();
  
    // Convert the difference to days, hours, minutes, and seconds
    const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes: number = Math.floor((diff / (1000 * 60)) % 60);
    const seconds: number = Math.floor((diff / 1000) % 60);
  
    return { days, hours, minutes, seconds };
  }
  