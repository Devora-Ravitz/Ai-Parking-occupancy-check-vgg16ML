

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './log-in.scss'

// const LogIn: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ username: '', email: '' });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setTimeout(() => {
//       navigate('/upload');
//     }, 5000); // עדכון ל-5000 מילישניות (5 שניות)
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: 'black',
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: 'white',
//           padding: '30px',
//           borderRadius: '5px',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <h2 style={{ textAlign: 'center', color: 'black' }}>Login</h2>
//         <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               required
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 border: '1px solid #ccc',
//                 borderRadius: '3px',
//                 boxSizing: 'border-box',
//               }}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               required
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 border: '1px solid #ccc',
//                 borderRadius: '3px',
//                 boxSizing: 'border-box',
//               }}
//             />
//           </div>
//           <button
//             type="submit"
//             style={{
//               width: '100%',
//               padding: '10px',
//               border: 'none',
//               borderRadius: '3px',
//               backgroundColor: 'black',
//               color: 'white',
//               cursor: 'pointer',
//               transition: 'background-color 0.3s',
//             }}
//           >
//             Log In
//           </button>
//           {isLoading && (
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//                 animation: 'blink 1s infinite alternate', // הוספת אנימציה
//               }}
//             >
//               <p style={{ margin: '0', color: 'red', fontSize: '24px' }}>Loading...</p>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LogIn;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './log-in.scss';

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate('/upload');
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LogIn;
