import React from 'react'

type PredictionButtonProps = {
  onClick: () => void
  disabled?: boolean
  /** HTML button type: default to “button” but allow “submit” */
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
}

const PredictionButton: React.FC<PredictionButtonProps> = ({
  onClick,
  disabled = false,
  type = 'button',
  children,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
  >
    {children}
  </button>
)

export default PredictionButton
