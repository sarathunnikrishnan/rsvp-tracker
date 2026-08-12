import { envConfig } from '../config/env.config';

/**
 * Generates a clean, modern, glassmorphic HTML landing page confirming backend operational status.
 */
export function renderStatusPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dexqbit API — Server Operational</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #0a0e17;
      --card-bg: rgba(18, 26, 43, 0.75);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-cyan: #00F2FE;
      --accent-blue: #4FACFE;
      --accent-emerald: #10B981;
      --text-main: #F3F4F6;
      --text-muted: #9CA3AF;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg-dark);
      background-image: 
        radial-gradient(circle at 15% 20%, rgba(79, 172, 254, 0.15) 0%, transparent 45%),
        radial-gradient(circle at 85% 80%, rgba(0, 242, 254, 0.12) 0%, transparent 45%);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .container {
      max-width: 580px;
      width: 100%;
    }

    .card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      animation: fadeIn 0.6s ease-out;
      text-align: center;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 9999px;
      color: #34D399;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 24px;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: #34D399;
      border-radius: 50%;
      box-shadow: 0 0 10px #34D399;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(52, 211, 153, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
    }

    h1 {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 700;
      background: linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }

    p.subtitle {
      color: var(--text-muted);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 16px;
    }

    .metric-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 16px;
      transition: transform 0.2s, background 0.2s;
    }

    .metric-box:hover {
      background: rgba(255, 255, 255, 0.06);
      transform: translateY(-2px);
    }

    .metric-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 6px;
      font-weight: 500;
    }

    .metric-value {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-main);
    }

    .metric-value.highlight {
      color: var(--accent-cyan);
    }

    footer {
      margin-top: 24px;
      text-align: center;
      font-size: 0.8rem;
      color: rgba(156, 163, 175, 0.6);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header-badge">
        <span class="pulse-dot"></span>
        SYSTEM OPERATIONAL
      </div>

      <h1>Dexqbit Backend Server</h1>
      <p class="subtitle">Express backend service is running successfully and connected to MySQL database.</p>

      <div class="grid">
        <div class="metric-box">
          <div class="metric-label">Database</div>
          <div class="metric-value highlight">Connected</div>
        </div>
        <div class="metric-box">
          <div class="metric-label">Environment</div>
          <div class="metric-value">${envConfig.nodeEnv}</div>
        </div>
        <div class="metric-box">
          <div class="metric-label">Port</div>
          <div class="metric-value">${envConfig.port}</div>
        </div>
        <div class="metric-box">
          <div class="metric-label">Status</div>
          <div class="metric-value">200 OK</div>
        </div>
      </div>
    </div>

    <footer>
      Powered by Dexqbit RSVP Tracker • Express.js & MySQL
    </footer>
  </div>
</body>
</html>`;
}
