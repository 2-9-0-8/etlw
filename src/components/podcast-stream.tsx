import React, { useEffect, useMemo, useRef, useState } from 'react'

import type { Episode } from '@/lib/types'
import { cn, formatAudioTime } from '@/lib/utils'

import Scrollable from '@/components/scrollable'

export default function PodcastStream({
  episodes,
}: {
  episodes: Array<Episode & { number: number }>
}) {
  const [latestEpisode] = episodes

  const [current, setCurrent] = useState(latestEpisode)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState('0:00')
  const [duration, setDuration] = useState('00:00')

  const {
    podcastMp3Urls: { full, trailer },
  } = useMemo(() => current, [current])

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) return

    const controller = new AbortController()
    const { signal } = controller

    if (audioRef.current.readyState > 0) {
      setDuration(formatAudioTime(audioRef.current.duration))

      return
    }

    audioRef.current.addEventListener(
      'loadedmetadata',
      () => audioRef.current && setDuration(formatAudioTime(audioRef.current.duration)),
      { signal }
    )

    return () => {
      controller.abort()
    }
  })

  useEffect(() => {
    if (!audioRef.current) return

    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing])

  function handleChange(episode: Episode & { number: number }) {
    if (!audioRef.current) return

    setCurrent(episode)
    setPlaying(false)
    setTime('0:00')
    setDuration(formatAudioTime(audioRef.current.duration))

    setTimeout(() => {
      setPlaying(true)
    }, 500)
  }

  function handleClick(episode: Episode & { number: number }) {
    if (episode === current) {
      setPlaying(prev => !prev)

      return
    }

    handleChange(episode)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setPlaying(prev => !prev)}
        role="menuitem"
        className="mx-auto flex max-w-2xl items-center justify-center rounded-full bg-b1ack px-3 py-2 text-center text-xs font-medium text-off-white">
        {playing ? 'Pause' : 'Play'}
      </button>

      <ul className="mt-4 space-y-2" role="menu" aria-label="Select episode to play">
        {episodes.map(episode => (
          <li
            onClick={() => handleClick(episode)}
            key={episode._id}
            className={cn(
              'mx-auto flex max-w-2xl cursor-pointer items-center justify-between gap-4 rounded-full bg-off-white px-4 py-2 text-xs font-medium md:px-6 md:text-sm',
              current !== episode && 'opacity-80'
            )}
            role="presentation">
            <div className="overflow-x-auto whitespace-nowrap">
              <Scrollable fromTo="from-off-white to-off-white/0">
                <button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    handleClick(episode)
                  }}
                  className="flex items-baseline gap-1.5 font-medium"
                  role="menuitem">
                  <span className="text-0range">
                    Series {episode.series} Episode {episode.number}{' '}
                    {episode.podcastMp3Urls?.trailer && 'trailer'}
                  </span>{' '}
                  / {episode.title}
                </button>
              </Scrollable>
            </div>

            {episode === current && (
              <time aria-label="Current time" className="shrink-0">
                {time} / {duration}
              </time>
            )}
          </li>
        ))}
      </ul>

      <audio
        className="hidden"
        ref={audioRef}
        onTimeUpdate={(e: React.SyntheticEvent<HTMLAudioElement>) => {
          setTime(formatAudioTime(e.currentTarget.currentTime))
        }}
        onEnded={(e: React.SyntheticEvent<HTMLAudioElement>) => {
          setPlaying(false)
          setTime('0:00')

          e.currentTarget.currentTime = 0
        }}
        src={full ?? trailer}
      />
    </>
  )
}
