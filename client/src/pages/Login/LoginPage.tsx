import { Form, redirect, useActionData } from "react-router"
import "./LoginPage.css"
export function LoginPage() {
  const actionData = useActionData()
  console.log(actionData)
  return (
    <div className="login-page-wrapper">
    <div className="login-container">
      <div className="login-title">LOG IN</div>
      <Form className="login-form" method="POST">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Type your email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Type your email"
          minLength={6}
          required
        />
        <button>Sign In</button>
      </Form>
    </div>
    </div>
  )
}

export async function loginPageAction({ request }: { request: Request }) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  const response = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    return await response.json()
  }
  const data = await response.json()
  console.log(data)

  // return redirect('/')
}
