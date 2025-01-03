// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const ResetPassword = () => {
//   const { token } = useParams(); // Get token from URL parameters
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isTokenValid, setIsTokenValid] = useState(false); // Flag to check token validity

//   useEffect(() => {
//     const validateToken = async () => {
//       try {
//         // Send GET request to validate the token
//         const response = await fetch(`http://localhost:8080/resetPassword/${token}`, {
//           method: "GET", // Validate token with GET request
//         });

//         const result = await response.json();
//         if (response.ok) {
//           setMessage(result.message);
//           setIsTokenValid(true); // Token is valid, show the form
//         } else {
//           setMessage(result.message);
//           setIsTokenValid(false); // Invalid token, no form
//         }
//       } catch (error) {
//         setMessage("An error occurred while validating the token.");
//         setIsTokenValid(false);
//       }
//     };

//     validateToken();
//   }, [token]); // Run this effect when the token changes

//   const handleResetPassword = async () => {
//     if (!newPassword.trim()) {
//       setMessage("Password cannot be empty.");
//       return;
//     }

//     try {
//       // POST request to reset password
//       const response = await fetch(`http://localhost:8080/resetPassword/${token}`, {
//         method: "POST",  // POST to reset password
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ newPassword }),  // Pass new password in body
//       });

//       const result = await response.json();
//       setMessage(result.message);
//     } catch (error) {
//       setMessage("An error occurred while resetting the password.");
//     }
//   };

//   return (
//     <div>
//       <h1>Reset Password</h1>

//       {isTokenValid ? (
//         <>
//           <input
//             type="password"
//             placeholder="Enter your new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <button onClick={handleResetPassword}>Reset Password</button>
//         </>
//       ) : (
//         <p>{message}</p>
//       )}

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;

import React from 'react'

const ResetPassword = () => {
  return (
    <div>ResetPassword</div>
  )
}

export default ResetPassword
