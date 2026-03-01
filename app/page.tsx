import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  Wrench,
  Users,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: GraduationCap,
    title: 'Academic Support',
    description: 'Get instant answers to campus FAQs powered by Groq LLaMA 3.3.',
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    icon: Wrench,
    title: 'Infrastructure Complaints',
    description: 'Report broken equipment with photo evidence. Track resolution in real-time.',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Users,
    title: 'Hackathon Team Discovery',
    description: 'Post team requirements and find teammates with complementary skills.',
    color: 'from-red-500/20 to-crimson-500/20',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30 overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: "url('/campus_bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      <main className="relative z-10">
        {/* Header - University Logo Placeholder */}
        <header className="pt-8 px-6 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img src="/anurag-logo.png" alt="Anurag University" className="relative h-16 w-auto object-contain" />
          </div>
        </header>

        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 text-center">
          {/* AI Badge */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-red-500/30 text-red-200 text-xs font-medium mb-12 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              AI-Powered Campus Platform
            </div>
          </div>

          {/* Title Container with Laurel Decoration */}
          <div className="relative mb-10 group animate-in fade-in zoom-in-95 duration-1000 delay-200">
            {/* Laurel/Circuit Icons (Simplified CSS borders/decorations) */}
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden lg:flex items-center">
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-red-600"></div>
              <div className="w-8 h-8 rounded-full border-2 border-red-600 flex items-center justify-center -ml-1">
                <div className="w-4 h-[1px] bg-red-600 rotate-45"></div>
                <div className="w-4 h-[1px] bg-red-600 -rotate-45"></div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
              <span className="bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Campus
              </span>
              <span className="bg-gradient-to-r from-red-500 via-orange-400 to-indigo-400 bg-clip-text text-transparent ml-4 drop-shadow-[0_0_30px_rgba(239,68,68,0.3)] italic">
                Genie
              </span>
            </h1>

            <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden lg:flex items-center">
              <div className="w-8 h-8 rounded-full border-2 border-indigo-600 flex items-center justify-center -mr-1">
                <div className="w-4 h-[1px] bg-indigo-600 rotate-45"></div>
                <div className="w-4 h-[1px] bg-indigo-600 -rotate-45"></div>
              </div>
              <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-indigo-600"></div>
            </div>

            {/* Divider Line */}
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-4"></div>
          </div>

          <p className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            The AI-powered operating system for Anurag University
          </p>

          <p className="text-base text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            One platform for AI academic support, infrastructure complaints, and hackathon team discovery
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <Link href="/login">
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold px-10 py-7 text-lg rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="pb-32 px-4 relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group relative p-8 rounded-3xl bg-[#0a0c10]/80 backdrop-blur-xl border border-white/5 hover:border-red-500/20 transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-10"
                  style={{ animationDelay: `${600 + idx * 100}ms` }}
                >
                  {/* Subtle Glow Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>

                  {/* Glass Highlight */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-3xl opacity-20" />
                </div>
              )
            })}
          </div>

          {/* Core Integrations footer style */}
          <div className="mt-20 flex flex-col items-center animate-in fade-in duration-1000 delay-1000">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-4">
              <div className="w-12 h-px bg-slate-800"></div>
              Core Integrations
              <div className="w-12 h-px bg-slate-800"></div>
            </span>
            <div className="flex flex-wrap items-center justify-center gap-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <div className="flex items-center gap-2 group cursor-pointer">
                <Zap className="w-5 h-5 text-amber-500 group-hover:animate-pulse" />
                <span className="text-sm font-semibold text-slate-300">Groq AI</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <Shield className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-slate-300">Secure Auth</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <img src="/anurag-logo.png" className="w-6 h-6 object-contain grayscale invert" />
                <span className="text-sm font-semibold text-slate-300">Anurag University</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-black/40 backdrop-blur-md border-t border-white/5 py-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] md:text-sm font-medium text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              Built with <span className="text-red-500 animate-pulse">❤️</span> for the campus community
            </div>

            <div className="flex items-center gap-8">
              <span>© {new Date().getFullYear()} Anurag University | <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></span>
            </div>
          </div>

          {/* Sparkle Icon Bottom Right */}
          <div className="absolute right-8 bottom-8 opacity-40 hover:opacity-80 transition-opacity">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse"></div>
              <Sparkles className="relative w-full h-full text-white/40" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
