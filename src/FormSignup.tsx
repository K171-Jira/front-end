import React from 'react'

const FormSignup = () => {
  return (
    <div className="form-content-right">
      <form className="form">
        <h1 className="form-title">Sign Up</h1>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label">Email</label>
            <input type="email" name="email" className="form-input" placeholder="Enter your email" />
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" className="form-input" placeholder="Enter your password" />
        </div>
        <div className="form-inputs">
          <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" name="firstName" className="form-input" placeholder="Enter your first name" />
        </div>
        <div className="form-inputs">
          <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" name="lastName" className="form-input" placeholder="Enter your last name" />
        </div>
        <button className="form-input-btn" type="submit">Sign Up</button>
        <span className="form-input-login">Already have an account ? Login <a href='#'>here</a></span>
      </form>
    </div>
  )
}

export default FormSignup