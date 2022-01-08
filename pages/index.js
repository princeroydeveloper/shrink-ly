import { useRef, useState } from 'react'
import { Container, Card, CardContent, Button, TextField, Typography, Alert, Snackbar, IconButton } from '@mui/material'
import { ContentPaste, Close } from '@mui/icons-material'
import ultralightCopy from 'copy-to-clipboard-ultralight'

const index = () => {
  const fullURLRef = useRef()
  const [short, setShort] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setShort('')
    if (fullURLRef.current.value === '') return setError('Please enter the full URL to shrink')
    setLoading(true)
    try {
      const req = await fetch('/api/generate-short-url', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          url: fullURLRef.current.value
        })
      })
      const res = await req.json()
      if (res.short && req.status === 200) {
        setLoading(false)
        fullURLRef.current.value = ''
        return setShort(res.short)
      }
      setLoading(false)
      return setError(res.error)
    } catch (error) {
      console.error(error)
      setLoading(false)
      return setError('Something went wrong...')
    }
  }

  const handleCopy = () => {
    try {
      ultralightCopy(`${window.location.protocol}//${window.location.host}/${short}`)
      setSnackbar(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
        message='Copied to clipboard successfully!'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        action={
          <IconButton
            color='inherit'
            onClick={() => setSnackbar(false)}
          >
            <Close sx={{ fontSize: 22 }} />
          </IconButton>
        }
      />

      <Container maxWidth='xs'>
        <Card variant='outlined' className='p-4 my-5'>
          <CardContent>
            <Typography component='div' variant='h4'>Shrink-Ly</Typography>
            <p className='mb-4 text-muted'>The Smart URL shortener</p>
            {short && <Alert className='mb-4'>
              Your Short URL is ready at: <a href={`${window.location.protocol}//${window.location.host}/${short}`} target='_blank'>{`${window.location.protocol}//${window.location.host}/${short}`}</a>
              <Button variant='text' size='small' className='mt-2' onClick={handleCopy}>
                <ContentPaste sx={{ fontSize: 20 }} />&nbsp;&nbsp;Copy Short URL
              </Button>
            </Alert>}
            {error && <Alert severity='error' className='mb-4'>
              {error}
            </Alert>}
            <TextField variant='outlined' label='URL' placeholder='https://example.com' autoComplete='off' fullWidth inputRef={fullURLRef} InputLabelProps={{ shrink: true }} />
            <Button className='mt-4 float-end' variant='contained' onClick={handleSubmit} disabled={loading}>Shrink</Button>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default index