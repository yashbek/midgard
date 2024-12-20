const SignupForm = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      try {
        const response = await axios.post('http://localhost:8082/signup', {
          email,
          password: crypto.SHA256(password).toString()
        });
        
        if (response.data.token) {
          sessionStorage.setItem('authToken', response.data.token);
        }
      } catch (error) {
        console.error('Signup failed:', error.response?.data?.message || error.message);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <button type="submit">Sign Up</button>
      </form>
    );
  };