import * as React from "react";

export interface IHelloWorldProps {
    value: string;
    onChange: (newValue: string) => void;
}

const buttonStyle = {
    backgroundColor: '#0078D4',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };



export const HelloWorld: React.FC<IHelloWorldProps> = ({ value, onChange }) => {
    const [jsonText, setJsonText] = React.useState(value);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        setJsonText(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setJsonText(newValue);
        onChange(newValue);
    };

    const handleFormat = () => {
        try {
            const formattedJson = JSON.stringify(JSON.parse(jsonText), null, 2);
            setJsonText(formattedJson);
            onChange(formattedJson);
            setError(null);
        } catch (e) {
            setError("Invalid JSON");
        }
    };

    const handleCompress = () => {
        try {
            const compressedJson = JSON.stringify(JSON.parse(jsonText));
            setJsonText(compressedJson);
            onChange(compressedJson);
            setError(null);
        } catch (e) {
            setError("Invalid JSON");
        }
    };

    return (
        <div>
            <textarea
                style={{ width: "100%", height: "100px" }}
                value={jsonText}
                onChange={handleChange}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
            <button style={{ ...buttonStyle, marginLeft: '10px' }} onClick={handleFormat}>Format JSON</button>
            <button style={{ ...buttonStyle, marginLeft: '10px' }} onClick={handleCompress}>Compress JSON</button>
            </div>
        </div>
    );
};
