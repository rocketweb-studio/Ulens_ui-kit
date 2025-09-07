import { useEffect, useState } from 'react'

import ReCaptcha_logo from '../../assets/recaptcha/reCaptcha.svg'
import checked from '../../assets/recaptcha/сheck.svg'
import s from './ReCaptcha.module.scss'

type Props = {
  errorMessage?: string | boolean | undefined
  setCaptcha?: (token: string) => void
  recaptchaToken: string
}

const ReCaptcha = ({ errorMessage, setCaptcha, recaptchaToken }: Props) => {
  const [error, setError] = useState<string | boolean>('')
  const [loader, setLoader] = useState<'checkbox' | 'loading' | 'complete'>('checkbox')

  useEffect(() => {
    window.onSubmit = function (token: string | null) {
      if (!token) {
        return
      }
      setCaptcha?.(token)
      setLoader('complete')
    }
    window.expiredCallback = () => {
      setError('Verification expired. Check the checkbox again.')
      setLoader('checkbox')
      setCaptcha?.('')
      return
    }

    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      delete window.onSubmit
      delete window.expiredCallback
      delete window.grecaptcha
    }
  }, [])

  useEffect(() => {
    if (errorMessage) {
      setError(errorMessage)
      window.grecaptcha?.reset()
      setLoader('checkbox')
    }
  }, [errorMessage])

  const onSubmitHandler = async () => {
    setLoader('loading')
    window.grecaptcha?.reset()
    window.grecaptcha?.execute()
  }

  return (
    <>
      <div className={s.grecaptchaWrapper}>
        <div
          className='g-recaptcha'
          data-sitekey={recaptchaToken}
          data-callback='onSubmit'
          data-expired-callback='expiredCallback'
          data-size='invisible'
        ></div>
      </div>

      <div className={s.boxModel}>
        <div className={s.wrapper}>
          <p className={s.errorMessage2}>{error === 'Verification expired. Check the checkbox again.' && error}</p>
          <div>
            {loader === 'checkbox' && <div onClick={onSubmitHandler} className={s.checkbox}></div>}
            {loader === 'loading' && <div className={s.loader}></div>}
            {loader === 'complete' && <img src={checked} alt={'checked'}></img>}
          </div>
          <p className={s.label}>I’m not a robot</p>
        </div>
        <img src={ReCaptcha_logo} alt={'ReCAPTCHA'} />
      </div>
      {errorMessage && (
        <p className={s.errorMessage}>{!(error === 'Verification expired. Check the checkbox again.') && error}</p>
      )}
    </>
  )
}

export default ReCaptcha
