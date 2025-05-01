import React from 'react'

type ErrorMessageProps = {
  /** The error text to display */
  message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div
    id="input-warning"
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm mb-4"
  >
    {message}
  </div>
)

export default ErrorMessage
