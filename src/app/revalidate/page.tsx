'use client'

import { useState } from 'react'

export default function RevalidatePage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleRevalidate = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/revalidate', { method: 'POST', credentials: 'include' })
      if (res.ok) {
        setStatus('success')
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const config: Record<string, { label: string; bg: string }> = {
    idle: { label: 'Применить изменения на сайте', bg: '#10b981' },
    loading: { label: 'Обновление...', bg: '#6B7280' },
    success: { label: 'Готово! Изменения применены', bg: '#059669' },
    error: { label: 'Ошибка, попробуйте ещё раз', bg: '#ef4444' },
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#141414',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px',
    }}>
      <div style={{
        background: '#1e1e1e',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '440px',
        width: '100%',
        textAlign: 'center',
      }}>
        <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
          Управление сайтом
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '32px' }}>
          Нажмите кнопку после внесения изменений в админке,
          чтобы они появились на сайте
        </p>
        <button
          onClick={handleRevalidate}
          disabled={status === 'loading'}
          style={{
            backgroundColor: config[status].bg,
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '14px 28px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: status === 'loading' ? 'wait' : 'pointer',
            width: '100%',
            transition: 'background-color 0.2s',
          }}
        >
          {config[status].label}
        </button>
        <a
          href="/admin"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            color: '#6b7280',
            fontSize: '13px',
            textDecoration: 'none',
          }}
        >
          ← Вернуться в админку
        </a>
      </div>
    </div>
  )
}
