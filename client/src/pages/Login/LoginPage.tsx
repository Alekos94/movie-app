import { Form, redirect, useActionData} from "react-router";

export function LoginPage () {
  const actionData = useActionData()
  console.log(actionData)
  return (
    <Form method="POST">
      <label htmlFor="email">Email</label>
      <input type="email" id='email' name='email' placeholder="Type your email" required/>
      <label htmlFor="password">Password</label>
      <input type="password" id='password' name='password' placeholder="Type your email" minLength={6} required/>
      <button>Sign In</button>
    </Form>
  )
}

export async function loginPageAction ({ request }: { request: Request }) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  
  const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, password})
    })

    if (!response.ok) {
      return await response.json()
    }
    const data = await response.json()
    console.log(data)
    localStorage.setItem('token', data.token)
    
    return redirect('/')
}