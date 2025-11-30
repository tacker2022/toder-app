import { signIn } from "@/actions/auth";
import { Lock } from "lucide-react";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 text-[#D4AF37]">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Yönetici Girişi</h1>
                    <p className="text-white/50 text-sm mt-2">
                        Devam etmek için lütfen giriş yapın
                    </p>
                </div>

                <form className="space-y-6" action={signIn}>
                    <div>
                        <label className="block text-sm text-white/50 mb-2">
                            E-posta Adresi
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                            placeholder="admin@toder.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-2">Şifre</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {searchParams?.message && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                            {searchParams.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#b8962e] transition-colors"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
}
