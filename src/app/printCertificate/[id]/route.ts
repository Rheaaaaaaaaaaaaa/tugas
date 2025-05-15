import { getUser } from '@/app/(frontend)/(authenticated)/_actions/getUser'
import { Course, Participation } from '@/payload-types'
import configPromise from '@payload-config'
import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import ejs from 'ejs'
import puppeteer from 'puppeteer'

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const user = await getUser()

    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { id: participationId } = params

    const participation: Participation = await payload.findByID({
      collection: 'participation',
      id: participationId,
      overrideAccess: false,
      user: user,
    })

    if (!participation) {
      return new Response('Participation Not Found', { status: 404 })
    }

    const course: Course = participation.course as Course
    const lastModule = course.curriculum?.[course.curriculum.length - 1]

    if (lastModule?.blockType !== 'finish') {
      return new Response('Course has No certificate', { status: 400 })
    }

    if (!lastModule.template || typeof lastModule.template !== 'string') {
      return new Response('Template not Found', { status: 400 })
    }

    const html = ejs.render(lastModule.template, {
      name: user?.email,
      courseTitle: course.title,
      date: new Date(participation.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    })

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      landscape: false,
    })

    await browser.close()

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${course.title}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating certificate:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
