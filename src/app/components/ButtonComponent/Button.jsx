"use client";

const Button = ({ children, type="button", className, ...rest }) => {

  const handleClick = (event) => {

    const ripple = document.createElement("span");
    const rect = event.currentTarget.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);

    const posX = event.clientX - rect.left - size / 2;
    const posY = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${posX}px`;
    ripple.style.top = `${posY}px`;
    ripple.classList.add("ripple");

    event.currentTarget.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      type={type}
      className={`btn ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
