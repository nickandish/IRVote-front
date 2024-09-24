interface LoginProp {
  setEmailInput: (value: boolean) => void;
}

const LoginInputs: React.FC<LoginProp> = ({ setEmailInput }) => {
  return (
    <>
      <p className="mb-4">جهت ورود به سامانه شماره همراه خود را وارد کنید</p>
      <input
        type="text"
        className="m-5 mt-1 mb-3 login-card_input"
        placeholder="شماره موبایل خود را وارد کنید"
      />
      <button className="m-5 mt-1 mb-1 fw-bold text-light">
        ورود به سامانه
      </button>
      <div className="link_email">
        <p className="p_email fw-bold" onClick={() => setEmailInput(true)}>
          ورود با ایمیل
        </p>
      </div>
    </>
  );
};

export default LoginInputs;
