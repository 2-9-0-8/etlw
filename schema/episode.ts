import type { Rule } from 'sanity'

export default {
  title: 'Episode',
  name: 'episode',
  type: 'document',
  fields: [
    {
      name: 'previewOnly',
      title: 'Preview only',
      description:
        'Check this box if you want to hide this episode from the public BUT include the Acast trailer link in the Acast feed.',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'series',
      title: 'Series',
      type: 'number',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'featuring',
      title: 'Featuring',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'primaryEpisodeImage',
      title: 'Primary episode image',
      description:
        'This image will be the large image on the episode page. Image should be (ideally) 1344px x 898px.',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL to image on Cloudinary',
          type: 'url',
        },
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        },
        {
          name: 'width',
          title: 'Width',
          type: 'number',
        },
        {
          name: 'height',
          title: 'Height',
          type: 'number',
        },
      ],
    },
    {
      name: 'secondaryEpisodeImage',
      title: 'Secondary episode image',
      description:
        'This image will be used across all cards except music/album card. Image should be at least 600px wide. We will cut down the size down automatically for cards if neccessary. If not provided, the primary episode image will be used.',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL to image on Cloudinary',
          type: 'url',
        },
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        },
        {
          name: 'width',
          title: 'Width',
          type: 'number',
        },
        {
          name: 'height',
          title: 'Height',
          type: 'number',
        },
      ],
    },
    {
      name: 'albumCoverImage',
      title: 'Album cover image',
      description:
        'This image will be used on the music page. Image should be at least 600px wide. If not provided, we will fallback to secondary, then primary episode images.',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL to image on Cloudinary',
          type: 'url',
        },
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        },
        {
          name: 'width',
          title: 'Width',
          type: 'number',
        },
        {
          name: 'height',
          title: 'Height',
          type: 'number',
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'podcastUrl',
      title: 'Podcast URL',
      description: 'This is the URL to the Acast page',
      type: 'url',
    },
    {
      name: 'musicUrl',
      title: 'Music URL',
      description: 'This is the URL to the link share page',
      type: 'url',
    },
    {
      name: 'podcastMp3Urls',
      title: 'Podcast MP3 URLs',
      description:
        'This is the URL to the MP3 file on Acast. There is one field for the episode trailer, and one for the full episode. If full episode is present, then we will hide the trailer link in the Acast feed.',
      type: 'object',
      fields: [
        {
          name: 'trailer',
          title: 'Trailer',
          type: 'url',
        },
        {
          name: 'full',
          title: 'Full episode',
          type: 'url',
        },
      ],
    },
    {
      name: 'introduction',
      title: 'Introduction',
      description: 'This is the introduction text that will be displayed on the episode page.',
      type: 'text',
    },
    {
      name: 'quotes',
      title: 'Quotes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'research',
      title: 'Research',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: `Some of your visitors cannot see images, 
                be they blind, color-blind, low-sighted; 
                alternative text is of great help for those 
                people that can rely on it to have a good idea of 
                what\'s on your page.`,
            },
          ],
        },
      ],
    },
  ],
}
