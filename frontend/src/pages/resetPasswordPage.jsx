import { useState, useRef } from "react";

export const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetComplete, setResetComplete] = useState(false);

  const confirmPasswordRef = useRef(null);

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleKeyPressNewPassword = (e) => {
    if (e.key === "Enter") {
      confirmPasswordRef.current.focus();
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleKeyPressConfirmPassword = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (newPassword === confirmPassword && newPassword.trim() !== "") {
      setResetComplete(true);
    }
  };

  return (
    <div className="flex flex-row w-full justify-center items-center h-screen text-left bg-black text-white px-6 md:px-20">
      <div className='w-5/12 flex flex-col'>
        {resetComplete ? (
          <>
            <h1 className='text-center text-3xl bg-black text-white px-6 md:text-4xl mb-4'>Successfully reset!</h1>
            <h2 className="text-center text-sm md:text-base font-serif italic opacity-75 mb-6">
                Please log-in with your new password.
            </h2>
        </>
        ) : (
          <>
            <h1 className="text-3xl pb-2 md:text-4xl mb-4">Reset your password.</h1>

            <h2 className="text-sm pb-0 md:text-base font-sans italic opacity-75 mb-6">
              Enter your new password.
            </h2>

            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              onKeyDown={handleKeyPressNewPassword}
              className="gradient mb-4"
            />

            <h2 className="text-sm pb-0 md:text-base font-sans italic opacity-75 mb-6">
              Confirm your new password.
            </h2>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onKeyDown={handleKeyPressConfirmPassword}
              className="gradient mb-4"
              ref={confirmPasswordRef}
            />
          </>
        )}
      </div>
    </div>
  );
};
