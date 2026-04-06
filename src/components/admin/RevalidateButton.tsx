'use client'

import React, { useState } from 'react'

const RevalidateButton: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleRevalidate = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/revalidate', { method: 'POST', credentials: 'include' })
      if (res.ok) {
        setStatus('success')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const labels: Record<string, string> = {
    idle: 'Применить изменения на сайте',
    loading: 'Обновление...',
    success: 'Готово! Изменения применены',
    error: 'Ошибка, попробуйте ещё раз',
  }

  const colors: Record<string, string> = {
    idle: '#10b981',
    loading: '#6B7280',
    success: '#059669',
    error: '#ef4444',
  }

  return (
    <div style={{ padding: '12px 16px' }}>
      <button
        onClick={handleRevalidate}
        disabled={status === 'loading'}
        style={{
          backgroundColor: colors[status],
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 12px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: status === 'loading' ? 'wait' : 'pointer',
          width: '100%',
          transition: 'background-color 0.2s',
        }}
      >
        {labels[status]}
      </button>
    </div>
  )
}

export default RevalidateButton
