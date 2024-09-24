interface EmailProp {
  setEmailInput: (value: boolean) => void;
}

const EmailCard: React.FC<EmailProp> = ({ setEmailInput }) => {
  return (
    <>
      <p className="mb-4">جهت ورود به سامانه ایمیل خود را وارد کنید</p>
      <input
        type="text"
        className="m-5 mt-1 mb-3 login-card_input"
        placeholder="ایمیل خود را وارد کنید"
      />
      <button className="m-5 mt-1 mb-1 fw-bold text-light">
        ورود به سامانه
      </button>
      <div className="link_email">
        <p className="p_email fw-bold" onClick={() => setEmailInput(false)}>
          ورود با شماره تماس
        </p>
      </div>
    </>
  );
};

export default EmailCard;
