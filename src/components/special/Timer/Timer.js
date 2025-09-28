import React, { useState, useEffect } from 'react';
import './timer.css';

export const Timer = ({ initialTime = 120, handleResend, isOTPPending }) => {
  const [timer, setTimer] = useState(initialTime);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleResendCode = () => {
    setTimer(initialTime);
    setIsResendDisabled(true);
    if (handleResend) {
      handleResend();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className='resend-timer'>
      {isResendDisabled ? (
        <div className='timer-text'> {formatTime(timer)} مانده تا دریافت مجدد کد</div>
      ) : (
        <button type='button' className='resend-button' onClick={handleResendCode} disabled={isOTPPending}>
          {isOTPPending ? 'در حال ارسال...' : 'دریافت مجدد کد'}
        </button>
      )}
    </div>
  );
};
