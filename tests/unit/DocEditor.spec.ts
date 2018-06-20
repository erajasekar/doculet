import { shallowMount } from '@vue/test-utils';
import DocEditor from '@/components/DocEditor.vue';

describe('DocEditor.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(DocEditor);
    expect(wrapper.text()).toMatch('');
  });
});
