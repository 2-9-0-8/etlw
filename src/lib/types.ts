export type BrandColour = 'off-white' | '0range' | 'b1ack'
export type BrandAsset = 'white logo' | 'orange + black logo' | 'black + orange logo'
export type Icon =
  | 'spotify'
  | 'youtube'
  | 'facebook_rounded'
  | 'instagram_rounded'
  | 'youtube_rounded'
  | 'twitter_rounded'
  | 'play_rounded'
  | 'pause_rounded'

export type Route = {
  href: string
  name: string
}

export type Card = {
  title: string
  body: string
  href?: string
  image?: string
  id?: string | number
}

export type Episode = {
  _id: string
  _createdAt: string
  _updatedAt: string
  previewOnly: boolean
  series: number
  title: string
  slug: {
    current: string
    _type: string
  }
  primaryEpisodeImage: {
    width: number
    height: number
    url: string
    alt: string
  }
  secondaryEpisodeImage: {
    width: number
    height: number
    url: string
    alt: string
  }
  albumCoverImage: {
    width: number
    height: number
    url: string
    alt: string
  }
  introduction: string
  podcastUrl: string
  musicUrl: string
  podcastMp3Urls: {
    trailer: string
    full: string
  }
  featuring: Array<string>
  publishedAt: string
  quotes: Array<{
    quote: string
    author: string
  }>
  research: Array<{
    children: Array<{
      _key: string
      _type: string
      marks: Array<string>
      text: string
    }>
    _key: string
    _type: string
    style: string
  }>
}
