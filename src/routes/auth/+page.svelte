<script>
    import axios from 'axios';
    import crypto from 'crypto-js';
    import { goto } from '$app/navigation';
    import { isLoggedIn, sharedUsername, sharedEmail } from '$lib/stores/auth';

    let isLogin = true;
    let email = '';
    let password = '';
    let confirmPassword = '';
    let username = '';
    
    async function handleSubmit() {
      if (isLogin) {

        console.log('Logging in with:', { email, password });
        await handleLogin();
        goto("/")
      } else {

        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        console.log('Signing up with:', { email, password });
        await handleSignUp()
        goto("/")
      }
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8082/login', {
                username,
                email,
                password: crypto.SHA256(password).toString(),
            });
            
            if (response.data.token) {
              if (response.data.username) {
                username = response.data.username
              }
              sessionStorage.setItem('authToken', response.data.token);
              sessionStorage.setItem('username', username);
              sessionStorage.setItem('email', email);
              
              isLoggedIn.set(true);
              sharedUsername.set(username);
              sharedEmail.set(email);
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
        }
    };

    const handleSignUp = async () => { 
        try {
            const response = await axios.post('http://localhost:8082/signup', {
                username,
                email, 
                password: crypto.SHA256(password).toString()
            });
            
            if (response.data.token) {
                sessionStorage.setItem('authToken', response.data.token);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('email', email);
                
                isLoggedIn.set(true);
                sharedUsername.set(username);
                sharedEmail.set(email);
            }
        } catch (error) {
            console.error('Signup failed:', error.response?.data?.message || error.message);
        }
    };
  </script>
  
  <div class="auth-container w-full">
    <div class="auth-box">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      
      <form on:submit|preventDefault={handleSubmit}>
        {#if !isLogin}
          <div class="input-group">
            <label for="username">Username</label>
            <input 
              type="username" 
              id="username" 
              bind:value={username} 
              required
            />
          </div>
        {/if}

        <div class="input-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            bind:value={email} 
            required
          />
        </div>
        
        <div class="input-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            bind:value={password} 
            required
          />
        </div>
        
        {#if !isLogin}
          <div class="input-group">
            <label for="confirm-password">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              bind:value={confirmPassword} 
              required
            />
          </div>
        {/if}
        
        <button type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      <p class="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button class="link-button" on:click={() => isLogin = !isLogin}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  </div>
  
  <style>
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
  
    .auth-box {
      background-color: #ffddb6;  
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
  
    h1 {
      text-align: center;
      color: #3c2412;
      margin-bottom: 2rem;
    }
  
    .input-group {
      margin-bottom: 1rem;
    }
  
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #3c2412;
    }
  
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #3c2412;
      border-radius: 4px;
      background-color: white;
    }
  
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #3c2412;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }
  
    button:hover {
      background-color: #2a1a0d;
    }
  
    .toggle-text {
      text-align: center;
      margin-top: 1rem;
      color: #3c2412;
    }
  
    .link-button {
      background: none;
      border: none;
      color: #3c2412;
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
      margin: 0;
      font-size: inherit;
    }
  
    .link-button:hover {
      color: #2a1a0d;
      background: none;
    }
  </style>