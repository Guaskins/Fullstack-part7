import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
        )
        setCountry({ found: true, ...response.data[0] })
      } catch {
        setCountry({ found: false })
      }
    }
    name && getCountry()
  }, [name])

  return country
}
