export default {
  title: 'Episode',
  name: 'episode',
  type: 'document',
  fields: [
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
      description: 'This image will be the large image on the episode page. Image should be (ideally) 1344px x 898px. We will cut down the size down automatically for cards.',
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
      description: 'This image will be used across all cards and on the research page. Image should be (ideally) 1344px x 898px. We will cut down the size down automatically for cards. If not provided, the primary episode image will be used.',
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
      name: 'streams',
      title: 'Streams',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
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
