import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                'h-32 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm' +
                className
            }
            ref={input}
        />
    );
});
