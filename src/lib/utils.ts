import { clsx, type ClassValue } from 'clsx'
import { sanityClient } from 'sanity:client'
import { twMerge } from 'tailwind-merge'

import type { Episode } from '@/lib/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function debounce<T extends Array<unknown>>(callback: (...args: T) => void, wait: number) {
  let id: undefined | number

  return (...args: T) => {
    window.clearTimeout(id)

    id = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

export async function getEpisodes({
  previews = false,
  limit,
}: { previews?: boolean; limit?: number } = {}) {
  const showPreviews = previews ? ' && defined(previewOnly)' : ' && !defined(previewOnly)'
  const setLimit = limit ? `[0..${limit}]` : ''

  return await sanityClient.fetch(
    `*[_type == 'episode'${showPreviews}] | order(_createdAt desc)${setLimit}`
  )
}

export async function getPreviewEpisodes() {
  return await sanityClient.fetch(`*[_type == 'episode' && previewOnly] | order(_createdAt desc)`)
}

export async function getEpisodeBySlug(slug: string) {
  const episodes = await sanityClient.fetch(`*[_type == 'episode']`)

  return episodes.find((ep: { slug: { current: string } }) => ep.slug.current === slug)
}

export async function getEpisodePositionInSeries(episode: Episode) {
  const episodes = await sanityClient.fetch(`
    *[_type == 'episode' && series == ${episode.series}] | order(publishedAt desc)
  `)

  return episodes.findIndex((ep: { _id: string }) => ep._id === episode._id) + 1
}

export async function getEpisodeById(_id: string) {
  const episode = await sanityClient.fetch(`
    *[_type == 'episode' && _id == ${_id}][0] 
  `)

  return episode
}

export async function getLatestEpisode({ previews }: { previews?: boolean } = { previews: false }) {
  const showPreviews = previews ? '&& previewOnly' : '&& !previewOnly'

  const episodes = await sanityClient.fetch(`
    *[_type == 'episode' ${showPreviews}] | order(publishedAt desc)
  `)

  return episodes[0]
}

export function formatAudioTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  const rs = s < 10 ? `0${s}` : `${s}`

  return `${m}:${rs}`
}
