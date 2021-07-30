import {render, screen} from '@testing-library/react' // (or /dom, /vue, ...)
import TaskContent from '../TaskContent'


test('should show login form', () => {
  const {container} = render(<TaskContent />)

  const foo = container.querySelector('[data-testid="task_content"]')
  // Events and assertions...
})