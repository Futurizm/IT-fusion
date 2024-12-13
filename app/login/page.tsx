'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield } from 'lucide-react'
import Image from "next/image"
import loginImage from "@/public/images/vnos.jpg";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const login = formData.get('login') as string
    const password = formData.get('password') as string

   if (login === 'admin' && password === '123') {
  console.log("Авторизация успешна, устанавливаем cookie");
  document.cookie = "isLoggedIn=true; path=/;";
  console.log("Редирект на главную страницу...");
  router.push('/');
} else {
  setError("Неверный логин или пароль.");
}

  }
  return (
    <div className="flex min-h-screen">
      {/* Логин форма */}
      <div className="flex flex-col items-center justify-center w-1/2 bg-white p-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Shield className="h-12 w-12 text-blue-600" />
          <h1 className="text-2xl font-semibold tracking-tight">Добро пожаловать в</h1>
          <h2 className="text-3xl font-bold text-blue-600">CityLion</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          <div className="space-y-2">
          <Label htmlFor="login" className="text-blue-600 font-semibold">Логин</Label>
          <Input id="login" name="login" placeholder="admin" required />
          </div>
          <div className="space-y-2">
          <Label htmlFor="password" className="text-blue-600 font-semibold">Пароль</Label>
          <Input id="password" name="password" type="password" required />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Войти
          </Button>
        </form>
      </div>

      {/* Изображение */}
      <div className="w-1/2 relative">
        <Image 
          src={loginImage} 
          alt="Login Image" 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"  // This defines the image size for different screen sizes
          style={{ objectFit: "cover" }} 
          className="rounded-r-lg" 
        />
        
      </div>
    </div>
  )
}
