import type { APIGatewayEvent, Context } from 'aws-lambda'
import { db } from 'src/lib/drizzle'
import { logger } from 'src/lib/logger'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.info('Invoked products handler')

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const products = await db.query.products.findMany();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    }
  } catch (error) {
    logger.error(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to fetch products' }),
    }
  }
}