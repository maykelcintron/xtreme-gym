import AuthForm from "@/components/auth/AuthForm";


export default function page() {
  return (
    <div className="flex justify-center items-center">
      <AuthForm isLogin={false} />
    </div>
  )
}
