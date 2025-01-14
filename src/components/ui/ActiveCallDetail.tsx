import AssistantSpeechIndicator from "./AssistantSpeechIndicator";
import ButtonVapi from "./ButtonVapi";
import VolumeLevel from "./Volumelevel";

 

const ActiveCallDetail = ({ assistantIsSpeaking, volumeLevel, onEndCallClick }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          width: "300px",
          height: "200px",
        }}
      >
        <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
        <VolumeLevel volume={volumeLevel} />
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <ButtonVapi label="End Call" onClick={onEndCallClick} isLoading={undefined} disabled={undefined}   />
      </div>
    </div>
  );
};

export default ActiveCallDetail;
