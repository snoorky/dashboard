import { useLogin } from "@/hooks/useLogin"

export function LoginForm() {
  const response = useLogin()

  return (
    <form onSubmit={response.handleSubmit} className="relative min-w-80 md:w-md lg:w-lg rounded-2xl p-8 text-light space-y-4">
      <label htmlFor="email" className="block font-medium mb-1">Email</label>
      <input
        id="email"
        type="email"
        placeholder="seu@email.com"
        className="w-full p-3 rounded-lg outline-none border border-light/25 bg-gray-800 focus:border-accent"
        autoComplete="username"
        value={response.email}
        onChange={(e) => response.setEmail(e.target.value)}
        required
      />

      <label htmlFor="password" className="block font-medium mb-1">Senha</label>
      <input
        id="password"
        type="password"
        placeholder="••••••••"
        className="w-full p-3 rounded-lg outline-none border border-light/25 bg-gray-800 focus:border-accent"
        autoComplete="current-password"
        value={response.password}
        onChange={(e) => response.setPassword(e.target.value)}
        required
      />

      {response.error && <p className="text-sm text-accent">{response.error}</p>}

      <button
        type="submit"
        className="w-full font-medium flex justify-center items-center p-3 rounded-lg disabled:cursor-not-allowed transition-colors duration-200 bg-accent text-light"
        disabled={response.isLoading}
      >
        {response.isLoading ? (
          <>
            <div className="animate-spin w-5 h-5 mr-2 rounded-full border-solid border-2 border-current border-r-transparent" />
            <span>Entrando...</span>
          </>
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  )
}