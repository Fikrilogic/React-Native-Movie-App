import { Spinner } from '@ui-kitten/components'
import React from 'react'


export enum SpinnerType {
    TINY = "tiny",
    SMALL = "tiny",
    MEDIUM = "tiny",
    LARGE = "large",
    GIANT = "giant",
}

type Props = {
    type: SpinnerType
}

export const LoadingSpinner = ({type}: Props) => {
  return (
    <Spinner size={type}/>
  )
}
