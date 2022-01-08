import { CardContent, Container, Typography, Card, Alert } from '@mui/material'

const ShortID = (props) => {
  return (
    <>
      <Container maxWidth='xs'>
        <Card variant='outlined' className='p-4 my-5'>
          <CardContent>
            <Typography component='div' variant='h4'>Shrink-Ly</Typography>
            <p className='mb-4 text-muted'>The Smart URL shortener</p>
            <Alert severity='error' className='mb-4'>
              {props.text}
            </Alert>
            <center>
              <a href='/'>Go To Home</a>
            </center>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const connectToMongo = require('../lib/mongodb.connect')
  const ShortUrl = require('../lib/shortUrls.model')
  connectToMongo()

  try {
    const short = await ShortUrl.findOneAndUpdate({ short: context.query.short_id }, { $inc: { clicks: 1 } })

    if (short) {
      return {
        redirect: {
          destination: `${short.full}`,
          permanent: false
        }
      }
    }

    return {
      props: {
        text: 'URL Not Found'
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        text: 'Something went wrong'
      }
    }
  }
}

export default ShortID