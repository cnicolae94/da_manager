const FormInput = (props) => {
  const { type, displaytext, name, onChange } = props;
  const className = displaytext.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="input-wrapper">
      {displaytext && (
        <label className={`${className} form-input-label`} {...props}>
          {displaytext}
        </label>
      )}
      <input type={type} name={name} onChange={onChange} />
    </div>
  );
};

export default FormInput;
