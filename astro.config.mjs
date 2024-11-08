import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import sanity from '@sanity/astro'
import { loadEnv } from 'vite'

const env = loadEnv('all', process.cwd(), '')

// https://astro.build/config
export default defineConfig({
	output: 'server',
	compressHTML: true,
	prefetch: {
		prefetchAll: true,
	},
	integrations: [
		sanity({
			projectId: env.PUBLIC_SANITY_PROJECT_ID,
			dataset: env.PUBLIC_SANITY_DATASET,
			apiVersion: '2023-08-07',
			useCdn: true,
			studioBasePath: '/studio',
		}),
		tailwind(),
		react(),
	],
	adapter: vercel(),
})
