import { signIn, signOut } from "@/auth"

export function SignIn({ 
  provider,
  ...props 
}: { provider?: string } & React.ComponentPropsWithRef<"button">) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <button 
        {...props}
        className="h-12 px-8 rounded-full bg-electric-emerald text-deep-slate font-bold hover:bg-electric-emerald/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-electric-emerald/20"
      >
        Sign In with Google
      </button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<"button">) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button 
        {...props}
        className="h-10 px-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm text-sm font-medium"
      >
        Sign Out
      </button>
    </form>
  )
}
