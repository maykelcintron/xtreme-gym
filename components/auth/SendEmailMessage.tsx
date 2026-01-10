interface SendEmailMessageProps {
  type: 'success' | 'error';
  message: string;
}

const SendEmailMessage = ({type = 'success', message}: SendEmailMessageProps) => {
  return (
    <div className={`${type === 'success' ? 'bg-green-100 border border-green-400 text-center text-green-900 px-4 py-3 rounded relative' : 'bg-red-100 border border-red-400 text-center text-red-900 px-4 py-3 rounded relative'}`} role="alert">
        <span className="block sm:inline">{message}</span>
    </div>
  )
}

export default SendEmailMessage
