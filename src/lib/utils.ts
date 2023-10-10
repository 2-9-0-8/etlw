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

export async function getEpisodes() {
  return await sanityClient.fetch(`*[_type == 'episode'] | order(_createdAt desc)`)
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

export async function getLatestEpisode() {
  const episodes = await sanityClient.fetch(`
    *[_type == 'episode'] | order(publishedAt desc)
  `)

  return episodes[0]
}