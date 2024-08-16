import { default as ReactSelect } from 'react-select';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? '#F97316' : 'lightgray',
        boxShadow: state.isFocused ? '0 0 0 1px #F97316' : provided.boxShadow,
        '&:hover': {
            borderColor: '#F97316'
        }
    }),
};

const Select = (props) => {
    return <ReactSelect {...props} styles={customStyles} />;
};

export default Select;
