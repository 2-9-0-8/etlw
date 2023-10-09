// sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import episode from 'schema/episode'

import { PODCAST_NAME } from '@/lib/config'

export default defineConfig({
  name: 'khaki-cat',
  title: PODCAST_NAME,
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [deskTool()],
  schema: {
    types: [episode],
  },
})
