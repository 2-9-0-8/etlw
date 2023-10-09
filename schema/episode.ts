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
      name: 'coverImage',
      title: 'Cover image',
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
