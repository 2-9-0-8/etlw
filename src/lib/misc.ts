import type { Episode } from '@/lib/types'

export const dummyEpisode: Episode = {
  _id: '12345',
  previewOnly: false,
  series: 1,
  title: 'The Adventure Begins',
  slug: {
    current: 'the-adventure-begins',
    _type: 'string',
  },
  primaryEpisodeImage: {
    width: 1200,
    height: 800,
    url: 'https://example.com/episode1.jpg',
    alt: 'Episode 1 Image',
  },
  secondaryEpisodeImage: {
    width: 800,
    height: 600,
    url: 'https://example.com/episode1-secondary.jpg',
    alt: 'Episode 1 Secondary Image',
  },
  albumCoverImage: {
    width: 300,
    height: 300,
    url: 'https://example.com/album-cover.jpg',
    alt: 'Album Cover Image',
  },
  introduction: 'Welcome to the first episode of our podcast series!',
  podcastUrl: 'https://example.com/podcast/episode1',
  musicUrl: 'https://example.com/music/episode1',
  podcastMp3Urls: {
    trailer:
      'https://file-examples.com/storage/fe1134defc6538ed39b8efa/2017/11/file_example_MP3_700KB.mp3',
    full: 'https://file-examples.com/storage/fe1134defc6538ed39b8efa/2017/11/file_example_MP3_700KB.mp3',
  },
  featuring: ['John Doe', 'Jane Smith'],
  publishedAt: '2023-10-27T12:00:00Z',
  quotes: [
    {
      quote: 'This is the quote from the episode.',
      author: 'John Doe',
    },
    {
      quote: 'Another memorable quote from the episode.',
      author: 'Jane Smith',
    },
  ],
  research: [
    {
      children: [
        {
          _key: '1',
          _type: 'paragraph',
          marks: ['strong'],
          text: 'In this episode, we explore various topics.',
        },
        {
          _key: '2',
          _type: 'paragraph',
          marks: [],
          text: 'Our experts share their insights and research findings.',
        },
      ],
      _key: '3',
      _type: 'research',
      style: 'normal',
    },
  ],
}
