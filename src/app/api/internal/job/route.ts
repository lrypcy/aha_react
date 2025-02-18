import { NextResponse, type NextRequest } from 'next/server'

interface BackendJobRequest {
  title: string
  description?: string
  company: string
  location?: string
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Version, X-Correlation-ID',
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_API_URL
    if (!backendUrl) {
      throw new Error('BACKEND_API_URL is not configured')
    }
    
    // 过滤请求体字段
    const { Title, Config } = await req.json()
    const validRequestBody: BackendJobRequest = {
      Title,
      Config
    }

    const headers = new Headers()
    headers.set('X-API-Version', '2023-07-01')
    headers.set('X-Correlation-ID', crypto.randomUUID())
    headers.set('Content-Type', 'application/json')
    // 添加必要的认证头（如果后端需要）
    headers.set('Authorization', `Bearer ${process.env.BACKEND_API_KEY}`)

    const requestBody = JSON.stringify({
      ...validRequestBody,
      system_source: 'nextjs-portal'
    })

    console.log('Request body:', requestBody) // 确保日志显示过滤后的内容

    const backendResponse = await fetch(`${backendUrl}/job`, {
      method: 'POST',
      headers,
      body: requestBody
    })

    // 打印后端响应信息
    console.log('Backend status:', backendResponse.status)
    console.log('Backend headers:', Object.fromEntries(backendResponse.headers.entries()))

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      return NextResponse.json(
        {
          code: errorData.code || 'BACKEND_ERROR',
          message: errorData.message || 'Backend service error'
        },
        { 
          status: backendResponse.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Version, X-Correlation-ID',
          }
        }
      )
    }

    const successData = await backendResponse.json()
    return NextResponse.json({
      code: 'SUCCESS',
      data: successData,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Version, X-Correlation-ID',
      }
    })

  } catch (error) {
    console.error('Gateway error:', error)
    return NextResponse.json(
      {
        code: 'GATEWAY_ERROR',
        message: error instanceof Error ? error.message : 'Unknown gateway error'
      },
      { status: 500, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Version, X-Correlation-ID',
      } }
    )
  }
} 