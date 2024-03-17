import { useRef, useEffect } from "react";
import "./styles/preview.css";

interface PreviewProps {
  code: string;
  bundlingError: string;
}
const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>

          // Runtime Error
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };
          // event listener for error handling - handles async errors
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, bundlingError }) => {
  const iframe = useRef<any>();

  // whenever the code changes, we want to rerun the bundling process
  useEffect(() => {
    iframe.current.srcdoc = html;
    // we want to wait for the iframe to be loaded before we send the message
    // this is because the iframe is not immediately available - it takes a little bit of time to load
    // might want to increase the timeout in the future
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 100);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
          {/* Displaying the bundling errors */}
          {bundlingError && <div className="preview-error">{bundlingError}</div>}
    </div>

  );
};

export default Preview;
