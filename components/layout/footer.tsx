export function Footer() {
  return (
    <footer className=" border-t border-border/40 bg-background py-6 md:py-0">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2024 LearnFlow. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">이용약관</a>
          <a href="#" className="hover:text-foreground">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  )
}
