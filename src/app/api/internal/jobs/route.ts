import { NextResponse, type NextRequest } from 'next/server'

interface BackendJobRequest {
  title: string
  description?: string
  company: string
  location?: string
}

export async function POST(req: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_API_URL
    if (!backendUrl) {
      throw new Error('BACKEND_API_URL is not configured')
    }

    const requestData: BackendJobRequest = await req.json()

    const headers = new Headers(req.headers)
    headers.set('X-API-Version', '2023-07-01')
    headers.set('X-Correlation-ID', crypto.randomUUID())

    const backendResponse = await fetch(`${backendUrl}/jobs`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...requestData,
        system_source: 'nextjs-portal'
      }),
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      return NextResponse.json(
        {
          code: errorData.code || 'BACKEND_ERROR',
          message: errorData.message || 'Backend service error'
        },
        { status: backendResponse.status }
      )
    }

    const successData = await backendResponse.json()
    return NextResponse.json({
      code: 'SUCCESS',
      data: successData,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Gateway error:', error)
    return NextResponse.json(
      {
        code: 'GATEWAY_ERROR',
        message: error instanceof Error ? error.message : 'Unknown gateway error'
      },
      { status: 500 }
    )
  }
} 