import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import myButton from '../component/myButton.vue'

storiesOf('Button', module).add('with text', () => ({
  components: { myButton },
  template: '<my-button @click="action">组件测试</my-button>',
  methods: {
    action: action('clicked')
  }
})).add('with some emjoi', () => ({
  components: { myButton },
  template: '<my-button @click="action"></my-button>',
  methods: {
    action: action('clicked')
  }
}))
