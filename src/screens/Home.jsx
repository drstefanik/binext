import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <h1 className="title">BI NEXT</h1>
        <p className="subtitle">Accesso a contenuti e risorse per Scuole e Studenti</p>
        <div className="row">
          <Link to="/login" className="btn primary">Entra</Link>
          <a className="btn" href="https://www.britishinstitutes.it" target="_blank" rel="noreferrer">Sito principale</a>
        </div>
        <p className="muted" style={{marginTop:24}}>Hai bisogno di aiuto? Contatta il tuo centro British Institutes.</p>
      </div>
    </div>
  )
}
