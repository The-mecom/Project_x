:root{
  --bg1:#0b0b12;
  --bg2:#190b1a;
  --card:#121223cc;
  --stroke:#ffffff22;
  --text:#f6f6ff;
  --muted:#cfcfe6cc;
  --primary:#ff4d87;
  --primary2:#ff7ab0;
  --danger:#ff3b3b;
}

*{ box-sizing:border-box; }

html,body{ height:100%; }

body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
  color:var(--text);
  background: radial-gradient(1200px 800px at 20% 10%, #2b0f2f, transparent 60%),
              radial-gradient(1000px 700px at 80% 20%, #1a2b6a, transparent 60%),
              linear-gradient(160deg, var(--bg1), var(--bg2));
  display:grid;
  place-items:center;
  padding:24px;
  overflow:hidden;
}

.bg-hearts::before{
  content:"";
  position:fixed; inset:-20%;
  background-image:
    radial-gradient(circle at 10% 20%, #ff4d871a 0 6px, transparent 7px),
    radial-gradient(circle at 40% 60%, #ff7ab01a 0 7px, transparent 8px),
    radial-gradient(circle at 70% 30%, #ffd1e11a 0 5px, transparent 6px),
    radial-gradient(circle at 85% 75%, #ff4d8714 0 8px, transparent 9px);
  filter: blur(0px);
  animation: floaty 14s ease-in-out infinite alternate;
  pointer-events:none;
}

@keyframes floaty{
  from{ transform: translate3d(-1%, -1%, 0) scale(1); }
  to  { transform: translate3d(1%, 1%, 0) scale(1.02); }
}

/* Slideshow Styles */
.slideshow-wrapper {
  width: min(720px, 100%);
  position: relative;
  cursor: pointer;
}

.slide-card {
  display: none;
  padding: 80px 40px;
  border: 1px solid var(--stroke);
  border-radius: 24px;
  background: linear-gradient(180deg, var(--card), #0f0f1fcc);
  box-shadow: 0 20px 70px #00000066;
  backdrop-filter: blur(10px);
  text-align: center;
  min-height: 400px;
  position: relative;
}

.slide-card.active {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.slide-content {
  width: 100%;
}

.slide-number {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 14px;
  color: var(--muted);
  font-weight: 600;
  opacity: 0.6;
}

.slide-title {
  font-size: clamp(32px, 5vw, 52px);
  margin: 0 0 24px;
  font-weight: 800;
  line-height: 1.1;
  background: linear-gradient(135deg, var(--text), var(--primary2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slide-text {
  font-size: clamp(18px, 3vw, 24px);
  margin: 0 0 32px;
  color: var(--muted);
  line-height: 1.5;
}

.slide-subtext {
  font-size: 14px;
  color: var(--muted);
  opacity: 0.5;
  margin: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.slide-indicators {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
  padding: 0 40px;
}

.indicator {
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.indicator.active {
  background: var(--primary);
  width: 60px;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* Main Card Styles (existing) */
.card{
  width:min(720px, 100%);
  padding:28px 22px;
  border:1px solid var(--stroke);
  border-radius:24px;
  background: linear-gradient(180deg, var(--card), #0f0f1fcc);
  box-shadow: 0 20px 70px #00000066;
  backdrop-filter: blur(10px);
  animation: fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.tag{
  margin:0 0 10px;
  color:var(--muted);
  letter-spacing:.08em;
  text-transform: uppercase;
  font-size:12px;
}

h1{
  margin:0 0 10px;
  font-size: clamp(28px, 4.5vw, 44px);
  line-height:1.05;
}

.sub{
  margin:0 0 18px;
  color:var(--muted);
  font-size:16px;
  line-height:1.5;
}

.controls{
  display:flex;
  gap:12px;
  align-items:center;
  flex-wrap:wrap;
  margin: 10px 0 16px;
}

.hint{
  font-size:13px;
  color:var(--muted);
}

.embed{
  margin: 12px 0 18px;
  padding: 14px;
  border: 1px solid var(--stroke);
  border-radius: 18px;
  background: #0b0b16aa;
}

.embed-title{
  margin: 0 0 10px;
  color: var(--muted);
  font-size: 13px;
}

.actions{
  display:flex;
  gap:12px;
  margin-top:10px;
  flex-wrap:wrap;
}

.btn{
  border:none;
  border-radius: 16px;
  padding: 12px 16px;
  font-weight: 700;
  cursor:pointer;
  transition: transform .12s ease, filter .12s ease;
  user-select:none;
}

.btn:hover{ transform: translateY(-2px); filter: brightness(1.05); }
.btn:active{ transform: translateY(0px) scale(0.99); }

.primary{
  background: linear-gradient(135deg, var(--primary), var(--primary2));
  color:#16010a;
}

.secondary{
  background:#ffffff10;
  color:var(--text);
  border:1px solid var(--stroke);
}

.danger{
  background:#ffffff10;
  color:var(--text);
  border:1px solid #ff3b3b55;
}

.result{
  margin-top:18px;
  min-height: 48px;
  padding: 14px;
  border-radius: 18px;
  border: 1px dashed var(--stroke);
  color: var(--text);
  display:flex;
  align-items:center;
}

.footer{
  margin-top:14px;
  display:flex;
  justify-content:flex-end;
  color:var(--muted);
  font-size:13px;
}

/* Confetti styles (injected by JS but defined here for completeness) */
.confetti{
  position: fixed;
  z-index: 9999;
  background: white;
  border-radius: 3px;
  pointer-events:none;
  animation: fall linear forwards;
}

@keyframes fall{
  to{
    transform: translateY(110vh) rotate(720deg);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .slide-card {
    padding: 60px 24px;
    min-height: 350px;
  }
  
  .slide-title {
    font-size: 32px;
  }
  
  .slide-text {
    font-size: 18px;
  }
  
  .indicator {
    width: 30px;
  }
  
  .indicator.active {
    width: 45px;
  }
}
