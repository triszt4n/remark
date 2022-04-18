export type TextAreaStatus = {
  isError: boolean
  message: string
}

const MAX_CHARACTER_IN_TEXTAREA = 500

export const getCurrentStatus = (currentTextLength: number): TextAreaStatus => {
  if (currentTextLength > MAX_CHARACTER_IN_TEXTAREA) {
    return { isError: true, message: `Text entered is too long! ${currentTextLength} / ${MAX_CHARACTER_IN_TEXTAREA}` }
  } else {
    return { isError: false, message: `${currentTextLength} / ${MAX_CHARACTER_IN_TEXTAREA}` }
  }
}
