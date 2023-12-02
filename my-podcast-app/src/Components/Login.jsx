import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabaseURL, supabaseAnonKey } from '../Clients/supabase'; // Import the environment variables

const supabase = createClient(supabaseURL, supabaseAnonKey);

const Login = () => {
  /** 
   * Function to handle login using GitHub
   */
  const handleLogin = async () => {
    try {
      /** My attempt to sign in using Supabase authentication with GitHub provider  */
      await supabase.auth.signIn({
        provider: 'github',
      });
    } catch (error) {
      /** Handle errors if any occur during the login process  */
      console.error('Error logging in:', error.message);
    }
  };

  /** Render the Login component  */
  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

/** Export the Login component as the default export  */
export default Login;
