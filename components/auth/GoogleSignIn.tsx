import { google } from "@/actions/auth/google"

const GoogleSignIn = () => {
  return (
    <div 
        onClick={() => google()}
        className="flex items-center justify-center cursor-pointer bg-white text-center w-full p-2 text-md rounded-md text-gray-800 outline-none"
    >
        <img src="/google-logo.png" alt="Google Icon" className="w-6 h-6 mr-2 object-cover inline-block" />
        <span>
            Iniciar sesión con Google
        </span>
    </div>
  )
}

export default GoogleSignIn
