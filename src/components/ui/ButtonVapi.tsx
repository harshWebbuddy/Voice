import ScaleLoader from "react-spinners/ScaleLoader";

const ButtonVapi = ({ label, onClick, isLoading, disabled }) => {
  const opacity = disabled ? 0.75 : 1;
  const cursor = disabled ? "not-allowed" : "pointer";

  const Contents = isLoading ? (
    <ScaleLoader
      color="#ffffff"  
      height={10}
      width={2.5}
      margin={0.5}
      loading={true}
      style={{
        display: "block",
        margin: "0 auto",
      }}
    />
  ) : (
    <p style={{ margin: 0, padding: 0 }}>{label}</p>
  );

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#38b2ac",
        color: "black",
        border: " ",
        borderRadius: "8px",
        padding: "8px 20px",
        fontSize: "16px",
        outline: "none",
        
        transition: "all 0.3s ease",
        opacity,
        cursor,
      }}
    >
      {Contents}
    </button>
  );
};

export default ButtonVapi;
