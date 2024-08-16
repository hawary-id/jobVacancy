export default function InputLabel({ value, className = '',required=false, children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm mb-1 text-gray-700 ${required && "after:content-['*'] after:ml-0.5 after:text-red-500"}` + className}>
            {value ? value : children}
        </label>
    );
}
