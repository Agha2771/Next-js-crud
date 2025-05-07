import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response , 'response')
    if (!response.ok) {
      throw new Error('Failed to fetch banners')
    }

    const data = await response.json()

    return NextResponse.json({ 
      success: true,
      banners: data 
    })

  } catch (error) {
    console.error('Error fetching banners:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch banners' 
      },
      { status: 500 }
    )
  }
}
