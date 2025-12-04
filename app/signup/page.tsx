import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">회원가입</CardTitle>
          <CardDescription className="text-zinc-400">
            새로운 계정을 생성하고 학습을 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input 
              type="text" 
              placeholder="닉네임" 
              className="bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Input 
              type="email" 
              placeholder="이메일" 
              className="bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="비밀번호" 
              className="bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="비밀번호 확인" 
              className="bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 transition-colors"
            />
          </div>
          
          <Button type="submit" className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-bold mt-2">
            계정 생성하기
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-zinc-400">
          <div>
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              로그인
            </Link>
          </div>
          <Link href="/" className="text-xs hover:text-white transition-colors">
            홈으로 돌아가기
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
