export default function Footer() {
  return (
    <footer className="surface-level-1" style={{
      padding: '4rem 2rem',
      marginTop: 'auto',
      borderTop: '1px solid rgba(73, 68, 86, 0.15)',
      textAlign: 'center'
    }}>
      <div className="container">
        <h2 className="text-display-sm" style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>ALPHA IT</h2>
        <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          ISTA BAB TIZIMI MEKNÈS - Engineering the future of tactical computing and obsidian architecture.
        </p>
        <div style={{ height: '1px', background: 'rgba(73, 68, 86, 0.15)', margin: '2rem 0' }}></div>
        <p className="text-label-md" style={{ fontWeight: 600 }}>
          Developed by <span style={{ color: 'var(--color-secondary)' }}>RIDA ELHAMZAOUI</span> - ISTA BAB TIZIMI MEKNÈS
        </p>
      </div>
    </footer>
  );
}
