import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabaseURL, supabaseAnonKey } from '../Clients/supabase'; // Import the environment variables

// Create a Supabase client instance
const supabase = createClient(supabaseURL, supabaseAnonKey);

// Login Component
const Login = () => {
  /** 
   * Function to handle login using GitHub
   */
  const handleLogin = async () => {
    try {
      /** 
       * Attempt to sign in using Supabase authentication with GitHub provider  
       * Note: This assumes you've set up GitHub as an authentication provider in your Supabase project.
       */
      await supabase.auth.signIn({
        provider: 'github',
      });
    } catch (error) {
      /** 
       * Handle errors if any occur during the login process  
       * Output the error message to the console
       */
      console.error('Error logging in:', error.message);
    }
  };

  /** 
   * Render the Login component  
   * It consists of a heading and a button to trigger the GitHub login
   */
  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

/** 
 * Export the Login component as the default export  
 * This allows the component to be imported with a different name if needed
 */
export default Login;
