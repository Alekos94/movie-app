import { Form } from "react-router";
import './RegisterPage.css'

export function RegisterPage () {
  return (
    <div className="register-page-wrapper">
      <div className="register-container">
        <div className="register-title">Register</div>
          <Form method="POST">
            <div className="input name">
            <label htmlFor="name">First Name</label>
            <input type="text" id="name" name="name" placeholder="First Name" required/>
            </div>

            <div className="input surname">
            <label htmlFor="surname">Last Name</label>
            <input type="text" id="surname" name="surname" placeholder="Last Name" required/>
            </div>

            <div className="input email">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Email Address" required/>
            </div>

            <div className="input password">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" minLength={6} required/>
            </div>
            
            <button className="btn sign-up">Sign Up</button>
          </Form>
        </div>
    </div>
  )
}


export async function registerAction ({ request }: { request: Request }) {
  const formData = await request.formData()
  const name = formData.get('name')
  const surname = formData.get('surname')
  const email = formData.get("email")
  const password = formData.get("password")

  const response = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, surname, email, password }),
  })

  if (!response.ok) {
    return await response.json()
  }
  const data = await response.json()
  console.log(data)

  //add redirect functionality 
}