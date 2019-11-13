import * as React from 'react'
import { cleanup, fireEvent, render } from '../../../utils/test-utils'
import Button from '../../Button'
import ToastProvider, { useToast } from '../context'

jest.mock('LayoutAnimation')

describe('<ToastProvider />', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllTimers()
  })

  const TestComponent = () => {
    const { toast } = useToast()
    return <Button onPress={() => toast({ message: 'Test Toast' })} text="Add Toast" />
  }

  const setup = () => {
    const utils = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )

    const button = utils.getByText(/add toast/i).parentNode

    return { ...utils, button }
  }

  test('should add toasts when firing toast method', () => {
    const { button, getAllByText } = setup()
    fireEvent.press(button)
    expect(getAllByText(/test toast/i)).toHaveLength(1)
    fireEvent.press(button)
    fireEvent.press(button)
    expect(getAllByText(/test toast/i)).toHaveLength(3)
  })
})
