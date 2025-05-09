import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')
const { fontFamily } = require("tailwindcss/defaultTheme")

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ["var(--font-lato)", ...fontFamily.sans], // Use Lato for sans-serif
            mono: [...fontFamily.mono], // Fallback to default mono stack
        },
  		colors: {
        /* Dark Theme based on user specification and palette */
        background: 'hsl(var(--background))', /* #001d3d (User specified) */
        foreground: 'hsl(var(--foreground))', /* #ffc300 (User specified for primary text) */

        card: 'hsl(var(--card))', /* #003559 (From palette, darker medium blue) */
        'card-foreground': 'hsl(var(--card-foreground))', /* #FFFFFF (User specified for secondary text on cards) */

        popover: 'hsl(var(--popover))', /* #000814 (From palette, darkest blue) - corrected */
        'popover-foreground': 'hsl(var(--popover-foreground))', /* #ffc300 (Main text color) */

        primary: 'hsl(var(--primary))', /* #0353a4 (From palette, medium blue for buttons, interactive elements) */
        'primary-foreground': 'hsl(var(--primary-foreground))', /* #FFFFFF (White text on primary blue buttons) */

        secondary: 'hsl(var(--secondary))', /* #006daa (From palette, bright medium blue for other elements) */
        'secondary-foreground': 'hsl(var(--secondary-foreground))', /* #FFFFFF (White text on secondary blue elements) */

        muted: 'hsl(var(--muted))', /* #061a40 (From palette, very dark blue for less emphasis backgrounds) */
        'muted-foreground': 'hsl(var(--muted-foreground))', /* #b9d6f2 (Light blue text on muted) */

        accent: 'hsl(var(--accent))', /* #b9d6f2 (From palette, light blue for highlights or alternative accents) */
        'accent-foreground': 'hsl(var(--accent-foreground))', /* #061a40 (Very dark blue text on light blue accent) */

        destructive: 'hsl(var(--destructive))', /* Standard Red */
        'destructive-foreground': 'hsl(var(--destructive-foreground))', /* White */

        border: 'hsl(var(--border))', /* #00416e (Slightly lighter variant of #003559 for borders) - corrected */
        input: 'hsl(var(--input))', /* Same as border */
        ring: 'hsl(var(--ring))', /* #ffd60a (Brighter version of #ffc300 for focus rings) - corrected */
         /* Chart Colors */
        chart: {
          '1': 'hsl(var(--chart-1))', /* #0353a4 */
          '2': 'hsl(var(--chart-2))', /* #006daa */
          '3': 'hsl(var(--chart-3))', /* #b9d6f2 */
          '4': 'hsl(var(--chart-4))', /* #003559 */
          '5': 'hsl(var(--chart-5))',    /* #FFFFFF */
        },
         /* Sidebar colors */
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))', /* #000814 (Darkest blue, matches popover) */
          foreground: 'hsl(var(--sidebar-foreground))', /* #b9d6f2 (Light blue text) */
          primary: 'hsl(var(--sidebar-primary))',    /* #ffc300 (Matches main foreground) */
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))', /* #000814 (Text on sidebar primary button) */
          accent: 'hsl(var(--sidebar-accent))',    /* #003559 (Card color for hover states) */
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))', /* #ffc300 (Text on hover) */
          border: 'hsl(var(--sidebar-border))',    /* #00416e (Matches main border) */
          ring: 'hsl(var(--sidebar-ring))',       /* #ffd60a (Matches main ring) */
        },
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
        rotate: {
          'y-180': 'rotateY(180deg)',
        },
        perspective: {
          '1000': '1000px',
        },
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
     plugin(function({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.transform-style-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden', // For Safari
        },
        '.rotate-y-180': {
          'transform': 'rotateY(180deg)',
        },
         '.perspective-1000': {
          'perspective': '1000px',
        },
      })
    })
  ],
} satisfies Config;
