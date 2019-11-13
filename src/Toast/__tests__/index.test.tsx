import * as React from 'react'
import { Vibration } from 'react-native'
import Toast, { ToastConfig } from '..'
import { theme } from '../../../theme'
import { cleanup, fireEvent, render } from '../../../utils/test-utils'
import { uuid } from '../context'
import { ToastInternalConfig } from '../index'

const config: ToastInternalConfig & ToastConfig = {
  id: uuid(),
  index: 0,
  message: 'Test Toast',
  intent: 'SUCCESS',
  duration: 3000,
  onClose: jest.fn(),
  onPress: jest.fn()
}

describe('<Toast />', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllTimers()
  })

  const setup = (props?: ToastConfig) => {
    const utils = render(<Toast key={config.id} {...config} {...props} />)
    return { ...utils }
  }

  test('should render without crashing', () => {
    const { container } = setup()
    expect(container).toBeTruthy()
  })

  test('should render toast message', async () => {
    const { getByText } = setup()
    expect(getByText(/test toast/i)).toBeDefined()
  })

  test('should call onPress when pressed', () => {
    const { getByTestId } = setup()
    const button = getByTestId('toast-touchable')
    fireEvent.press(button)
    expect(config.onPress).toHaveBeenCalled()
  })

  test('should show error intent and render correct color', () => {
    const { getByTestId } = setup({ intent: 'ERROR', message: 'Error Toast!' })
    const accent = getByTestId('toast-accent')
    expect(accent.props.bg).toEqual('error')
    expect(accent.props.style[0].backgroundColor).toEqual(theme.colors.error)
  })

  test('should show success intent and render correct color', () => {
    const { getByTestId } = setup({ intent: 'SUCCESS', message: 'Success Toast!' })
    const accent = getByTestId('toast-accent')
    expect(accent.props.bg).toEqual('success')
    expect(accent.props.style[0].backgroundColor).toEqual(theme.colors.success)
  })

  test('should fire onClose after given duration', () => {
    jest.useFakeTimers()
    setup({ intent: 'SUCCESS', message: 'Success Toast!', duration: 1000 })
    expect(config.onClose).not.toBeCalled()
    jest.advanceTimersByTime(1000)
    expect(config.onClose).toBeCalled()
    expect(config.onClose).toHaveBeenCalledTimes(1)
  })

  test('should vibrate if vibration prop is passed', () => {
    jest.useFakeTimers()
    setup({ intent: 'SUCCESS', message: 'Success Toast!', duration: 1000, shouldVibrate: true })
    expect(Vibration.vibrate).toHaveBeenCalled()
  })
})
