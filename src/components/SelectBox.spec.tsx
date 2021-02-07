import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { SelectBox } from 'src/components/SelectBox';

describe('SelectBox', () => {
    const props = { options: ['aaa', 'bbb', 'ccc'] };
    const setup = () => {
        const elm = render(<SelectBox {...props} />);
        /**
         * containerにDOM全体が入ってくるので必要なDOMだけ切り取る
         * （body - div - SelectBoxの並び）
         */
        return elm.container.querySelector('select');
    };

    it('testting options', () => {
        const el = setup();
        expect(el?.options.length).toBe(3);
        props.options.forEach((option, idx) => {
            expect(el?.options[idx].text).toBe(option);
        });
    });
});
