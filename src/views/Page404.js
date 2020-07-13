import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <div className="page-wrap d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block text-primary">404</span>
            <div className="mb-4 lead text-light">Страница по этому адресу не найдена</div>
            <Link to='/' className="btn btn-link">На главную</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
