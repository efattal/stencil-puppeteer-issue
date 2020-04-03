import { newE2EPage } from '@stencil/core/testing'
import { Request } from 'puppeteer'

describe('my-component', () => {
  it('gets data from server', async () => {
    const page = await newE2EPage()

    await page.setContent('<my-component></my-component>');

    await page.setRequestInterception(true)

    page.on('request', function(req: Request) {
      if (req.method() == 'GET' && req.url().endsWith('/api/v1/employees')) {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: [
              {
                employee_name: 'Mock1',
              },
              {
                employee_name: 'Mock2',
              },
            ],
          }),
        })
        return
      }
      req.continue()
    })

    await (await page.find('my-component >>> button')).click();

    await page.waitForChanges()

    expect(await page.find('my-component >>> ul li')).toEqualText('Mock1')
    expect(await page.find('my-component >>> ul li:nth-child(2)')).toEqualText('Mock2')
  })
})
