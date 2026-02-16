<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { ref, onMounted, nextTick } from 'vue'
import { Linkedin, Github, FileText, Mail, Moon, Sun } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const isDark = useDark()
const mounted = ref(false)

const handleToggleDark = async (event: MouseEvent) => {
  const isAppearanceTransition =
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  const transition = (document as any).startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  })
}

onMounted(() => {
  mounted.value = true
})

interface SocialLink {
  name: string
  href: string
  icon: typeof Linkedin
  label: string
}

const socialLinks: SocialLink[] = [
  { name: 'linkedin', href: 'https://www.linkedin.com/in/yao-chen-937015168/', icon: Linkedin, label: 'LinkedIn' },
  { name: 'github', href: 'https://github.com/chenyao0910', icon: Github, label: 'GitHub' },
  { name: 'resume', href: 'https://pdfs.cakeresume.com/user_pdfs/dbd70422-8e35-43eb-b428-8ba9b800133f.pdf', icon: FileText, label: 'Resume' },
  { name: 'email', href: 'mailto:chenyao0910@smail.nchu.edu.tw', icon: Mail, label: 'Email' },
]
</script>

<template>
  <div class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-20 font-sans">
    <!-- Decorative background blobs -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -left-1/4 -top-1/4 h-[70vw] w-[70vw] rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5 animate-pulse-glow" />
      <div class="absolute -bottom-1/4 -right-1/4 h-[70vw] w-[70vw] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/5 animate-pulse-glow" style="animation-delay: 2s" />
    </div>

    <!-- Top Navigation Area -->
    <header class="fixed top-0 left-0 right-0 z-50 flex justify-end p-6 md:p-10 animate-fade-in-up">
      <Button
        variant="ghost"
        size="icon"
        class="h-12 w-12 rounded-full hover:bg-accent transition-transform hover:scale-110 active:scale-95"
        @click="handleToggleDark($event)"
      >
        <Sun v-if="isDark" class="h-6 w-6" />
        <Moon v-else class="h-6 w-6" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </header>

    <!-- Main content container -->
    <main class="relative z-10 flex w-full max-w-4xl flex-col items-center gap-y-12 md:gap-y-16">
      
      <!-- Greeting Badge -->
      <div class="animate-fade-in-up">
        <Badge variant="outline" class="px-5 py-2 text-sm font-semibold tracking-widest uppercase border-primary/20 bg-primary/5">
          👋 welcome to my space
        </Badge>
      </div>

      <!-- Heading -->
      <div class="flex flex-col items-center gap-y-4 text-center">
        <h1 class="animate-fade-in-up-delay-1 text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
          <span class="text-foreground">I'm </span>
          <br class="sm:hidden" />
          <span class="animate-gradient bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent inline-block pb-2">
            Yao Chen
          </span>
          <span class="text-foreground">.</span>
        </h1>
        
        <p class="animate-fade-in-up-delay-2 max-w-2xl text-lg text-muted-foreground/80 sm:text-xl md:text-2xl font-medium leading-relaxed">
          Backend Developer with 1 Year of Experience 
          <span class="hidden sm:inline mx-3 opacity-30">|</span> 
          <a href="#" class="text-foreground hover:text-indigo-500 transition-colors underline decoration-indigo-500/30 underline-offset-8">@Titansoft</a>
        </p>
      </div>

      <!-- Action Area -->
      <div class="animate-fade-in-up-delay-3 flex flex-col items-center gap-y-10 w-full">
        <Separator class="w-24 bg-primary/10" />
        
        <div class="flex items-center justify-center gap-6 sm:gap-10">
          <TooltipProvider :delay-duration="0">
            <Tooltip v-for="link in socialLinks" :key="link.name">
              <TooltipTrigger as-child>
                <a 
                  :href="link.href"
                  :target="link.name === 'email' ? undefined : '_blank'"
                  class="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20"
                >
                  <component :is="link.icon" class="h-6 w-6 transition-transform group-hover:scale-110" />
                  <span class="sr-only">{{ link.label }}</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom" class="font-bold border-none bg-primary text-primary-foreground translate-y-2">
                {{ link.label }}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="animate-fade-in-up-delay-4 mt-8">
        <p class="flex items-center gap-x-2 text-sm font-medium text-muted-foreground/40 italic">
          <span>Built with Vue 3</span>
          <span class="h-1 w-1 rounded-full bg-current opacity-30"></span>
          <span>Tailwind v4</span>
        </p>
      </div>

    </main>
  </div>
</template>

<style scoped>
/* Ensure the gradient text is visible even if the animation fails to load immediately */
h1 span.animate-gradient {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
