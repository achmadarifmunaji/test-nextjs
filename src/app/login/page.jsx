"use client";

import { authenticate } from "@/lib/action";

function LoginPage() {

    const handleLogin = async (formData) => {
        const login = await authenticate(formData);
    }

  return (
    <div>
        <form action={handleLogin}>
            <div className="grid w-full items-center gap-4 mb-2">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="username">Username</label>
                <input id="username" placeholder="Username" name="username" />
                <input type="hidden" name="whoLogin" value='admin' />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password">Password</label>
                <input id="password" placeholder="Password" type="password" name="password" />
              </div>
            </div>
            <button >Masuk</button>            
          </form>
    </div>
  )
}

export default LoginPage