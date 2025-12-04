import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { currentUser } from '@/lib/mock-data';
import { User, Settings, LogOut, Trash2 } from 'lucide-react';

export default function MyPage() {
  return (
    <div className=" px-4 md:px-8 py-12 max-w-4xl flex flex-col justify-center items-center">
      <h1 className="w-full text-3xl font-bold tracking-tight mb-8">내 정보</h1>
      <div className="space-y-6">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle>프로필 정보</CardTitle>
            <CardDescription>기본적인 회원 정보를 관리합니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">닉네임</label>
              <Input defaultValue={currentUser.name} disabled className="bg-zinc-950/50 border-zinc-800" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">이메일</label>
              <Input defaultValue={currentUser.email} disabled className="bg-zinc-950/50 border-zinc-800 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-900/50 bg-red-950/10">
          <CardHeader>
            <CardTitle className="text-red-500">계정 삭제</CardTitle>
            <CardDescription className="text-red-400/70">
              계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-end border-t border-red-900/20 pt-6">
            <Button variant="destructive" className="bg-red-900 hover:bg-red-800 text-red-100">
              <Trash2 className="mr-2 h-4 w-4" />
              계정 삭제
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
