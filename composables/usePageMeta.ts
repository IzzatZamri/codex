// composables/usePageMeta.ts
import { computed } from 'vue'

// It's good practice to keep these type definitions, as they provide
// excellent type safety for your structured data.
type SchemaEntityType =
  | 'character'
  | 'race'
  | 'place'
  | 'magic'
  | 'god'
  | 'event'
  | 'timeline'
  | 'organization'
  | 'lore'

interface CharacterSchema {
  alternateName?: string[]
  birthPlace?: string
  affiliation?: string | { '@type': string; name: string; '@id': string }
}

interface RaceSchema {
  alternateName?: string[]
  typicalLifespan?: string
  culture?: string
  isSubRace?: boolean
}

interface PlaceSchema {
  containedInPlace?: string
  geo?: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
}

interface MagicSchema {
  element?: string
  affinity?: string
}

interface GodSchema {
  domain?: string[]
  worshipedBy?: string
}

interface EventSchema {
  startDate?: string
  endDate?: string
  location?: string
}

interface TimelineSchema {
  era?: string
  timeSpan?: string
}

interface OrgSchema {
  founder?: string
  location?: string
}

interface LoreSchema {
  origin?: string
  references?: string[]
}

type SchemaDataMap = {
  character: CharacterSchema
  race: RaceSchema
  place: PlaceSchema
  magic: MagicSchema
  god: GodSchema
  event: EventSchema
  timeline: TimelineSchema
  organization: OrgSchema
  lore: LoreSchema
}

/**
 * A comprehensive composable for managing page metadata, including
 * title, meta tags (SEO, Open Graph, Twitter), canonical links,
 * and structured data (JSON-LD).
 *
 * @param options The metadata for the current page.
 */
export function usePageMeta<T extends SchemaEntityType>(options: {
  title: string
  description: string
  keywords?: string[]
  type: T
  /** A specific image URL for this page's Open Graph card. */
  imageUrl?: string
  schemaData?: SchemaDataMap[T]
}) {
  const route = useRoute()
  const { public: config } = useRuntimeConfig()

  const schemaTypeMap: Record<SchemaEntityType, string> = {
    character: 'Person',
    race: 'Taxon',
    place: 'Place',
    magic: 'Thing',
    god: 'Deity',
    event: 'Event',
    timeline: 'CreativeWorkSeries',
    organization: 'Organization',
    lore: 'CreativeWork',
  }

  // Use a computed property to ensure all metadata is reactive.
  useHead(
    computed(() => {
      const siteUrl = config.siteUrl as string
      const siteAuthor = config.siteAuthor as string
      const canonicalUrl = `${siteUrl}${route.path}`
      const fullTitle = `${options.title} | Codex`
      const ogImage = options.imageUrl || `${siteUrl}/og-default.png` // Fallback OG image

      // Build the JSON-LD schema with a unique ID
      const schema = {
        '@context': 'https://schema.org',
        '@type': schemaTypeMap[options.type] || 'Thing',
        '@id': canonicalUrl, // Use the page URL as the unique identifier
        name: options.title,
        description: options.description,
        url: canonicalUrl,
        ...options.schemaData,
      }

      return {
        title: fullTitle,
        link: [{ rel: 'canonical', href: canonicalUrl }],
        meta: [
          // Standard SEO
          { name: 'description', content: options.description },
          { name: 'keywords', content: options.keywords?.join(', ') ?? '' },
          { name: 'author', content: siteAuthor },
          { name: 'robots', content: 'index, follow' },

          // Open Graph (for Facebook, LinkedIn, etc.)
          { property: 'og:title', content: fullTitle },
          { property: 'og:description', content: options.description },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: canonicalUrl },
          { property: 'og:image', content: ogImage },
          { property: 'og:site_name', content: 'Codex of Eternum' },

          // Twitter Cards
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: fullTitle },
          { name: 'twitter:description', content: options.description },
          { name: 'twitter:image', content: ogImage },
        ],
        // Conditionally add the script tag only if schemaData is provided
        script: options.schemaData
          ? [
              {
                type: 'application/ld+json',
                innerHTML: JSON.stringify(schema, null, 2), // Pretty-print for easier debugging
              },
            ]
          : [],
      }
    })
  )
}
