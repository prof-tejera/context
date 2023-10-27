export const Input = ({ value, onChange, ...rest }) => {
  return <input value={value} onChange={e => onChange(e.target.value)} {...rest} />;
};
